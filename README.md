# FDEOps

**Forward deployed engineering skills for your AI coding agent.**

<a name="why-use-it"></a>

Work through a customer project from the first conversation to a system their team can run. FDEOps helps your agent clarify the problem, compare solutions, write and test code, connect customer systems, and prepare delivery and handover evidence.

A **skill** is a set of instructions your AI coding agent follows. FDEOps includes **14 task skills** you can use individually and **one `fde` coordinator** that chooses the right task as a customer project progresses.

Use it for a single integration, a small client project, or work within a larger enterprise team. You bring the customer context, repository tools and access. FDEOps supplies the working method; you and the responsible teams make the decisions.

[Get started](#quick-start) · [Choose a task](#task-skills) · [Keep a customer record](#keep-a-customer-record) · [Documentation](docs/README.md)

## Quick start

You need an AI coding agent that supports skills. The installation commands and FDEOps CLI require **Node.js 18+ and Git** on your machine.

### Work on a customer project

Run this in your terminal and select your agent in the installer:

```bash
npx skills add suboss87/fdeops --skill fde
```

Then start a conversation with your agent:

```text
@fde this is client01. Their support team reads incoming requests,
checks internal documents, then assigns each request to another team.
Help me prepare for the first meeting. Here is the brief: …
```

`fde` asks for the information needed next and uses the relevant instructions. As work progresses, it can help you investigate delays, compare approaches, implement a change, test it, and prepare a customer update. You do not have to choose a skill at each step.

Naming the customer starts a local project record at `~/fde-engagements/client01/.fde/`. It keeps the brief, decisions, evidence and next actions together. Review proposed agreements and corrections before saving them. [How customer records work](#keep-a-customer-record).

### Use just one task

For example, install only `discover`:

```bash
npx skills add suboss87/fdeops --skill discover
```

Then ask your agent:

```text
Use FDEOps discover with these meeting notes. Show how the team handles
an incoming request today, where time goes, and what we still need to ask.
[Paste notes you are permitted to share.]
```

The agent works from your notes and returns its findings. You do not need to create a customer record for this task. Each task skill includes the instructions it needs and works without installing `fde` or another skill pack.

**Want every task available by name?** Install the full pack using the [installation guide](docs/install.md#individual-skills-and-the-full-pack). Installing `fde` alone gives the coordinator all the underlying instructions; it does not add the 14 separate names to your agent's skill menu.

Skill invocation differs between agents. Ask for the FDEOps skill by name or select it in your agent's skill picker. For Claude Code plugin installs, use `/fdeops:fde` or `/fdeops:discover`. See [host setup and name conflicts](docs/install.md#individual-skills-and-the-full-pack).

## Task skills

A customer **workflow** means the steps people and systems take to finish a job: receive a request, check its details, make a decision, and update the relevant system. These skills help with different parts of that work.

| What you need to do | Skill | What you get |
|---|---|---|
| Find the real problem behind a customer request | `discover` | Current steps, delays, baseline and unanswered questions |
| Decide what to do with an additional request | `scope` | Impact on agreed work and a recommended commitment |
| Choose how to solve the problem | `options` | Feasible approaches, trade-offs and a recommendation |
| Test an assumption before committing to a build | `poc` | A limited test, its evidence and the next decision |
| Implement an agreed software change | `build` | Code, checks and a clear account of what changed |
| Connect the customer's systems | `integrate` | An integration checked for mapping, permissions and failed or repeated requests |
| Find and fix a failure | `debug` | A reproduced problem, repair and regression checks |
| Check a proposed code change | `review` | Specific findings tied to code and expected behavior |
| Check an AI system's answers or actions | `evaluate` | Evaluation cases, results and remaining limits |
| Test what users actually experience | `qa` | Runtime or browser evidence, including failure cases |
| Prepare and carry out an authorized release | `ship` | Release checks, recovery steps and deployment evidence |
| Explain progress to the customer sponsor | `readout` | What was promised, what was measured and what was accepted |
| Leave the team able to operate the system | `handoff` | Responsibilities, operating instructions and readiness gaps |
| Turn a deployment lesson into reusable learning | `feedback` | A supported product recommendation or reusable pattern |

These are entry points, not a required sequence. `fde` also handles meeting debriefs, stakeholder decisions, planning, incidents and other situations through its [full skill reference](docs/skills-reference.md). It loads the relevant instructions as needed.

## Keep a customer record

An **engagement** is your ongoing project with a customer. Its record lives in a separate folder on your machine, outside the customer's application code:

```text
~/fde-engagements/client01/.fde/
```

The files are readable Markdown. They track what the customer asked for, who can decide, what success means, what changed, and the evidence behind each result. You can inspect, copy or keep them if you stop using FDEOps.

After a meeting, paste permitted notes into the same agent conversation. It proposes the new requests, decisions, unresolved questions and next actions. Correct anything it misunderstood, then confirm the update.

A request is not automatically an agreement. A passing test is not a production deployment. A measured improvement is not customer acceptance. FDEOps keeps those distinctions in the record.

At the next session, the coordinator retrieves a short summary rather than loading the full history. The default summary is capped at 16 KiB; older evidence is retrieved when needed. This cap applies to FDEOps output, not everything your agent loads.

If your agent cannot start the record, run this in your terminal from the workspace where you work on that customer:

```bash
npx fdeops resume --init client01
```

This links that workspace to the customer's record. [Daily use and meeting walkthrough](docs/USAGE.md) · [Record format](docs/schema.md).

<a name="what-a-working-day-looks-like"></a>

## Your daily fieldbook

The fieldbook is a read-only browser view of your customer records. It shows next actions, open risks, missing evidence and results waiting for acceptance.

![FDEOps fieldbook showing next actions and delivery gaps across fictional customers](media/fieldbook-preview.png)

Run this in your terminal to view all your customers:

```bash
npx fdeops dashboard --all --open
```

Open a customer's record and copy an action into your agent to continue. Run the command again after updates to refresh the view.

**Try a fictional example first:** `npx fdeops demo` runs sample meeting notes through review and produces a fieldbook without using an AI model. It creates or resets its demo folder under `~/fde-engagements/.demo/`. Remove that example with `npx fdeops demo --clean`.

## Fit it to the project

For a small task, use the supplied notes or code and return the result. For an ongoing project, use the customer record. For enterprise work, include the relevant teams, access rules, release checks and operating responsibilities in the plan.

The pack includes implementation, integration, debugging and QA instructions. It uses the repository's existing tools. It does not supply customer credentials, infrastructure, specialist approvals or production authority.

Optional setup:

- **Personal preferences:** `npx fdeops setup` records how you work and what to mask before sharing context.
- **Repository reconnaissance:** `npx fdeops scan` reads local files and returns an initial assessment and questions. It does not change the repository.
- **Other agent hosts:** [Adapters](adapters/README.md) add a pointer to the coordinator in your workspace.
- **External sources:** [Connection recipes](mcp/recipes/) explain how to pull permitted material from tools you already use.

Use the [installation guide](docs/install.md) for the full pack, Claude Code hooks, offline setup and upgrading from earlier versions.

<a name="your-records-your-control"></a>

## Your data stays yours

The CLI reads local files and Git, with no network calls or telemetry. Installation through `npx` may download packages. Your AI host may send material it reads to its configured model.

FDEOps masks common sensitive patterns and excludes `<private>` blocks from CLI, dashboard and hook outputs. This is not complete sensitive-data detection. Do not ask the agent to read private blocks directly, and use only material allowed by the customer's AI policy.

You review proposed decisions. Enabled session hooks can save mechanical session progress automatically; direct CLI write commands update records when you run them.

[Privacy](PRIVACY.md) · [Security](SECURITY.md) · [What has been tested and its limits](docs/verification.md)

## Who this is for

Forward deployed engineers, consultants and small delivery teams working with customers across meetings, codebases and operating environments. The pack supports the engineering and customer work together. Its checks help expose missing evidence; they do not replace professional judgment or prove every deployment safe.

## Find your way around

| You want to… | Start here |
|---|---|
| Install or upgrade | [Installation](docs/install.md) |
| Work through your first customer project | [Usage](docs/USAGE.md) and [examples](examples/) |
| Explore the instructions | [Skill reference](docs/skills-reference.md) |
| Understand the repository | [Repository layout](docs/REPO_LAYOUT.md) |
| Check the test evidence | [Verification](docs/verification.md) |
| Improve the pack | [Contributing](CONTRIBUTING.md) |

Built by [Subash Natarajan](https://www.linkedin.com/in/subashn/). [Issues](https://github.com/suboss87/fdeops/issues) · [Discussions](https://github.com/suboss87/fdeops/discussions)

## License

MIT. Use FDEOps in your customer work. See [LICENSE](LICENSE).
