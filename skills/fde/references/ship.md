# ship - Deliver the increment

**Enter when:** you are writing or updating on their codebase, they need to see something real, or you are going live.

**Read first:** `context.md`, `decisions.md`, `delivery.md`, `success.md`. Load `terrain.md` before you touch their code. Load `trust-profile.md` if the deploy touches regulated data or needs an approval chain. Load `evals.md` when the work touches AI/ML/LLM/RAG/agents.

Do not ask them to pick a mode. Name where you are, then start at the matching section:

- Nothing on their staging yet → **one change they can see**
- On staging, the signer in `success.md` can reject it → **go-live**
- Prod is the question → **go-live**. Do not start a second change.

If going live, check the evidence for the recovery path: has rollback, restore, compensation, or roll-forward been exercised under representative conditions? If only planned, validate it before release. Reuse applicable drill evidence when the mechanism and relevant conditions are unchanged; record why it applies.

A bounded experiment that tests an assumption is `poc`. This skill turns a validated direction into a maintainable change on a repo they will own, then production. Inspect existing prototype code and retain suitable tested parts; replace unsafe shortcuts based on evidence. A successful demo alone does not satisfy the readiness gates below.

**Before a new delivery plan or material scope change:** run `fde doctor --ready`. Missing binary success or a named customer-side signer blocks progression: review the proposed acceptance check and authority with the FDE first. Use a test/input and observable pass/fail under **Done when:** or **Acceptance check:**. A number, role, or successful demo alone is insufficient. Do not invent missing facts to pass lint. Routine reversible fixes within confirmed scope reuse the existing signer and acceptance check; record verification without restarting approval. New judgment in the record still requires confirmation.

## Field (name it once, then the same loop)

| | Brownfield | Greenfield |
|--|------------|------------|
| What you touch | Code they already run | A new path or empty tree they will own |
| First move | Characterise their tests, their runner, the workaround in `terrain.md` | First path a user can click. Not the whole product. |
| Proof | Agreed representative environment and replayable acceptance check | Agreed representative environment and replayable acceptance check; record what remains untested before release |
| Undo | Revert this change on its own | Name rollback or tested recovery; identify irreversible effects and required authority. |

Skip POC only when the killer assumption already lives in the repo (typical brownfield). If the bet is unproven, `poc` first.

**Customer delivery means:** the signer in `success.md` can replay and reject the agreed acceptance check in an environment they operate. A green check on your laptop proves only what ran there. Routine fixes can share a delivery checkpoint; distinguish implementation, verification, deployment, and acceptance.

If `terrain.md` **Data estate** lists a **Blocker** this change depends on (source or pipe): stop. That is discover, not ship. Do not build a path they cannot feed.

## Method - one change they can see

One change = one coherent outcome with observable verification and a bounded recovery path. Prefer vertical slices that can be reviewed and exercised independently. A PR is how this often lands. It is not the job. The job is the change they can see.

```
BAD (layers):
  1: all database models
  2: all API endpoints
  3: all UI components
  4: wire everything together (and pray)

GOOD (one user action each):
  1: User can create a payment (schema + endpoint + minimal UI) - testable
  2: User can view payment status (query + endpoint + UI) - testable
  3: Payment retry on failure (logic + endpoint + UI feedback) - testable
  4: Admin can void a payment (auth + logic + UI) - testable
```

Prefer independently revertible changes. When data or external effects cannot be undone, name the dependency, containment, tested recovery, and authorized owner before release.

**Before you start this change:**

- [ ] It is in `decisions.md` with acceptance criteria (happy + unhappy path)
- [ ] Blast radius declared: which files, which systems, which users affected
- [ ] Rollback named: revert this change, or something more specific
- [ ] No dependency on an unmerged change (if dependent, state it and land in order)
- [ ] `Kill if` is written - the observation that stops this change
- [ ] Before-state evidence identified: the relevant failing output, number, or behavior, with its source and date. For a routine fix within confirmed scope, reference applicable existing evidence and batch the delivery receipt; capture new evidence when the relevant behavior or conditions changed. Never imply an old check was rerun.
- [ ] Open PRs and uncommitted work in the area checked (`gh pr list`, `gh pr diff <n> --name-only`); overlap goes to `decisions.md` before you start

Your coding pack writes the function. This skill owns done. When they disagree with this repo, the repo wins.

**The loop.** In this order:

```
Read existing code in the area (search before creating)
  → Characterise what is already there (their tests, their runner; greenfield: the empty tree)
    → Implement the smallest path that works
      → Verify the change; demonstrate at the agreed delivery checkpoint (below)
        → Cleanup pass (dedupe, simplify - behaviour unchanged)
          → Self-review against acceptance criteria
            → Commit with a message the client's team can read
              → Update decisions.md + delivery.md
```

