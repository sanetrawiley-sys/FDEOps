# FDEOps: a customer email project

A scripted conversation showing how an engineer uses natural language to take a customer problem through scoping, implementation, a customer switch, checks and handover preparation. Typing and responses are staged for readability; this is not a recording of a live customer engagement.

## Conversation

**Understand**

> @fde Our customer sorts support emails by hand. Help me improve it.

Where does the team lose time: reading emails, choosing a team, or waiting for replies?

**Agree the work**

> Choosing a team. Start with billing, login problems and outages.

We can route those three types to the right team. Anything unclear stays with a person. Shall I build that?

**Build**

> Yes. Build the routing part first.

Added triage.js: billing to Billing, login problems to IT, outages to Support. Next: test the routes.

**Switch customer**

> @fde Save my place. I have a website meeting with my other client.

Saved: email routing is built; tests are next. Switching to your other client's notes for the meeting.

**Resume and test**

> @fde Back to the email project. Continue where we stopped.

Resumed the tests. All 6 local checks pass, including sending unknown types to a person.

**Prepare rollout**

> Can the customer use it now?

The routing code passes. We still need to connect their inbox and test with approved sample emails before going live.

**Prepare handover**

> Prepare the handover and save what is left.

Draft saved: team routes, manual review and how to stop routing. Next session: connect and test the inbox.

## What was tested

The included routing function passes six local checks. Inputs already carry a type; the function chooses a team or returns a review status. It does not read, classify or send emails. Inbox connection, customer testing and production deployment remain future work. The customer switch and saved-session responses illustrate intended use, not proof of a live agent run.

Run the local checks:

```bash
node --test media/workday-fixture/triage.test.js
```

Render the animation with Pillow and a monospace font:

```bash
python3 media/render-chat-demo.py --font /path/to/monospace.ttf
```

[Scene source](chat-demo.json) · [Still image](chat-demo.png) · [Handover draft](workday-fixture/handover-draft.md) · [CLI recording](../docs/USAGE.md)
