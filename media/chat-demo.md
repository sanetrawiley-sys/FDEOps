# From workshop to handover preparation

One terminal conversation: discovery, scope, build, a second customer's meeting, resumed tests, rollout decision and handover preparation. Users speak naturally; the small activity lines show which FDEOps method applies.

This is an edited terminal replay combining two scripted agent runs, not an unedited recording of Claude Code or Codex. It uses actual local code changes, test results, approved record saves, customer-context reads and a generated handover draft. Customers are fictional. Wording is condensed and reordered; typing, activity labels and reading pauses are staged. No production system was accessed.

## 01/07  Discovery

> @fde Workshop done. Finance keeps reprocessing payments. Where do we start?

Trace one failed payment with finance: delivery, acknowledgement, write. Check whether retries cause duplicates. Measure the recovery work first.

Customer failure pattern and business baseline still need evidence.

## 02/07  Scope

> @fde Finance approved retry fixes. Keep the ledger unchanged.

Saved PAY-42: one payment write per customer and event, even after retries. No ledger redesign. Check repeat delivery, restart and customer separation.

Approved scope saved to Garvey’s record.

## 03/07  Build

> @fde Build PAY-42. Save my place before the customer call.

Updated retry.js to validate identity and prevent duplicate writes. Checkpoint saved. The next step is to run the full local suite.

Baseline: 3 passed, 4 failed | Post-change checks pending.

## 04/07  Switch customer

> @fde Switch to Kesterman. What does Denise need to decide?

Defer Nashville role views, or trade scope and timeline. Reconfirm the demo. Garvey’s unfinished work is preserved.

Kesterman context loaded | Temporary selection, read-only.

## 05/07  Resume and test

> @fde Back to Garvey. Continue and test the change.

Recovered PAY-42 and checked that the code is unchanged. All 7 local tests pass. The real customer receiver still needs verification.

Tests: 7 | Passed: 7 | Failed: 0 | Local receiver mock.

## 06/07  Rollout decision

> @fde Seven tests pass. Are we ready for production?

Not yet. Replay retries against the durable receiver on customer staging. Security, CTO approval and finance acceptance remain pending.

Local evidence is ready. Nothing has been deployed.

## 07/07  Handover preparation

> @fde Prepare the handover and save tomorrow’s next step.

Handover draft ready: staging checks, operating owner and rollback needs. Saved next action: arrange the authorised staging replay.

handover-draft.md created | Production and handover acceptance pending.

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

## Discovery and handover capture

A second run read the discovery, planning, runbook and handoff methods using the same synthetic scope and local implementation. It recommended tracing a failed payment with finance before treating the supplied duplicate-write hypothesis as a verified customer incident. It reran all seven local tests and created [handover-draft.md](workday-fixture/handover-draft.md).

The generated draft was reconciled with Garvey’s existing record: June Porter owns acceptance, using a full-week EU replay, audit-log evidence and written acceptance. The historical baseline still needs to be validated for this rollout. The draft lists staging replay, security/CTO review, finance acceptance, operating owner and rollback evidence still required. It is a preparation artifact, not an accepted handover or completed production lifecycle. No additional customer record writes were made in this second run. Method labels in the animation are explanatory labels, not a host UI feature or exact tool-event transcript.

## Render the animation

With Python, Pillow and a monospace font:

```bash
python3 media/render-chat-demo.py --font /path/to/monospace.ttf
```

[Scene text](chat-demo.json) · [Still image](chat-demo.png) · [CLI recording](../docs/USAGE.md)
