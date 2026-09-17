# FDEOps in a conversation

Use natural language in your AI coding agent. FDEOps retrieves the selected customer's context and helps prepare the next decision.

This is a terminal-style replay, not a screen recording. It uses actual agent responses to fictional customer records, shortened in the GIF. It shows read-only preparation and temporary customer selection, not a production deployment or a persistent workspace switch.

## Conversation

### Resume the project

> @fde Pick up Garvey. What is stopping the rollout?

In the fictional snapshot, security sign-off blocks the production canary; CTO phase approval is also required. Staging is recorded, but deployment is unproven. The finance outcome remains unmeasured and unaccepted.

### Prepare the release review

> @fde What should I take to the release review?

Bring the staging-demo evidence, security-ticket status, CTO approval status, and rollback plan. Flag missing trial measurements. Acceptance requires a full week of EU failures replayed, zero manual reprocessing in the audit log, and June Porter’s written acceptance - not merely the proposed one-night trial.

### Switch customers

> @fde Switch to Kesterman. What needs my attention?

Temporary read-only selection; no persistent switch or saves. The snapshot prioritizes Karen’s write-back race review and Denise’s scope/demo decision: three additions, unchanged timeline. Preserve the carrier-assignment macro and Nashville workaround. Sponsor dissatisfaction is unverified; production requires Denise’s approval. Reported 98.8% parity does not establish acceptance.

## Source and reproduction

The responses were captured with Codex CLI 0.154.0 using FDEOps 5.1.10 and the repository's [Garvey](../examples/garvey-payments/) and [Kesterman](../examples/kesterman-freight/) records as historical scenario snapshots. The agent used sanitized CLI packets; no customer system was connected. An initial record-path lookup failed and was corrected before the responses shown here. Tool calls are omitted; typing and pauses are staged for readability. This is one illustrative run, not a reliability benchmark.

The displayed text is in [chat-demo.json](chat-demo.json). With Python, Pillow and a local monospace font:

```bash
python3 media/render-chat-demo.py --font /path/to/monospace.ttf
```

This renders the GIF and a [still image](chat-demo.png). The text above is the accessible alternative. The separate [CLI recording](../docs/USAGE.md) shows the underlying record commands.
