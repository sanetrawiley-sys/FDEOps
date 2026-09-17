# One workday. Two customers.

An FDE turns a payments workshop into a scoped code change, pauses for a freight-customer meeting, then resumes testing and prepares the next release decision.

The GIF is a terminal-style replay of a scripted agent run, not a screen recording or customer production footage. The code edit, local tests, record saves and customer-context reads actually ran. Customer records are fictional. Responses are shortened; typing and pauses are staged.

## 1. Turn the workshop into a build

> @fde Workshop done. Finance wants retries without duplicates.

Saved PAY-42: stop duplicate payment retries. Use the receiver’s idempotency API. Keep the ledger unchanged.

Agreed scope saved | PAY-42. Checks: retries, restart, tenant isolation, concurrency.

## 2. Build, then preserve the next step

> @fde Start PAY-42. I have a customer meeting in five minutes.

Changed retry.js: validate identity and deduplicate by tenant + event ID. Checkpoint saved. Next: run the full local test suite.

Baseline: 3 passed, 4 failed. Change saved | Post-change verification pending.

## 3. Handle the other customer’s meeting

> @fde Switch to Kesterman. Brief me for Denise’s meeting.

Decision for Denise: defer Nashville role views, or trade scope and timeline. Reconfirm the demo.

Kesterman context loaded | Read-only, temporary selection. Garvey’s unfinished work preserved.

## 4. Return to the exact next action

> @fde Back to Garvey. Continue where we stopped.

Recovered PAY-42 and confirmed the code is unchanged. All 7 local tests pass. The customer receiver still needs a staging check.

Tests: 7 | Passed: 7 | Failed: 0. Environment: local receiver mock.

## 5. Separate passing tests from rollout approval

> @fde Tests pass. Can we roll this out?

Not yet. Replay retries against the durable receiver on customer staging. Security, CTO approval and finance acceptance are still pending.

Local checks passed | Customer staging not tested. No production action taken.

## 6. Leave tomorrow’s work ready to resume

> @fde Save where we are for tomorrow.

Saved the implementation, test evidence and blockers. Next: arrange the authorised staging replay.

Checkpoint saved and verified. Saved next action: arrange staging replay.

## Full captured answer

Fictional scenario  -  edited terminal replay. Local work actually performed using the FDEOps skill.

1. Saved PAY-42: tenant-scoped `insertOnce`, no ledger redesign. Checks cover duplicates, restart, tenant isolation, concurrency, failure retry, and missing identity. Production requires security, CTO approval, and finance acceptance.

2. Baseline: 3/7 passed. Implemented identity validation and tenant-scoped `insertOnce` in `retry.js`. Saved a recoverable checkpoint before post-change verification; next action recorded: run the full local suite.

3. Read Kesterman through temporary command scope; no customer writes or persistent binding changes. Denise must decide whether to defer Nashville role views or trade scope/timeline, and reconfirm the demo.

4. Recovered Garvey’s checkpoint through CLI; confirmed preserved file hashes. Full `npm test`: 7/7 passed. The in-memory receiver mock does not verify durable persistence or customer integration.

5. No rollout: only local mocked evidence exists; staging and production access are unavailable. Next check: durable-receiver staging replay, followed by security/CTO approvals and finance acceptance. Nothing deployed.

6. Saved and verified Garvey checkpoint `c6c423a`: implementation hash, exact baseline and seven passing checks, pending staging, security/CTO approvals, and finance acceptance. Next: arrange authorized staging replay against the durable receiver.

## Evidence and reproduction

The run used Codex CLI 0.154.0 with FDEOps 5.1.10, the public Garvey and Kesterman example records, and an explicitly approved fictional PAY-42 workshop decision. The exact model identifier was not recorded. Sanitized CLI reads selected each customer; selection was temporary, not a persistent workspace rebind. Only Garvey’s approved records and the local implementation were changed. The initial customer-path lookup was corrected before record access.

The baseline implementation called `store.insert(event)` and passed 3 of 7 tests. The edited [retry handler](workday-fixture/retry.js) uses the receiver’s `insertOnce` API and passes all seven [checks](workday-fixture/retry.test.js). Run them without installing dependencies:

```bash
node --test media/workday-fixture/retry.test.js
```

The receiver is an in-memory mock. Atomic durable writes are an assumed receiver contract, not verified infrastructure. This run does not demonstrate real staging integration, production deployment, customer acceptance, cross-session recovery or a reliability rate. The customer interruption happened within one agent session; checkpoints were saved and read back.

## Render the animation

With Python, Pillow and a monospace font:

```bash
python3 media/render-chat-demo.py --font /path/to/monospace.ttf
```

The [scene text](chat-demo.json), [still image](chat-demo.png) and this transcript provide alternatives to watching the loop. The detailed [CLI recording](../docs/USAGE.md) remains available.
