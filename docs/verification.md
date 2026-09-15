# Verification and limits

FDEOps has automated regression tests and focused workflow checks. Passing them does not certify every agent, model, or client engagement. The CLI and fieldbook run locally without a model; AI hosts and source connectors have their own permissions and network behavior.

## Automated checks

The 2026-09-11 maintenance update passed 293 tests, with no failures or skips, plus skill-routing checks and live CLI smoke. GitHub validation passed before merge.

```bash
npm run check
npm run test:skill-routing
node evals/context-budget/check.js
```

Coverage includes private-output redaction, client binding, pending reviews, sourced replay warnings, acceptance conflicts, installer paths, export protection, and concurrent CLI writes. Multi-file commands are not database transactions, and external editors do not participate in CLI locks.

The context fixture reduces 1,120,010 bytes of history to a 16,384-byte response and retrieves three targeted records among 10,000 unrelated lines. This verifies a byte ceiling and retrieval in that fixture, not a fixed token count, model accuracy, or percentage of tokens saved.

## Composable pack validation (4.1.0, 2026-09-15)

The local candidate passed all 367 repository tests (zero failures or skips), the structural gate, and the routing contract/live CLI smoke. The routing smoke exercises CLI mechanics; it does not prove automatic model selection of every task skill. Packaging checks copy each standalone skill into isolation, verify local instruction links and canonical dependency closure, detect stale generation, and test reintroduced installer entries and user-owned collisions.

Two isolated agent trials used only a copied task skill and fictional permitted inputs:

- **Integration:** implemented a bounded retry adapter and ran ten tests against a real loopback HTTP server. Lost responses after committed writes produced two attempts and one downstream task. Permanent rejection, uncertain outcomes and cancellation were tested. No engagement folder, extra dependency or external skill pack was used.
- **Options:** produced a decision artifact from an incomplete customer brief without initialization. It kept scope and acceptance pending, distinguished capacity from spend, and compared feasible routes without padding the alternatives.

A separate code/instruction reviewer found a standalone POC planning gate that still required an initialized engagement. That gate was corrected in the canonical method and regenerated packages; the reviewer verified the fix. Focused packaging and readiness checks passed afterward.

These are synthetic agent trials, not customer deployments or independent human usability evidence. The integration receiver implemented the supplied contract in memory; live authentication, durable upstream deduplication and production behavior were not tested. Automatic selection across every host, every standalone workflow, and every model remains unverified. These checks describe the release candidate; release status is recorded in GitHub Releases and npm.

## Standalone corrections (4.1.1)

An additional isolated agent trial drafted a sponsor readout and handoff using only the selective packages and supplied fictional facts. It used no engagement CLI or initialization, kept staging measurements and unaccepted ownership explicit, and reported recovery as unrehearsed.

Generator regression coverage checks removed dependencies and catalog entries, read-only validation, ownership migration, unowned additions, modified obsolete files, symlinks and hard links. A separate reviewer reproduced a hard-link overwrite risk; the preflight guard and preservation regression resolved it. All ten focused packaging tests passed after that correction.

## Identifier masking

A two-session Codex/GPT-6-Astra diagnostic prepared a masked meeting review, waited for explicit confirmation, applied it, and retrieved the saved action with the same aliases. External checks found the original email and phone restored in local records, no stored aliases, and no raw fixture identifiers or private marker in either model trace. This is one scripted case, not comprehensive PII or host certification.

The masking regression suite checks stable aliases, original-record preservation, confirmed proposal restoration, sourced replay, masked stderr/MCP responses, truncation boundaries, context size, and missing/corrupt/linked private state. Raw file access, upstream source tools, and unrecognized identifiers remain outside this boundary. See [privacy details](../PRIVACY.md#default-identifier-masking).

## Agent workflow

A scripted diagnostic on 2026-09-11 used Codex CLI 0.153.4 with GPT-6-Astra at medium reasoning and the current repository executable. Fresh sessions exercised messy-note review, rejection and correction, confirmed save, record-only recall and handoff, and replay of the original notes after a correction. A separate session checked a second client workspace.

The agent recovered the decision and action from ordinary prose, preserved both correction sources, kept requests unagreed and staging results unaccepted, and retained the current next action. Record hashes stayed unchanged before confirmation and during the older-note replay. Private test content was absent from the five update-workflow traces. The second workspace returned its own signer and next action without reading the first client's record.

An additional agent reviewed the review/save/return traces. This is one scripted longitudinal scenario and one read-only client switch, not independent human usability evidence or repeated statistical reliability. Two early runs resolved a stale global CLI and exposed the synthetic private marker. They were excluded from current-version validation; they do not establish a regression in the current executable. Use the intended executable when reproducing tests.

## Fieldbook and MCP

Browser checks on the 2026-09-10 release exercised dark desktop and 390px mobile views, client switching, search, action prompts, clipboard fallback, and empty states. The tested fictional journeys had no page overflow, console errors, or external requests. The fieldbook is a generated report; regenerate it after record changes.

Automated stdio MCP tests exercise initialization, tool listing, staging, proposing, and explicit apply, including privacy and client boundaries. This does not certify a user's Slack, Notion, Granola, or other source connection. Test each configured connector separately.

## Local models

Read-only trials used Ollama 0.33.1 and already-installed Qwen3 models on a 16 GiB Mac with CPU inference:

- **Qwen3 1.7B:** missed a recorded next action, invented a scope record, and gave a partially correct acceptance answer with an unsupported trust assessment. [Recorded results](../evals/local-model/results/2026-09-10-qwen3-1.7b.json).
- **Qwen3 4B:** the first attempt exceeded a 180-second deadline. Three capped reruns produced planning text without completed tool calls. [Recorded results](../evals/local-model/results/2026-09-10-qwen3-4b.json).

These establish connectivity, not reliable client-work judgment. The adapter exposes three read-only tools; it does not test full skill routing or writes. With an already-installed model:

```bash
FDEOPS_TEST_OLLAMA=http://127.0.0.1:11434 node evals/local-model/check.js qwen3:1.7b
```

An expected tool call is not proof of a correct answer. Review answers and citations against the fixtures. Token totals include repeated prompts and are not comparative efficiency measurements.

## Plain task skills (5.0)

Automated coverage checks all 14 task packages, their local reference closure, generated-file ownership and selective package isolation. Installer tests cover clean installs, repeat installs, managed-name migration, preservation of personal files, generic-name collisions, refused destinations, symlinks and hardlinks.

A separate README-only reader trial correctly distinguished installing the coordinator from installing individual tasks, and understood when customer records are optional. An isolated `discover` trial used fictional meeting notes without the coordinator or CLI. After removing unnecessary setup and evidence quotas, the repeat trial returned a focused result with reported timings, unmeasured baselines and unconfirmed ownership kept distinct. Separate implementation review found no blocking migration or schema defect.

These are automated checks and simulated agent trials. They do not demonstrate independent customer adoption, every host's skill-selection behavior, or reliability across all enterprise environments.

## What remains unproven

Independent users' maintenance time, repeated benefit, and continued use have not been demonstrated. Neither have universal host compatibility or superiority over other workflows. The [delivery evaluation protocol](../evals/delivery/README.md) describes repeated, blinded comparisons for testing those claims.
