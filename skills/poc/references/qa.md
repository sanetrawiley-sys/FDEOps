# qa - Exercise the changed journey

**Enter when:** a feature or fix needs behavioral verification through its real interface, especially UI, API, and multi-step workflows.

Use [task context](task-context.md) and the customer's existing browser, API, fixtures, and test tooling. `.fde/` is not a prerequisite. Respect the permitted environment and authority for every side effect.

## Method

1. Identify the changed journey, user roles, acceptance checks, and risk-bearing neighboring paths. Record the revision and environment. Use synthetic or sanitized fixtures with understood cleanup; do not borrow production data without permission.
2. Run the normal journey from its real entry point through the expected result. Verify persisted or downstream state when the requirement includes it; a success toast alone does not prove a write succeeded.
3. Select negative and boundary cases from the change: invalid input, empty/loading/error states, refresh/back navigation, retries, duplicates, permissions, or interrupted work. For UI changes, inspect relevant viewport sizes, keyboard access, focus, labels, and errors. Use a real browser for the affected journey.
4. Inspect relevant console and network evidence. Distinguish a UI defect from a failed API or unavailable environment. Retain only privacy-safe screenshots and logs. Do not claim visual verification from code inspection or a generated screenshot that was not viewed.
5. Report failures with steps, expected/actual result, revision/environment, evidence, and impact. If repair is authorized, use [debug](debug.md), then rerun the failed journey and affected neighbors. Keep unrelated findings separate from the change.
6. Produce a [verification receipt](verification.md). State which roles, devices, environments, or data conditions remain untested. Do not weaken acceptance checks to make the run pass.

## Deliverable and acceptance

Return checked journeys and observed results, reproducible defects, limitations, and remaining blockers. Done means the agreed behavioral checks passed under the stated conditions. A browser smoke test does not establish load capacity, security assurance, accessibility conformance, deployment, or customer acceptance by itself. When coordinated, append the evidence to the existing delivery record; standalone QA can return it directly.
