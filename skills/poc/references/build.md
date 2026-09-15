# build - Implement a verifiable increment

**Enter when:** an agreed behavior needs implementation in an existing or new repository. For a broken behavior, start with [debug](debug.md); for a system boundary, use [integrate](integrate.md).

Use the permitted context and authority in [task context](task-context.md). This method works without `.fde/`; an existing engagement record can supply the same contract. Do not initialize memory just to write code.

## Method

1. Identify the repository, its instructions, working tree, relevant callers, and test commands. Inspect examples before creating abstractions. Preserve unrelated edits and state which dependencies or interfaces the change touches. Before changing an untested legacy path, capture the undocumented behavior callers depend on with targeted characterization checks; distinguish behavior to preserve from the intended change.
2. State the observable outcome, constraints, and acceptance checks. Reuse agreed criteria for routine fixes. If a consequential product choice is unresolved, surface that choice while continuing independent investigation; do not invent acceptance.
3. Choose the smallest coherent path that demonstrates the outcome through the real entry point. Include the necessary storage, error handling, and interface behavior in that slice. Name the failure that stops expansion and the recovery path for stateful changes.
4. Implement using the repository's tools and conventions. Search for existing services, fixtures, and validation before adding alternatives. Keep cleanup limited to what makes the changed path understandable; do not expand scope to repair unrelated code.
5. Run focused checks, then required repository checks. Exercise the actual affected journey with [QA](qa.md) when appropriate. For uncertain model behavior, use [eval-pack](eval-pack.md). Record results with [verification](verification.md), including checks that could not run.
6. Inspect the final diff against the agreed outcome. For substantial or risky work, seek [review](review.md) using an actual separate reviewer when available; identify a self-check honestly. Reverify affected behavior after fixes.

## Deliverable and acceptance

Return the implemented behavior, relevant paths, evidence, remaining limitations, and any decision needed. Done means the agreed checks have applicable evidence and the change is reviewable; passing tests does not imply deployment or customer acceptance. Committing, opening a PR, merging, and publishing happen only when the requested workflow authorizes those actions.

When coordinated through `@fde`, record implementation and verification in the existing decisions/delivery records under their write rules. Standalone work can return the same receipt directly or use the repository's task record.
