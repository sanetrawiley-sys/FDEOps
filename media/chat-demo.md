# FDEOps in one workday

One continuous terminal replay: discovery, scope, build, a customer switch, testing, rollout judgment and handover preparation.

The user speaks naturally. FDEOps chooses the method and keeps the work moving. The small muted line names the method for the viewer; it is an explanatory label, not a command the user has to remember.

The GIF is a shortened, edited replay of two scripted runs using fictional Garvey Payment Systems and Kesterman Freight Lines records. The local retry fixture, seven tests, checkpoints and handover draft were actually exercised. No production system was accessed or deployed.

## The conversation

1. **Discover** - “Finance sees duplicate payment retries. What do we know?”

   “A hypothesis, not a measured incident. Trace one failed payment with Finance. Measure the recovery work before designing the fix.”

2. **Scope** - “Make the first slice small.”

   “PAY-42: one write per tenant and event. No ledger redesign. Acceptance: seven checks, then customer staging.”

3. **Build** - “Build it. Save my place before the call.”

   “`retry.js` changed. Checkpoint saved. Baseline: 3/7 passed. Next: run the full local suite.”

4. **Switch customer** - “Kesterman meeting in five minutes. Brief me.”

   “Denise must choose: defer Nashville views, or trade scope for the timeline. Garvey’s unfinished work is preserved.”

5. **Resume and test** - “Back to Garvey. Verify PAY-42.”

   “Checkpoint recovered. 7/7 local tests pass. The customer receiver still needs staging verification.”

6. **Rollout decision** - “Seven tests pass. Ship it?”

   “Not yet. Replay against the durable receiver on customer staging. Security, CTO approval and Finance acceptance are pending.”

7. **Handover** - “Prepare handover and leave the next step.”

   “Runbook draft ready: owner, rollback and staging checks. Saved next action: arrange the authorised replay.”

## What the evidence means

The local fixture starts at 3/7 passing tests and reaches 7/7 after the retry change. The receiver is an in-memory mock. That proves the local checks ran; it does not prove durable persistence, customer integration, staging readiness or production value.

The handover draft carries Garvey’s existing acceptance criteria: June Porter owns finance acceptance, with a full-week EU replay, zero manual Excel reprocessing in the audit log and written acceptance. Those conditions remain pending in the demo.

The customer switch is temporary and read-only. Garvey’s work is preserved; Kesterman’s record is not changed. The animation combines two scripted runs and stages typing and pauses for readability.

## Reproduce the local fixture

```bash
node --test media/workday-fixture/retry.test.js
```

To render the GIF, use Python, Pillow and a monospace font:

```bash
python3 media/render-chat-demo.py --font /path/to/monospace.ttf
```

[Scene source](chat-demo.json) · [Still image](chat-demo.png) · [Handover draft](workday-fixture/handover-draft.md) · [CLI recording](../docs/USAGE.md)