**Verify the change and prove customer delivery.** Match evidence to the reviewed revision, environment, and acceptance criteria.

- Use **their** test commands, fixtures, and CI. Record the command, result, revision, environment, and run date in `delivery.md`. Reuse existing evidence only when the relevant code and conditions are unchanged, citing why it still applies; never claim it was rerun. Run affected checks for changed behavior and required release checks before deployment. Missing evidence means unproven, not an observed failure.
- At the agreed delivery checkpoint, the signer in `success.md` must be able to replay and reject the acceptance check using an interface they operate (screen, API, report, or equivalent). Routine fixes can share that checkpoint; passing tests alone does not establish customer acceptance.
- Prefer staging they operate. When unavailable, use an agreed, permitted representative test environment, record its owner and limitations, and resolve material release-evidence gaps before production. A local demonstration is not deployment.
- **Representative data.** Use permitted sanitized or synthetic fixtures that exercise relevant volumes, edge cases, and operating paths. Before go-live, record gaps such as batch timing, distribution, or production-only dependencies and their impact on the acceptance and abort checks. Resolve material gaps or explicitly narrow the release; never load sensitive production data merely to make a demo realistic.
- Model in the path: `eval-pack` until `evals.md` says SHIP. Do not skip because "it looked right in chat."
- A model drafts. A named human on their side ships. No unsupervised loop on their production. If the brief demands lights-out write-access, that is `who-decides` / `hold-scope`, not ship.

The proof is whatever this client already believes, plus one new receipt they can replay.

**Size by reviewability and risk.** Keep one coherent intent, bounded context, and observable acceptance checks. Split unrelated behavior or work whose recovery and review cannot be understood together. Diff size and elapsed time are warning signals, not hard gates: generated changes may be large and low risk; a one-line permission change may be critical. Use the repository’s checks and add meaningful coverage for changed behavior, rather than a test-count quota.

**Show it.** Every 2-3 changes, something the customer can see: an endpoint they can hit, a UI they can click, a metric that moved, a risk that was retired. Technical progress invisible to stakeholders is trust decay. `delivery.md` gets updated after every visible change.

**The scope trap.** Mid-change discoveries ("this module also needs updating," "I should refactor this while I'm here"):

- If it's in `decisions.md`: do it as a separate change.
- If it's NOT in `decisions.md`: log it as a scope receipt (see `hold-scope.md`), don't touch it.
- Ugly code outside this change stays ugly. That is discipline, not laziness.

After each change: required checks pass with applicable evidence, acceptance criteria evaluated, blast radius as declared, `Kill if` still false. At the agreed delivery checkpoint: what did they see, and what is their signal? Before production, complete the go-live gates below.

---

## Deployment readiness gate (confirm the target before building the runway)

Before scoring readiness, confirm WHERE this is going. State it in 2-3 lines - brief playback that invites correction:

> "Deploying to: [target]. Pipeline: [how it gets there]. Rollback mechanism: [how to undo]. Any constraint I should know about?"

