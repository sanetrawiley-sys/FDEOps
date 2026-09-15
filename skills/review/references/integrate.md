# integrate - Prove the system boundary

**Enter when:** connecting an API, data source, SDK, event stream, tool, or service, or changing its contract.

Start from [task context](task-context.md). Permitted supplied context is enough; `.fde/` is optional. Use the customer's existing clients, authentication, fixtures, and diagnostic tools. Do not create another integration platform to make one connection.

## Method

1. Map producer, consumer, owner, direction, and side effects. Inspect the actual installed version and local implementation; verify uncertain behavior against current official documentation. Identify the relevant schema, authentication scopes, network boundary, and permitted test environment. Before changing an untested existing boundary, characterize the mappings, ordering or other observable behavior its callers depend on.
2. Write the acceptance example: an input at the real boundary and the observable downstream result. Include a rejection or failure example. Separate configuration validity, successful authentication, transport connectivity, contract compatibility, and end-to-end behavior; none proves the next.
3. Inspect credentials by presence and required scope without printing values. Use existing secret storage. Check data classification and retention before moving data; never pass raw `<private>` blocks into a model. Prefer sanitized or synthetic cases approved for the target environment.
4. Implement the narrow adapter using native repository patterns. Validate external inputs and model outputs, bound timeouts and retries, preserve error codes and failure phase without leaking payloads, and handle cancellation. Keep explicit authentication or permission rejections distinguishable from transport uncertainty. For writes, establish idempotency or duplicate detection before retries and apply the uncertain-write rules below when outcomes can be ambiguous; for events, check ordering, replay, and poison messages as applicable.
5. Exercise a permitted success case and relevant failures: denied access, malformed data, rate limit, timeout, duplicate delivery, or partial completion. Trace correlation IDs or safe evidence across both sides. A mock proves client behavior only; if live access is unavailable, report that gap instead of claiming an integration works.
6. Check cleanup and recovery for test side effects. Use [verification](verification.md) for receipts and [review](review.md) for security or data-contract changes. Route deployment through [ship](ship.md) only when authorized.

## When a write outcome is uncertain

Use the existing storage and worker mechanisms; do not introduce a new platform for these rules.

- Before a replayable write, persist its tenant-scoped operation identity and payload identity, with enough state to recover after restart. Establish who owns an in-flight attempt so concurrent workers cannot independently replay it. Establish whether upstream deduplication is guaranteed, including its key, payload rules and retention window; sending a key alone proves nothing.
- A timeout, cancellation or lost response after dispatch may leave a completed side effect. Preserve that uncertainty across restart; stopping the caller is not rollback. Do not silently turn an uncertain attempt into a fresh operation.
- Reconcile against an authoritative receipt or lookup that matches the operation and payload. One verified result can confirm completion; conflicting or multiple matches require resolution. An empty stale, partial or eventually consistent lookup does not prove absence or authorize replay. Retry only under the verified deduplication contract or evidence establishing that repeating the write is safe.
- Keep unresolved attempts visible with safe error context, a next action and a known resolution owner, or an explicit ownership gap. Manual resolution still needs authority for any corrective write; do not manufacture completion to clear a queue.
- Test the relevant failure boundary: committed write with lost response, cancellation or restart before recording success, and stale lookup or concurrent replay where applicable. Record which were exercised and which remain unproven.

## Deliverable and acceptance

Return the boundary contract, changed paths, environment, evidence at each tested layer, and remaining dependencies with owners when known. Done requires the agreed end-to-end result or an explicit narrower agreed scope. Do not silently replace live acceptance with a stub. In engagement mode, update the terrain/delivery record with confirmed facts; otherwise return the receipt directly.
