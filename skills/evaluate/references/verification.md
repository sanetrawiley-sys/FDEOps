# verification - Make a claim replayable

**Enter when:** reporting completion, evaluating an acceptance check, handing work to a reviewer, or preparing a release.

Use [task context](task-context.md). This method returns evidence directly or writes an existing permitted task/engagement record; it never requires `.fde/` initialization.

## Method

1. Translate each claim into the observation that would support or reject it. Reuse agreed acceptance criteria and required repository checks. Select focused checks for changed behavior before broadening to release requirements.
2. Identify the actual repository commands, fixtures, runtime, and environment. Read command behavior before executing it, especially when it can write externally. Use authorized environments and avoid leaking secrets through logs or diagnostic commands.
3. Run the checks and inspect results, including exit status and relevant output. A running job, test discovery, a mocked response, and a successful real request are different evidence. Record asynchronous completion before claiming success.
4. Bind evidence to the tested revision and working tree. For uncommitted changes record the base revision plus changed paths and an available diff digest or snapshot identifier. For browser/manual checks record the steps, inputs, observed result, and inspected evidence.
5. After a change, rerun checks whose behavior or assumptions were affected. Reuse prior evidence only when the relevant code, dependencies, data, and environment remain applicable; cite the original run and reason. Never imply reused evidence was rerun.
6. Label every required check **passed**, **failed**, **blocked**, or **not run**. Include why blocked/not run, impact, and next step. Missing evidence is unproven; it is not an observed failure or a pass.

## Receipt

Use one compact entry per check or a table with these fields:

- Claim / acceptance check and expected result.
- Exact command and working directory, or manual journey and inputs.
- Environment, runtime/tool versions when relevant, and fixture/data source.
- Revision plus working-tree identity; run date/time.
- Observed result and exit status where available; safe evidence location.
- Status, limitations, unrun checks, and next step.

Keep implementation, verification, deployment, measured outcome, and customer acceptance distinct. A local pass supports the tested local behavior. An acceptance claim needs an attributed source from the agreed decision-maker or agreed acceptance mechanism. Record no raw `<private>` blocks, credentials, or hidden reasoning.

## Acceptance

A completion statement cites applicable evidence for its claims and explicitly names material gaps. If required checks fail, investigate or report the blocker; never skip them, edit expectations, or relabel the scope without authority to obtain a green result.
