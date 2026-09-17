# FDEOps in one workday

One continuous terminal replay: discovery, scope, build, a customer switch, testing, rollout judgment and handover preparation.

The user speaks naturally. FDEOps chooses the method and keeps the work moving. The small muted line names the method for the viewer; it is an explanatory label, not a command the user has to remember.

The GIF is a shortened, edited replay of one fictional support workflow. The local routing fixture, six tests, checkpoints and handover draft were actually exercised. No production system was accessed or deployed.

## The conversation

1. **Discover** - “The queue is growing. Where do we start?”

   “Trace one request. Measure delay, rework and wrong routes.”

2. **Scope** - “Make the first slice small.”

   “Route three request types. Send everything else to a person.”

3. **Build** - “Build it. Save my place before the call.”

   “`triage.js` changed. Checkpoint saved. Baseline: 2/6 passed.”

4. **Switch customer** - “I have another customer call. Save this.”

   “Saved. This work stays intact. Brief ready for the next customer.”

5. **Resume and test** - “Back to the support team. Run the checks.”

   “Checkpoint recovered. 6/6 local cases pass. Staging is next.”

6. **Rollout decision** - “Can we roll it out?”

   “Not yet. Test representative requests in staging. Name the operator, rollback and approver.”

7. **Handover** - “Prepare handover and leave the next step.”

   “Runbook ready: operate, review, roll back. Next: authorised staging replay.”

## What the evidence means

The local fixture starts at 2/6 passing tests and reaches 6/6 after the routing change. That proves the local cases ran; it does not prove customer integration, staging readiness or production value.

The handover draft carries the operating questions forward: who operates the queues, who reviews exceptions, how to roll back and who accepts the result. Those conditions remain pending in the demo.

The customer switch is temporary and read-only. The first work is preserved; no second customer record is changed. The animation stages typing and pauses for readability.

## Reproduce the local fixture

```bash
node --test media/workday-fixture/triage.test.js
```

To render the GIF, use Python, Pillow and a monospace font:

```bash
python3 media/render-chat-demo.py --font /path/to/monospace.ttf
```

[Scene source](chat-demo.json) · [Still image](chat-demo.png) · [Handover draft](workday-fixture/handover-draft.md) · [CLI recording](../docs/USAGE.md)