**The checklist (confirm, don't assume):**

| Dimension | Question | Status |
|-----------|----------|--------|
| **Target** | Cloud provider + service (ECS/Lambda/K8s/VM/on-prem)? | |
| **Pipeline** | CI/CD exists? Manual? Who triggers prod deploy? | |
| **Environments** | Dev → staging → prod path clear? Or deploying direct? | |
| **Secrets** | Where do they live? (vault/SSM/env vars) Who provisions? | |
| **Access** | Do YOU have deploy permissions, or does someone else push? | |
| **Compliance** | Region constraints? Data residency? Encryption requirements? CAB/change window? | |
| **Infra-as-code** | Terraform/Pulumi/CDK/manual? State file location? | |

**If anything is blank:** ask now. Discovering deployment constraints after the change is where timelines slip. If the client hasn't defined these yet, that's a conversation before you write the runbook - not after.

Write confirmed deployment context to `delivery.md` under a `## Deployment target` section.

---

## Method - readiness gate (score before touching the deploy button)

Score each dimension green/amber/red. This is the gate, not a suggestion:

| Dimension | Green | Amber | Red |
|-----------|-------|-------|-----|
| Tests | All pass on deploy branch | Flaky tests skipped with justification | Failures present or tests not run |
| Recovery | Applicable tested rollback/restore/compensation/roll-forward meets agreed recovery and data-loss limits | Documented; drill evidence needs refresh | No viable recovery, failed drill, or irreversible effects lack explicit authority |
| Sign-off | Stakeholder approval in `decisions.md` with date | Verbal approval, not logged | No approval sought |
| Runbook | Exists and someone other than you has read it | Exists but unreviewed | Missing |
| Monitoring | Alerts configured, owner named, dashboard live | Alerts configured, no named owner | No monitoring |

### Value + receipts gate (score with the table above)

| Dimension | Green | Amber | Red |
|-----------|-------|-------|-----|
| **Value bucket** | `success.md` names primary bucket (`cost-save` \| `risk-mitigation` \| `revenue-uplift`) and a baseline→target metric; this change's value-ledger row has **Bucket** + **Promised** | Bucket named; **Measured** still `pending` with a pulse date | No bucket, or Promised empty / ticket-theater only |
| **Audit receipt** | Dated line in `delivery.md` (`## Ship receipts` or ledger Evidence) proving exceptions/operating path were walked - cite `terrain.md` / `reality.md` / `audit.md` | Path described, not verified this ship | No audit receipt for this change |
| **Eval receipt** | **n/a** (no AI on this change) **or** `evals.md` Verdict SHIP with dated golden run + HITL gate named | Eval pack exists; known fails open with owner + date | AI in scope and no eval receipt |
| **AI eval pack** | `.fde/evals.md` Verdict SHIP; goldens run this change; critical fails 0; HITL filled if policy requires | Pack exists; run stale vs change log | AI-touching deploy and pack missing / NO-SHIP / HITL required but empty |

**Any RED = stop. Do not deploy. Fix the red dimension first.**
**2+ AMBER = sponsor conversation before deploying.** Present the ambers and get explicit "proceed" or "fix first."

**AI-touching deploys (model, embeddings, RAG, agent, or inference path):**
1. Read `.fde/evals.md`. If missing → **RED. Do not deploy.** Create the pack (`eval-pack` / `ai` overlay) and re-score.
2. If Verdict is not **SHIP**, or Last run is older than the latest change-log row → **RED.**
3. If `trust-profile.md` requires human-in-the-loop and the HITL gate has no reviewer → **RED.**
4. Log in `delivery.md` → `## Ship receipts` before deploy: audit cite + eval receipt.
5. Non-AI deploys: Eval = **n/a** - do not invent an empty pack.

Write the readiness score (including value + receipts) to `delivery.md` before deploying. The score is the evidence if anything goes wrong.

## Intent vs diff (before pre-blast)

Ship the change you intended - not the drift that snuck in. Run this on the deploy branch against the **one-line intent** from `decisions.md` / `success.md` (the change you said you were building).

```bash
git diff <base>...HEAD --stat
git diff <base>...HEAD
```

Score every touched path (or logical hunk):

| Path / change | Verdict | Rule |
|---------------|---------|------|
| | **KEEP** | Directly required for the stated intent |
| | **JUSTIFY** | Adjacent but load-bearing - one sentence why it must ship *now*, or split |
| | **SPLIT** | Real work, wrong change - park in `decisions.md` kill/Next; do not deploy with this one |
| | **DROP** | Noise (format-only, drive-by rename, unrelated tidy) - revert before ship |

**Any SPLIT or DROP still in the tree = fix-first.** JUSTIFY without a written sentence = treat as SPLIT. Log a one-line receipt in `delivery.md`: `intent vs diff: KEEP n · JUSTIFY n · SPLIT n · DROP n - <intent>`.

This is **code drift**, not stakeholder "also can you…" (that is `hold-scope`). Same family as review Stage 1 - ship refuses green when the diff outgrew the claim.

## Pre-blast challenge (before the deploy button)

For any non-trivial go-live (shared infra, regulated data, irreversible migration, or first prod touch), run this once before canary - not as theater, as a stop-the-line check:

```
CLAIM: <what you are about to ship, in one sentence>
WHY IT MATTERS: <blast radius / who feels pain if wrong>
CHALLENGE: <the strongest argument this is not ready - grounded in delivery.md / risks.md / trust-profile.md>
VERDICT: proceed | fix-first | sponsor conversation
```

Rules: no invented stakeholders; if evidence is missing, the verdict is **fix-first** or **sponsor conversation**, not "probably fine." Log the CLAIM + VERDICT as a dated line in `delivery.md`. Skip for mechanical one-line config with an already-tested rollback.

## Method - pre-flight (you verify each, confirmed not assumed)

- All tests pass - state the command and result.
- No hardcoded secrets/credentials (repeat `--include` per extension - brace globs silently match nothing):
```bash
grep -rnE "(api[_-]?key|secret|password|token)\s*[:=]\s*['\"][^'\"]{8,}" \
  --include="*.js" --include="*.ts" --include="*.py" --include="*.env" \
  --include="*.yaml" --include="*.json" . | grep -vE "example|template|test" | head
```
- DB migrations checked for compatibility, data loss, and old/new application coexistence. Prefer expand/contract for destructive changes. Irreversible steps require explicit authority and a tested restore, compensation, or roll-forward plan.
- Recovery documented **and tested**, with acceptable recovery time and data loss.
- Monitoring alerts configured, someone watching.
- Team knows the deploy is happening.
- Deploy window has staffed observation and recovery coverage appropriate to the risk; respect the client’s change calendar and business-critical periods.
- **Change approval (CAB) environments:** window open, ticket approved. In banking/healthcare/gov, deploying outside an approved window is a compliance finding even when the deploy succeeds. "We didn't know there was a CAB process" is not a defence - find out before the deploy date.

## Method - the deploy

**Rollout:** Choose canary, blue/green, staged cohorts, or the client’s proven release mechanism based on isolation, traffic, and failure cost. For a canary, set cohort size, exposure cap, observation duration, minimum sample, and advance/abort thresholds before starting; allow for delayed and batch effects. Watch errors, latency, and **the business metric this change affects**. Breached thresholds or critical harm → halt expansion and execute the tested recovery/containment plan; investigate after exposure is controlled. Advance only with sufficient evidence and a named operator.

**Canary receipt** (write it, or the canary did not happen): what was watched, on whose dashboard, for how long, and that the next change did not start in the window. If prod is a CAB console, vendor button, or their pipeline, write the owner and the click path - the host agent does not get to pretend it shipped.

**Programme-scale rollout (transformations)** - different problem from one service:
1. **Pilot** - one team, one use case; success metrics defined *before* it starts (after = fitting metrics to results).
2. **Limited release** - 3-5 teams, real load; this is where the failure modes the pilot hid show up.
3. **Broad release** - self-serve onboarding; if teams still need the FDE to start, onboarding isn't finished.
4. **Enterprise standard** - the FDE is no longer needed for this use case. That's the end state.
Straight from pilot to standard = a high-profile failure at scale.

## Method - after

Keep implementation, test results, deployment, measured outcome, and customer acceptance separate in the receipt. Record the environment, observation window/sample, source, and remaining gaps. A commit is not a deploy; a staging measurement is not realized production value. When the baseline is missing or incomparable, record the observed result and the measurement next step without claiming an improvement. Record acceptance only for what the named person actually accepted, with a dated source; an engineer's summary remains attributed to that summary.

Smoke tests against production. Verify the business metric moved the right way. Then **define the pulse before closing the laptop** - a deploy without a pulse is one you'll hear about only when it breaks:

1. **Metric:** the number that says it's working - "p99 on payment endpoint < 800ms", not "errors low."
2. **Frequency:** daily week one, weekly after, monthly when stable.
3. **Threshold:** the exact value that triggers incident response. Nobody knows the number → nobody acts until too late.

AI components: also define what *normal output* looks like and check a weekly sample of real production outputs - drift is technically-valid-but-wrong, and no exception will fire.

## Method - scale readiness (pilot proved it, now deploy enterprise-wide)

A successful pilot does not establish readiness for wider use. Check organizational ownership, governance, and infrastructure alongside technical performance before expanding.

**The scale-readiness gate (all must be YES before broad rollout):**

| Dimension | Question | Ready? |
|-----------|----------|--------|
| **Infra** | Can the system handle 10× current load without architectural change? | |
| **Ops** | Can someone other than the FDE operate it at 2am? (runbook exists, tested) | |
| **Data** | Is the data pipeline automated, not manual? Does it handle upstream schema changes? | |
| **Security** | Has infosec signed off for production data at scale? | |
| **Cost** | Is the cost model viable at 10× volume? (AI inference costs scale non-linearly) | |
| **Governance** | Is there an owner, a review cadence, and an escalation path? | |
| **Support** | Can users get help without the FDE? (docs, training, L1 support path) | |
| **Measurement** | Are success metrics automated and dashboarded, not manually calculated? | |

**If any dimension is "No":** that's the work before scaling. Name it, size it, put it in the plan. Scaling without readiness = a high-profile failure that kills the entire programme.

**The scale sequence:**
1. **Pilot** (1 team, controlled) → prove value, find failure modes
2. **Limited** (3-5 teams, real load) → prove operability, find scale bugs
3. **Broad** (self-serve onboarding) → prove the team doesn't need the FDE
4. **Standard** (enterprise default) → the FDE exits this workstream

Never skip a step. The sponsor always wants to skip from pilot to standard - that's the conversation the FDE protects.

## Method - progressive adoption (built it, now people need to use it)

Adoption isn't a handoff-stage problem - it starts while you are still writing the change. Software that launches to silence is software that gets decommissioned.

**During the change:**
- **Controlled exposure.** Use a feature flag or equivalent isolation when it reduces rollout risk. Choose cohorts and expansion criteria from traffic and impact; name the flag owner and removal point.
- **Feedback loops built in.** A thumbs-up/down, a "was this helpful?", a usage counter. Instrument adoption, don't assume it.
- **Resistance signals.** Watch for: workaround creation (they built a spreadsheet instead of using the tool), drop-off after day 3 (onboarding fails), vocal detractors (one influential skeptic can kill adoption). Address these before launch, not after.

**At launch:**
- **Champion network.** Identify 2-3 power users per team who adopt early. Support them intensely - they become your multiplier.
- **Adoption targets agreed before launch.** Define the eligible users, expected usage frequency, observation window, baseline, and owner. A weekly workflow needs a different measure from a quarterly one. Investigate misses with users; usage alone does not establish whether onboarding, access, or value is the cause.
- **The "switching cost" test.** If users can still do it the old way, they will. Adoption requires either: the old way is removed, the new way is dramatically better, or management mandates the switch. Know which lever applies.

**Write adoption metrics to `delivery.md`:** active users, frequency, drop-off points, resistance signals. This is the evidence for renewal.

## Artifact

**`decisions.md`** - each change: what was implemented, what was tested, what was deferred, `Kill if`.

**`delivery.md`** - each visible change in business language; then the deployment record: what shipped, when, recovery procedure, pulse definition, **scale-readiness assessment, and adoption metrics**. Written for whoever inherits the system.

## Checkpoint

After each change: required checks pass, acceptance criteria evaluated, blast radius as declared, `Kill if` still false. Batch routine fixes at the agreed delivery checkpoint; record staging and customer acceptance separately.

Before full exposure: the chosen rollout’s advance criteria are met with sufficient observation and business-metric evidence, and the pulse is written into `delivery.md`. Also green: value bucket named, audit receipt dated, eval receipt **n/a or pass**, **intent vs diff clean** (no unresolved SPLIT/DROP). Missing any of those → not green. For enterprise-scale: scale-readiness gate passed before broad rollout.

## Worked example

Acme, brownfield. Plan Now has three changes, not "the payments rewrite."

Change 1 is *user sees retry status on a failed payment* - schema + endpoint + the existing ops screen, 180 lines, their `pytest -k payments` green, revert is this change. `Kill if:` the signer cannot reject it on the screen they already use. Ugly retry-queue code two files over stays ugly. `decisions.md` logs the change; `delivery.md` says ops can see a retry without opening the spreadsheet. Marco sees it on staging they operate. That is the proof. Local green was not.

Then Thursday go-live of the failure-routing change. Readiness scoring catches two things the diff does not. The audit receipt is missing: the operating map says Marco's manual re-run is the fallback, and nobody has checked whether the new page fires *before* his morning run or after - if after, the alert changes nothing. That gets walked and cited before deploy. Second, the intent-vs-diff read shows the PR also touches the settlement retry that was deferred; it comes out.

Pre-blast challenge: "what does this break if it fires at 3am and nobody acks?" Answer: nothing breaks, but the rota is not yet agreed - so the deploy waits on a name, not on code. That is a one-day slip that prevents a fake green.

After deploy: `delivery.md` ship receipt with the audit cite, the kill test evidence, and the rollback line. Eval receipt: n/a, no AI in this path.

Greenfield is the same loop with an empty tree: first path a user can click, on an environment they will operate, then this go-live. Not the whole product in one dump.

## Principles

- One user action per change. Layers are untestable until assembled.
- Prove the agreed outcome in their environment and test recovery. Local green is not customer delivery.
- The ugly code outside this change stays ugly. That's discipline, not laziness.
- A deployment needs tested recovery within agreed time and data-loss limits; irreversible effects require explicit authority.
- Halt expansion on breached thresholds or critical harm; contain exposure with the tested recovery plan before investigating.
- Verify the business metric, not just the technical one.
- No value bucket, no green ship. No pulse, no done.
- Diff larger than the stated intent without KEEP/JUSTIFY receipts = fix-first.
- AI path without eval receipt = fix-first; non-AI ships leave eval as n/a.
- Scale readiness is organizational, not just technical. Check all 8 dimensions.
- Adoption is measured from day one, not hoped for at launch.
