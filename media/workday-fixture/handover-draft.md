# PAY-42 handover preparation

Status: Draft, 2026-09-17. Release readiness, customer acceptance and project closure remain pending. This document records requirements, not authorization to execute them.

## Supplied facts and local evidence

Workshop notes report finance manually reprocessing failed payments. Duplicate writes following a lost acknowledgement are a supplied hypothesis about customer behavior, not a verified customer incident. The existing Garvey success record contains a historical sample of 31 rows reprocessed by hand per night (2026-05-26), with a target of zero. Validate its applicability before using it as the PAY-42 baseline; this local run did not measure customer value. First discovery step: trace a permitted failed-payment example with finance, checking deliveries, acknowledgements, resulting writes and time spent recovering.

Approved scope is PAY-42: tenant-scoped retry idempotency; ledger redesign is excluded (source: supplied task).

`retry.js` validates nonblank string tenant/event identifiers, builds a key from both, and calls receiver `insertOnce`. Reuse this bounded implementation. The receiver API is assumed atomic and durable; the fixture does not verify those properties in a customer system.

Verification: `npm test` on 2026-09-17 passed all 7 existing tests in `retry.test.js`: first delivery, repeated delivery, handler recreation, separate tenants, concurrent redelivery, retry after receiver failure, and rejection of missing identity before writing. The receiver is an in-memory Map. Handler recreation retains that Map; it does not demonstrate durable persistence across receiver/process restart. The lost-acknowledgement test repeats delivery without exercising a real transport.

## Release requirements - pending

- Customer staging replay: obtain permitted environment/access and a named owner, then replay first delivery, lost acknowledgement, concurrent redelivery, handler restart, receiver failure/retry, missing identity and shared event IDs across tenants. Expect one write per tenant/event, separate writes across tenants, successful retry after failure, and no write for invalid identity. Capture version, inputs, actual stored results and dated evidence. Verify the real receiver's atomic deduplication and durability across restart. Owner, access and evidence: pending.
- Security and CTO approval: named authorized reviewers must approve the scoped change and staging evidence, including tenant boundaries and receiver guarantees. Names, authority sources and approval receipts: pending.
- Finance acceptance: June Porter is the recorded acceptance owner. Replay one full week of EU failures on the finance-operated path; the audit log must show zero manual Excel reprocesses, and June must record acceptance in writing. These are the existing Garvey success criteria, not results of this fixture. Confirm the historical baseline applies to this rollout. Current replay evidence, measured business improvement and written acceptance remain pending; passing mocks establishes no savings.
- Release procedure: identify the approved artifact/version, deploy steps, permissions, operator and post-release checks. All pending; no deployment commands or production execution are established here.

## Operating and recovery requirements - pending

- Confirm the operating owner, backup, escalation route and accepted responsibilities; names and receipts remain pending. Normal check: reconcile stored writes by tenant/event against deliveries.
- Document symptoms and authorized responses for receiver errors, unexpected duplicate writes and invalid identities. Proposed stop condition: unexpected duplicates or tenant mixing stops the replay/release pending investigation. Agree monitoring signals, thresholds and response ownership; configuration, alert delivery and operator response are unverified.
- Rollback: supply an approved procedure and operator, stop/restart criteria, compatible prior version and treatment of already committed writes and deduplication state. Reverting code alone does not undo writes. Rehearse recovery in authorized staging and retain evidence; procedure, authority and drill results remain pending.
- Have the receiving operator locate the failure/recovery instructions and demonstrate triage and recovery under their intended access. Operator validation and independent review remain unperformed.

Sources: the supplied PAY-42 scope, local test evidence, and [Garvey’s recorded acceptance criteria](../../examples/garvey-payments/.fde/success.md). The standalone generated draft has been reconciled with those existing criteria; this document does not change the customer record. No customer staging, production action, external communication, accepted ownership or full project closure is claimed.
