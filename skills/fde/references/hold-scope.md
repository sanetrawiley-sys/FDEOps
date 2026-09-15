# hold-scope - Hold scope

**Context:** apply [task context and evidence](task-context.md) before using the named records below.

**Enter when:** "also can you…" mid-build, a stakeholder adds requirements without adjusting timeline, the FDE feels scope creeping but can't name it, or `success.md` no longer matches what's being asked.

**Read first:** `success.md` (the agreed boundary), `decisions.md`, `context.md`. Load `stakeholders.md` to know who's asking and their signal.

Small requests can accumulate into material changes to cost, timing or acceptance. Compare the request with the actual agreement before classifying it; an adjacent request may already be in scope, and a clarification is not automatically an addition.

## Method (you do this work)

**1. Detect before it compounds.** Patterns worth checking against the agreement:

| Pattern | What it sounds like | What to check |
|---------|--------------------|--------------------------|
| **The friendly addition** | "While you're in there, could you also…" | Whether the work is already covered and what it changes |
| **The evolved requirement** | "Oh, what I actually meant was…" | Whether this clarifies existing acceptance or proposes a change |
| **The stakeholder swap** | A new person starts requesting features the original sponsor didn't | The requester's authority and whether the request changes the agreed outcome |

**2. The scope receipt.** Record consequential proposed changes and cumulative impact in the existing task or engagement record. Routine clarifications within confirmed scope can share a concise update; do not add a separate ceremony for each request. Distinguish estimates from measured effort and proposals from decisions:

```markdown
## Scope change - <date>
Requested by: <who>
Request: <what, in their words>
Impact: <estimate with assumptions, or unknown; affected work/risk/acceptance>
Authority: <applicable agreement/decision source or unknown>
Status: proposed / confirmed in scope / agreed change / deferred / declined / disputed
```

Show consequential judgments and uncertainties for confirmation before saving unless already explicitly confirmed. Use the existing task or `decisions.md` workflow; label an unapproved request as proposed rather than logging it as an agreed scope change.

**3. Recommend a disposition.** Explain the fit and tradeoffs; use the relevant authority for any change:

| Bucket | What you say | When to use |
|--------|-------------|-------------|
| **This phase** | "That is covered by the current agreement. Here is its impact on the plan." | The request is within confirmed scope and authority; do not promise unchanged timing without evidence |
| **Next phase** | "This adds <impact>. I recommend deferring it or agreeing a tradeoff." | The request changes current commitments; a future phase is proposed, not promised |
| **Separate engagement** | "That's a different problem - it deserves its own brief and its own timeline." | The request requires a materially different outcome, access or commercial agreement |

Decline a request clearly when it conflicts with policy or the applicable authority rejects it. No wording can substitute for a real scope decision.

**4. The accumulation conversation.** When the scope receipts show a pattern - a material cumulative impact on delivery, cost, risk, or acceptance - the FDE needs a conversation with the sponsor:

Frame it as **protection, not complaint:**
> "We've absorbed five changes since the original agreement. Each one made sense individually. Together, they've added roughly two weeks. I want to make sure the timeline expectation still matches - should we adjust the delivery date, or reprioritise to keep the original date?"

Evidence-based: point to `decisions.md` scope receipts with dates and requesters. Use the actual scope decision-maker; sponsorship alone does not establish delegated authority.

**5. The commercial boundary.** In paid engagements, scope creep silently moves billing and liability:

- If the engagement is time-and-materials: scope creep is the client's money, but flag it - they deserve to know what they're buying.
- If the engagement is fixed-price: check the change terms and contingency; material changes may affect margin or commitments. Surface the evidence to whoever owns the commercials.
- If the engagement has a success fee: scope changes that move the success criteria affect compensation. Log it.

## Artifact

**`decisions.md`** - scope receipts, dated and attributed. The running record the accumulation conversation references.

**`success.md`** - updated ONLY when a scope change is explicitly agreed. Never silently expanded. Each update: what changed, who agreed, date.

## Checkpoint

Check cumulative impact against the agreed scope and remaining capacity. Recommend a conversation as soon as delivery, cost, risk, or acceptance changes materially; one consequential request may suffice. No logged requests alone does not prove scope is holding.

## Worked example

Acme, week 5. Nothing has been formally added, and the slice is a week late.

The pattern shows in three requests: a "quick" finance CSV export (Jun 20, half a day, from Denise directly), retry-logic cleanup asked for mid-build (Jun 24, one day, Tom), and a dashboard tile "while you're in there" (Jun 27, half a day). Each sounds reasonable; their cumulative estimates explain part of the slip and need a scope decision.

Three-bucket response, applied while the requests can still be placed: the CSV export fits this phase only with an accepted trade (it displaces the runbook polish), the retry cleanup goes to the kill list in `decisions.md` with the what-breaks reason, and the tile is absorbed because it is genuinely twenty minutes - included in the existing progress receipt so cumulative impact remains visible.

That conversation happens with Priya when the added work threatens the date, with the receipts on screen: "here are the asks, their estimated impact, and what moved." Confirm Priya holds the relevant scope authority before treating her response as agreement.

## Principles

- Compare requests with the agreement before classifying them.
- Record consequential changes with their source, authority and status; batch routine work.
- Escalate material impact, not an arbitrary count of requests.
- Missing boundaries do not grant permission to expand scope.
- `success.md` records agreed scope; it does not replace the governing agreement.
- Make tradeoffs visible without inventing motives, approval or future commitments.
