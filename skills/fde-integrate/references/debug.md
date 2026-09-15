# debug - Find and repair the cause

**Enter when:** a reproducible failure, regression, incident symptom, or misleading output needs investigation.

Use [task context](task-context.md). Work from supplied permitted evidence without requiring `.fde/`. During an active incident, follow the authorized containment procedure before diagnosis; investigation authority alone does not authorize production writes.

## Method

1. Capture expected and observed behavior, exact input or trigger, affected revision/environment, and the last known working state. Preserve useful errors and timestamps without copying secrets or raw private data. Mark reports you have not reproduced as reports.
2. Inspect the failing path, callers, recent relevant changes, and existing tests. Reproduce in a permitted environment with the smallest representative case. If reproduction is unavailable, identify what observation would distinguish causes and gather safe evidence; do not claim a hypothesis is proven.
3. Keep a short hypothesis list. For each, name the predicted observation and a discriminating check. Change one relevant variable at a time. Trace values and control flow across the actual boundary instead of repeatedly changing code until the symptom disappears.
4. Fix the cause at the appropriate layer. Check whether the proposed fix changes behavior for other callers, stale data, retries, concurrency, or permissions. Preserve evidence of the original failure and avoid unrelated cleanup.
5. Add a regression check when it can meaningfully reproduce the bug; show that it fails before the fix and passes after when practical. If the check cannot run against the before-state, say so. Run affected adjacent and required checks using [verification](verification.md).
6. Review the final diff and exercise the original journey. For substantial or risky fixes use [review](review.md). After two unsuccessful repair cycles, reassess the hypothesis and evidence instead of repeating the same attempt; continue useful investigation and isolate the missing decision or access.

## Deliverable and acceptance

Report the cause with its evidence, the fix, the original reproducer's result, adjacent checks, and unresolved uncertainty. A disappearing symptom with no discriminating evidence is a mitigation, not a demonstrated root cause. In engagement mode record the incident/fix receipt in the appropriate existing record; standalone work may return it directly. Release or rollback requires the existing operational authority and [ship](ship.md) or recovery procedure.
