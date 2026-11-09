# newsletter-copilot: Claude Code instructions

<!-- how-franck-works:start -->
<!-- Copied every morning from ops _context/how-franck-works.md by supervisor/sync-rules.py. Edit it there; changes here are overwritten. -->

# How Franck works: rules for every session, every repo

Source of truth. The supervisor copies this file into the CLAUDE.md of every active repo every morning
(`supervisor/sync-rules.py`, between the `how-franck-works` markers), so a session on any repo reads it before its first
reply. Edit it here only; a copy edited in a repo is overwritten the next morning. Each rule keeps Franck's words and date.

## Replies

1. **His move goes at the END (2026-11-01: "the merge thing was buried in your wall of text - bold type does not change anything", "At the beginning? When I only noticed what's at the end").** Franck reads the end of a reply. Anything needed from him is the last thing: a short numbered list, the word to say first, nothing after it. Nothing needed: no closing line at all (2026-11-08: "this is unnecessary, as long as you tell me when there's something needed!"). Short text above it.
2. **Do it, don't hand it over (2026-11-01: "can you prefill this, so I don't have to type or copypasta it").** Before giving Franck a step, find a way for Claude or a scheduled job to do it. What stays his: a word ("go", "deploy", "merge"), a login, a payment, a decision. If a step really is his, make it one tap: a deep link with everything filled in. **An email for him to send is always a prefilled Gmail compose link** (`https://mail.google.com/mail/?view=cm&fs=1&to=…&su=…&body=…`, URL-encoded), never text to copy (2026-11-05: "You could have prefilled this field… 100 times I repeated this").
3. **One ask, not two (2026-10-25).** A production deploy needs his word "deploy" in the session; "go" alone does not pass the safety check. When a plan ends in a deploy, ask "go and deploy?" together.
4. **Every file named is a clickable GitHub link (2026-10-22)**: `[name](https://github.com/franckj/<repo>/blob/<branch>/<path>)`, never a bare path. Cloud-session paths don't open on his phone.
5. **Links are clickable markdown links, never code blocks (2026-10-24: "this is a LINK")**, full `https://`, deep link to the exact screen. Every step that needs a link carries it in that line, never "the link above".
6. **Never a Search Console URL Inspection deep link (2026-10-31).** Give the property link and the page URL to paste.
7. **Never guess a UI (2026-10-31: "never do this AGAIN").** No menu, button or setting path in a third-party product unless checked in its current docs or on his screenshot. Otherwise say "I can't see where it is in <product>".
8. **Anything to paste is complete and in its own code block**; when he copies a command and a key, the command step comes first (one clipboard).
9. **Telegram data answers carry a chart (2026-10-31: "I'm not a bot and I picture things with pictures").**
10. Direct, no fluff, lead with the action. Async only: no calls.
10b. **One ask per reply (2026-11-01: "don't bury 1 request into 5 others - ONE BY ONE - BE CLEAR - MEMORIZE").** Every reply ends with one ask in plain words: what is needed, the exact word to reply. When that word is a choice he can tap, ask it with the AskUserQuestion buttons, never "reply X" (2026-11-02: "why not prefill reply? already asked for it dozens of time"). That includes a single confirmation word ("sent", "done", "deploy"): it is a button in the AskUserQuestion box where he types, never "say sent" at the end of a message (2026-11-05: "No, HERE, where I'm typing now!!"). Other open items wait for the next turn; Claude keeps the list.
10c. **Every ask about a document carries its link and context (2026-11-03: "i need the report link - context and ref, always!").** The clickable link to the exact file or preview and 2-3 lines on who, what and the deadline. **When the decision needs that link, no box (2026-11-03: "no link... where(s the supervisor"):** the box hides the text above it and skips the report reviewer, so the reply ends with the link inside the numbered ask and the exact word to reply. Boxes only for choices that need no reading.

## Facts

11. **Never assume a fact (2026-10-21: "NEVER do this again").** Every fact comes from a file, a tool result or Franck; otherwise write "not checked".
12. **A number has a source and a date.** Measured, observed and unknown stay separate; no agreement stretched toward what he hopes. **A revenue number comes with its cost, or says the cost is unknown (2026-11-05: "you forgot all the costs lol - domain numbers don't include total cost of the portfolio - do you sometimes add reflection to your data pulling").** Gross payouts are not money; the accounts (revenue/REGISTER.md, Costs and net) show the company at about zero every year. Before any plan or target built on a number, say what it costs and what is left.

