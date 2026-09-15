// Public entry points. Methods remain authored once in skills/fde/references/.
module.exports = [
  ['discover', 'discover', 'Trace a customer workflow and identify the problem, baseline and evidence gaps. Use for discovery or an unclear customer brief, before choosing a solution.'],
  ['scope', 'hold-scope', 'Assess a new customer request against agreed scope, trade-offs and ownership. Use when an engagement expands or a custom feature needs a commitment decision.'],
  ['options', 'three-options', 'Compare feasible approaches to a customer problem and recommend a path with costs, constraints and evidence. Use for an architecture or delivery decision, not implementation.'],
  ['poc', 'poc', 'Run a bounded customer proof of concept to test a consequential uncertainty. Use for a spike or pilot with a question and decision deadline, not a full rollout.'],
  ['build', 'build', 'Implement a scoped customer-facing software change in the existing repository and verify its behavior. Use for delivery work with an understood outcome, not incident response.'],
  ['integrate', 'integrate', 'Build or change a customer-system integration with explicit data mapping, permissions, retries and reconciliation. Use for connectors, imports, write-back and upstream APIs.'],
  ['debug', 'debug', 'Investigate and repair a reproducible failure in a customer integration or application. Use for diagnosis and regression prevention; follow incident authority for live mitigation.'],
  ['review', 'review', 'Review a proposed customer code change against its intended outcome and operational risks. Use for a diff or PR review; report evidence and actionable findings.'],
  ['evaluate', 'eval-pack', 'Evaluate an AI workflow against representative cases and its permitted actions. Use for model, retrieval or agent evaluation; tests do not grant release authority.'],
  ['qa', 'qa', 'Exercise the delivered customer journey using real runtime or browser evidence. Use for functional acceptance testing after implementation, including failure paths.'],
  ['ship', 'ship', 'Prepare or execute an authorized controlled release with verified checks, recovery and an operating owner. Use when a customer increment is ready for deployment.'],
  ['readout', 'readout', 'Prepare a sponsor update separating promised outcomes, measured results and customer acceptance. Use for progress readouts or defending a delivery claim.'],
  ['handoff', 'close', 'Transfer operation of a customer deployment with ownership, evidence and a tested support path. Use for handoff or an engineer rotation, not merely code delivery.'],
  ['feedback', 'encode-pattern', 'Assess a field lesson for reuse or product feedback without exposing customer context. Use for recurring deployment lessons; distinguish a hypothesis from a validated pattern.'],
].map(([name, method, description]) => ({ name, method, description }))
