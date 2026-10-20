#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { GatewayError, identifier, initializePolicy } from "./policy.mjs";

const HELP = `Decks access CLI — publish existing admitted releases and manage viewing access.

Run with Node 24. All operations output one schema_version:1 JSON object.
The gateway alone owns live policy; only policy init writes a local store.

  policy init --db /persistent/policy.sqlite --library-root /artifact/library
  releases list
  decks list
  decks publish DECK_ID --release RELEASE_ID
  decks public DECK_ID --value true|false
  decks grant DECK_ID --key KEY_ID
  decks revoke DECK_ID --key KEY_ID
  decks access DECK_ID
  keys list
  keys issue --label LABEL [--scope collection|all]
  keys rotate KEY_ID
  keys revoke KEY_ID

Remote calls require --url OR DECKS_URL (HTTPS, or HTTP loopback), and
DECKS_MANAGEMENT_TOKEN OR --token-stdin. Never pass credentials as arguments.
The viewer's key cannot manage policy. Scope all is owner viewing, not management.

Example: node src/cli.mjs keys issue --label North --url http://127.0.0.1:3000

Publish first requires validate_product.py --release and a schema v3 bundle
already present in the configured library. A new deck is private and unassigned;
selecting a newer release preserves its public flag and key assignments.

Issue/rotate disclose a new secret ONCE in the successful JSON response. Keep
that result private. Ordinary lists contain no secret or verifier. Never retry
an outcome-unknown issue blindly: list keys, identify the exact key, then rotate
or revoke it. Outcome-unknown rotation may have invalidated the old secret and
sessions; inspect the same key and deliberately rotate it again if needed.
Other mutations are state-setting: inspect decks access / keys list before retry.
No request is automatically retried. Keys are not sent to recipients by this CLI.

Exit: 0 success; 2 invalid command/input; 1 rejected/unavailable/unknown outcome.
Initialization is exclusive and never overwrites an existing store.
`;

function parse(argv) {
  const words = [];
  const options = {};
  const booleans = new Set(["token-stdin", "json"]);
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    if (!argument.startsWith("--")) { words.push(argument); continue; }
    const name = argument.slice(2);
    if (!/^[a-z][a-z-]*$/.test(name) || Object.hasOwn(options, name)) throw new GatewayError("usage", "Options must be unique --name value pairs.");
    if (booleans.has(name)) options[name] = true;
    else {
      const value = argv[++index];
      if (value === undefined || value.startsWith("--")) throw new GatewayError("usage", `--${name} requires a value.`);
      options[name] = value;
    }
  }
  return { words, options };
}

function requireOption(options, key) {
  if (options[key] === undefined) throw new GatewayError("usage", `--${key} is required.`);
  return options[key];
}

function requireWords(words, count) {
  if (words.length !== count) throw new GatewayError("usage", "Command has missing or unexpected positional arguments; use --help.");
}

export function commandRequest(words, options) {
  const [noun, action, id] = words;
  const command = `${noun} ${action}`;
  let path;
  let input;
  let allowed = ["url", "token-stdin", "json"];
  switch (command) {
    case "keys list": case "decks list": case "releases list":
      requireWords(words, 2); path = `/api/v1/${noun}`; break;
    case "keys issue":
      requireWords(words, 2); allowed.push("label", "scope");
      input = { label: requireOption(options, "label"), scope: options.scope ?? "collection" };
      if (!["collection", "all"].includes(input.scope)) throw new GatewayError("usage", "--scope must be collection or all.");
      path = "/api/v1/keys"; break;
    case "keys rotate": case "keys revoke":
      requireWords(words, 3); identifier(id, "key_id"); path = `/api/v1/keys/${id}/${action}`; input = {}; break;
    case "decks access":
      requireWords(words, 3); identifier(id, "deck_id"); path = `/api/v1/decks/${id}/access`; break;
    case "decks publish":
      requireWords(words, 3); identifier(id, "deck_id"); allowed.push("release");
      input = { release_id: identifier(requireOption(options, "release"), "release_id") };
      path = `/api/v1/decks/${id}/publish`; break;
    case "decks public":
      requireWords(words, 3); identifier(id, "deck_id"); allowed.push("value");
      if (!["true", "false"].includes(options.value)) throw new GatewayError("usage", "--value must be true or false.");
      input = { public: options.value === "true" }; path = `/api/v1/decks/${id}/public`; break;
    case "decks grant": case "decks revoke":
      requireWords(words, 3); identifier(id, "deck_id"); allowed.push("key");
      input = { key_id: identifier(requireOption(options, "key"), "key_id") }; path = `/api/v1/decks/${id}/${action}`; break;
    default: throw new GatewayError("usage", "Unknown command; use --help.");
  }
  if (Object.keys(options).some(key => !allowed.includes(key))) throw new GatewayError("usage", `Accepted options for ${command}: ${allowed.map(key => `--${key}`).join(", ")}.`);
  return { command, path, input, method: input === undefined ? "GET" : "POST" };
}