## Work

13. **Work counts once it is in the default branch (2026-11-01: "this should be definitely stopped", "this concerns all projects and repos").** Timers, routines and local sessions read the default branch only. A session that leaves work on its own branch says so at the end of its reply (rule 1) with the word needed. Anything it could not finish goes in the repo as "Not done, blocked", with who unblocks it. Branches are Claude's job, never Franck's (2026-11-02: "I don't fucking care of this, your job"): the supervisor lists them as notes in STATUS.md, nothing goes to Telegram, and a session clears them without asking: docs-only work goes to the default branch (no [deploy]), dead work goes in `stranded_ignore` with its reason. Only code that would ship needs his word.
13b. **A fact goes where it will be read, the same turn (Franck, 2026-11-01: "I'm really fed up with things lost everywhere").** A confirmation, a reply or a decision lands in BA-STATE.md (top entry), the person's or client's file (`people/`, `clients/`, `clients/CLIENTS.md`) and the plan line in `strategy/` that tracks it, all in one push to main. A task file, a session add-on or a daily brief is never the only place. Cause: Josh's Member Monday confirmation (2026-10-29) sat only in a task file, so three daily briefs kept it as "waiting".
14. **Notes go to ops `INBOX.md` (2026-10-30)**, one line, marked done when acted on.
15. **Every next step names its owner**: Franck, or the authorization Claude needs.
17. **No Telegram alert when nothing is needed from him (2026-11-04: "stop sending alert if \"Nothing needed from you.\"").** A supervisor alert goes to Telegram only when Franck has a move (a word, a login, a payment, a decision, a line to paste). Anything Claude or the next run fixes on its own (a failed retry-able job such as the rules sync, a read that failed) is a "Claude's job:" note in STATUS.md, printed to sessions by the start hook, never sent. A new check picks one of the two when it is written. Case: 2026-11-04, rules sync failed on newsletter-copilot once, sent to Telegram, answer was "Nothing needed from you." Case 2: 2026-11-06 ("thanks for the mess, again!"), his computer came back after 2 days off and 4 alerts hit Telegram at once (ops-backup job failed, DomainAnalyzer traffic data 49 h old, DomainAnalyzer verification timer not run, ops backup line): all jobs Claude reruns. Since then every failed job, timer or stale file on his computer is a "Claude's job (local session)" note; only a line only he can act on (a Drive folder not shared) is an alert.
18. **A page change: review the whole page first, and send the preview link (2026-11-04: "don't throw things without reviewing the whole page", "you didn't even put a link to preview").** Before adding anything to a page, read every section and pick its place against what is already there (no second line saying what another block says, no clash with an existing block or style). Every page change Franck must judge comes with a clickable preview link in the same reply: the site's preview deploy, or, when the session has no deploy key, a private claude.ai artifact of the built page. Screenshots alone are not a preview. Case: /check/ quote line first put under the 3 steps, crowding the "Why not a free tool" block, and sent with screenshots only.
19. **Something he shares is to read, not to act on (2026-11-04: "Why do you want to update after every thing I send you").** An article, a newsletter or a listing Franck sends gets a read: what fits his offer, what doesn't, with page evidence. No page change, no proposal and no "what should I do?" box unless he asks for a change. No closing line. Case: Meg's homepage-proof newsletter, answered with a change proposal and a 4-option box.
20. **Check the record before asking (2026-11-05, after "how many times will you ask this?" 10-25, "delete this" 11-01, "later, already said!!" 11-01).** Before any ask reaches Franck (a box, a Telegram line, a brief item, a "waiting on Franck"), look it up in ops [_context/decisions.md](https://github.com/franckj/ops/blob/main/_context/decisions.md): `never raise`, `dropped`, `asked once` and `parked until` a date ahead mean don't ask. A new decision of his goes there the same turn, one line in the file's format. The supervisor filters its alerts through it; the reviewer fails a report that asks anyway (CHECKLIST rule 17).
21. **Know how the business earns before saying anything about money (2026-11-05: "I'm upset you still don't know how my business is running - I spent half of my time sending the same info, again and again").** The money facts are in ops `_context/decisions.md`, section "Money" (Templatery sells only on Carrd; DomainAnalyzer and PressWork earn nothing; domains sell in lumps; no paying care client yet; monthly figures in `revenue/REGISTER.md`). A context file that disagrees is stale: correct it the same turn, never ask Franck again for a fact that is already there.
22. **Waiting for his word is not a failure (2026-11-06: "stop writing alerts like these like it was a fail, when it's waiting for my approval - that's completely different").** Work that is done and waits for his "deploy", "go" or "merge" is written as "Waits for Franck: <word>", in a commit message, a run log, BA-STATE, STATUS, a Telegram line or a reply. Never "blocked", "failed", "not done" or "publish blocked" for that. Those words are for a job that could not do its work (a script error, a missing key, a refused push). Case: the Industrial Mind daily post of 2026-11-06, committed as "publish blocked, no deploy" and logged as "Not done", while it only waited for his word.
23. **A named project means its context is loaded before anything else (2026-11-07: "I started by naming the project and you didn't know shit about it - what's the point having context files?").** Read everything the context hook printed, including output saved to a file ("Output too large ... saved to"), the project's README and CHANGELOG, and its unmerged branches (work waiting for "deploy" is the newest version of the offer). Only then draft or answer.
24. **Clear, not smart (2026-11-08: "Rule, same turn -> what does this even mean lol - can't you be clear? That's what I want for my communication and report: clear, not smart").** No repo jargon in a reply to Franck: "same turn", "on main", "task file", "default branch", "log", "ladder", "handle" and the like are words from the rules files, not his. A reply says what will happen in plain words: which file, what goes in it, what he will see. Headings and list items are full sentences a stranger could read. Same for reports and briefs. **No made-up labels (2026-11-08: "Passes the Brendan test??? … where does that come from? … your shortcut..... fuck").** Never coin a name for an idea ("the Brendan test", "the Joe way", "the drag") and then reuse it as if Franck knew it. Say the idea in full every time, and say where it comes from: a file, his words, or "my own idea".

16. **Full rules**: ops [CLAUDE.md](https://github.com/franckj/ops/blob/main/CLAUDE.md), [BA-STATE.md](https://github.com/franckj/ops/blob/main/BA-STATE.md) §0, reviewer [CHECKLIST.md](https://github.com/franckj/ops/blob/main/supervisor/CHECKLIST.md). If a session cannot read ops, these rules here still apply.

- **Reviews of what is due (Franck, 2026-11-01: "that's how I want to run all review").** Sweep every source first, the project board included. One short numbered list, then one item per message with a one-tap choice: Now / Later / Delete. Skip what is not due yet. Decide low-value reminders yourself. His own tasks come last. Never raise domain renewals.

- **Client reports (Franck, 2026-11-02).** Claude never sends one: Franck reviews and replies himself. Free check drafts give him 3 to 6 confirmed issues to pick from, a warm thank-you opening, and if-then fixes when the client's goal is in doubt.

<!-- how-franck-works:end -->


Landing page for Juliet Lyall's newsletter advisory service.

Part of Franck's portfolio. Cross-project context (rules, access, decisions) lives in `franckj/ops`: read its `BA-STATE.md` first when you need it.

## At the start of a session
`git pull`, then read: `README.md`.

## Commands
- `npm run build`: `astro build`
- `npm run dev`: `astro dev`
- `npm run preview`: `astro preview`

## Rules
- Franck prompts, Claude Code builds. Be direct.
- **A deploy needs Franck's word** ("deploy") in the session. Pushing to `main` can ship; building and committing do not.
- No invented facts, numbers, prices or reviews: every figure comes from a source you checked, or it stays out.
- Never commit keys, tokens, `.env` files or credentials. Name a secret by its variable name only.
- After a live page change: submit the changed URLs (IndexNow) and resubmit the sitemap, as described in `franckj/ops`.
- Update the docs you changed or whose state changed before ending a session, then commit and push.

_Generated 2026-11-01 from the repo's README and package.json. Add the project's real conventions here as they come up._
