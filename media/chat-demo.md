# FDEOps in one workday

One continuous terminal replay: discovery, scope, build, a customer switch, testing, rollout judgment and handover preparation.

The user speaks naturally. FDEOps chooses the method and keeps the work moving. The small muted line names the method for the viewer; it is an explanatory label, not a command the user has to remember.

The GIF is a shortened, edited replay of two scripted runs using fictional Northstar Support and Kesterman Freight Lines records. The local routing fixture, six tests, checkpoints and handover draft were actually exercised. No production system was accessed or deployed.

## The conversation

1. **Discover** - “The support queue is growing. Where do we start?”

   “Follow one request from arrival to assignment. Measure waiting time, rework and misroutes.”

2. **Scope** - “Make the first slice small.”

   “Classify three request types and route them to existing queues. Keep unusual cases with a human reviewer.”

3. **Build** - “Build it. Save my place before the call.”

   “`triage.js` changed. Checkpoint saved. Baseline: 2/6 passed. Next: run the local cases.”

4. **Switch customer** - “Kesterman meeting in five minutes. Brief me.”

   “Denise must choose: defer the extra report, or trade scope for the date. Northstar’s unfinished work is preserved.”

5. **Resume and test** - “Back to Northstar. Verify the router.”

   “Checkpoint recovered. 6/6 local cases pass. The real queue still needs a staging check.”

6. **Rollout decision** - “Six cases pass. Ship it?”

   “Not yet. Replay representative requests on customer staging. Name the operator, rollback and acceptance owner first.”

7. **Handover** - “Prepare handover and leave the next step.”

   “Runbook draft ready: queues, review path and rollback. Saved next action: arrange the authorised staging replay.”

## What the evidence means

The local fixture starts at 2/6 passing tests and reaches 6/6 after the routing change. That proves the local cases ran; it does not prove customer integration, staging readiness or production value.

The handover draft carries the operating questions forward: who owns the queues, what happens to unusual requests, how to roll back and who accepts the measured result. Those conditions remain pending in the demo.

The customer switch is temporary and read-only. Northstar’s work is preserved; Kesterman’s record is not changed. The animation combines two scripted runs and stages typing and pauses for readability.

## Reproduce the local fixture

```bash
node --test media/workday-fixture/triage.test.js
```

To render the GIF, use Python, Pillow and a monospace font:

```bash
python3 media/render-chat-demo.py --font /path/to/monospace.ttf
```

[Scene source](chat-demo.json) · [Still image](chat-demo.png) · [Handover draft](workday-fixture/handover-draft.md) · [CLI recording](../docs/USAGE.md)
