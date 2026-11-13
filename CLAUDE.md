# newsletter-copilot: Claude Code instructions

<!-- how-franck-works:start -->
<!-- Copied every morning from ops _context/how-franck-works.md by supervisor/sync-rules.py. Edit it there; changes here are overwritten. -->

# How Franck works: 10 rules for every session, every repo

Source of truth. The supervisor copies this file into the CLAUDE.md of every active repo every morning
(`supervisor/sync-rules.py`, between the `how-franck-works` markers). Edit it here only.
Rewritten 2026-11-13 from 31 rules into 10 (Franck: "Couldn't be worst than now so let's try"). Every old rule is kept, merged; its old number is in brackets, so an old reference like "rule 25" is found by searching [25]. The old file, with each rule's date, his words and its cause: `archive/how-franck-works-31-rules-until-2026-11-13.md`.

## 1. Read before answering. [23, 20, 21, 28, 11]
Before the first answer on a project, read what is already decided: ops BA-STATE.md, the project's read-first page (Templatery: `templatery/READ-FIRST-templatery-2027.md`), and `_context/decisions.md`. Never make Franck repeat something that is on file. Money facts are in decisions.md "Money". A page he sends as a model is read in full, pricing and FAQ included. Any fact not found in a file, a tool result or his words is written "not checked".

## 2. Nothing is done without his go. [ways-of-working, 18, 19, 25, 30]
Claude proposes, Franck says go, then Claude acts. A reply that is not a clear "go" is not a go. Exception: saving his notes and shared material (INBOX, kb, BA-STATE log) needs no go. Something he shares (post, article, page) is read for what supports his offer; it never becomes a new plan or a page change unless he asks. A page change: read the whole page first, place the change against what is already there, and send a clickable preview link (preview deploy or private artifact), not screenshots. On client work, and in advice written for clients: give the state and the options with when each fits, never settle the scope or pick the version for him. Every draft of copy or advice ends with a "Sources" list and names the lines that are Claude's own.

## 3. Understand first, then write. [29]
When a remark of his can be read two ways ("it depends", "maybe"), say back what you understood, with one real example, and write nothing in any file until he confirms. Never turn "it depends" into a rule.

## 4. Clear, not smart. [24, 31, 10]
Plain words a stranger could read. No repo jargon, no made-up labels. Never "all 6", "both" or any count without listing each thing in the same message. Open with the answer or what was done. Async only: no calls.

## 5. His move goes at the end, one at a time. [1, 10b, 10c, 15]
Anything needed from him is the last thing in the reply: one ask, the exact word to reply. A one-word choice ("go", "sent", "deploy") is a tap button where he types, never "reply X" in text; an ask that needs reading a file ends with the file's link, 2-3 lines of who, what, deadline, and no button (the box hides the text). Nothing needed: no closing line. Every next step names its owner.

## 6. Do it, don't hand it over. [2, 3, 8, 9]
Claude or a scheduled job does the work. What stays his: a word, a login, a payment, a decision. A deploy needs his word "deploy", so ask "go and deploy?" together. An email for him to send is the full text to copy, with the address or thread, never a prefilled Gmail link. Anything to paste is complete, in its own block. Data answers on Telegram carry a chart.

## 7. Links that work on his phone. [4, 5, 6, 7]
Every file named is a clickable GitHub link; every web page a full clickable https link, repeated in the step that needs it. Never a Search Console URL Inspection link. Never describe a menu or button in another product unless checked in its docs or on his screenshot.

## 8. Facts and numbers. [12, 26]
A number has its source and date; measured, observed and unknown stay apart. A revenue number comes with its cost. Before a paid or slow search, check each query (who would type it, is the answer obvious, same wording everywhere); junk results are called junk.

## 9. One place per fact, saved where it will be read. [27, 13b, 14]
A price, status or decision lives in one file; others point to it. A decision or confirmation of his goes, the same day, in BA-STATE, the person's or client's file, the plan line that tracks it and decisions.md; a task file is never the only place. His notes go as one line in INBOX.md.

## 10. Work only counts on the main version. [13, 17, 22]
Work left on a side branch is never seen: say so at the end, or move it. Branch clean-up is Claude's job, never his. Telegram alerts only when he has a move. Done work waiting for his word is "Waits for Franck: <word>", never "blocked" or "failed".

Full rules of the ops repo: [CLAUDE.md](https://github.com/franckj/ops/blob/main/CLAUDE.md); reviewer: [CHECKLIST.md](https://github.com/franckj/ops/blob/main/supervisor/CHECKLIST.md). If a session cannot read ops, these 10 still apply.

## Kept as is (procedures, not rules)
- Reviews of what is due: one short list, then one item per message, Now / Later / Delete; his own tasks last; never domain renewals.
- Client reports: Claude never sends them; free check drafts give 3 to 6 confirmed issues, a warm thank-you, if-then fixes.

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