export async function runCli(argv, { env = process.env, stdin = () => readFileSync(0, "utf8"), fetcher = fetch } = {}) {
  if (!argv.length || argv.includes("--help")) return { help: HELP };
  const { words, options } = parse(argv);
  if (words[0] === "policy" && words[1] === "init") {
    requireWords(words, 2);
    if (Object.keys(options).some(key => !["db", "library-root", "json"].includes(key))) throw new GatewayError("usage", "policy init accepts only --db, --library-root and --json.");
    const data = initializePolicy(requireOption(options, "db"), requireOption(options, "library-root"));
    return { schema_version: 1, ok: true, command: "policy init", data };
  }
  const request = commandRequest(words, options);
  let endpoint;
  try {
    endpoint = new URL(options.url ?? env.DECKS_URL);
    if (endpoint.href !== `${endpoint.origin}/` || endpoint.username || endpoint.password ||
      !(endpoint.protocol === "https:" || (endpoint.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(endpoint.hostname)))) throw new Error("unsafe");
  } catch { throw new GatewayError("configuration", "Set --url or DECKS_URL to an HTTPS origin (HTTP allowed only on loopback).", 503); }
  if (options["token-stdin"] && env.DECKS_MANAGEMENT_TOKEN) throw new GatewayError("configuration", "Select one credential source: --token-stdin or DECKS_MANAGEMENT_TOKEN.", 503);
  const token = options["token-stdin"] ? stdin().trim() : env.DECKS_MANAGEMENT_TOKEN;
  if (typeof token !== "string" || token.length < 32 || /\s/.test(token)) throw new GatewayError("configuration", "A management token from env or --token-stdin is required.", 503);
  let response;
  let result;
  try {
    response = await fetcher(`${endpoint.origin}${request.path}`, { method: request.method,
      headers: { authorization: `Bearer ${token}`, ...(request.input === undefined ? {} : { "content-type": "application/json" }) },
      ...(request.input === undefined ? {} : { body: JSON.stringify(request.input) }),
      signal: AbortSignal.timeout(15000), redirect: "error" });
    const chunks = [];
    let size = 0;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > 4 * 1024 * 1024) throw new Error("response too large");
      chunks.push(chunk);
    }
    result = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (typeof result.ok !== "boolean") throw new Error("invalid gateway response");
  } catch {
    const mutation = request.method === "POST";
    return { schema_version: 1, ok: false, command: request.command, target: { origin: endpoint.origin }, error: {
      code: mutation ? "outcome_unknown" : "unavailable", effect: mutation ? "unknown" : "none",
      message: mutation ? "The response was not established. Do not blindly repeat issue/rotate; inspect the same keys or deck state first. See --help recovery guidance." : "The gateway response was unavailable or invalid. Check this exact endpoint and credential source." } };
  }
  return { schema_version: 1, ...result, command: request.command, target: { origin: endpoint.origin }, http_status: response.status };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const result = await runCli(process.argv.slice(2));
    process.stdout.write(result.help ?? `${JSON.stringify(result)}\n`);
    if (!result.help && !result.ok) process.exitCode = 1;
  } catch (error) {
    process.stdout.write(`${JSON.stringify({ schema_version: 1, ok: false, error: { code: error.code ?? "unavailable",
      effect: "none", message: error instanceof GatewayError ? error.message : "Operation unavailable; inspect configuration without exposing secrets." } })}\n`);
    process.exitCode = ["usage", "invalid_input"].includes(error.code) ? 2 : 1;
  }
}
