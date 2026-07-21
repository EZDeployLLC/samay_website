# The Invisible Workforce: Why Nobody Builds Tools for the Person Who Actually Files the Timesheets

*At agencies with 150-350 people, creatives don't file their own timesheets. Someone else does. And every tool in the market pretends this person doesn't exist.*

---

Here's a job description you won't find on any org chart.

Every Friday, she opens three browser tabs: the agency's time tracking system, someone else's Google Calendar, and Slack. She is an executive assistant or a creative coordinator. She supports somewhere between five and twelve senior creatives, copywriters, art directors, creative directors, and her job, among dozens of other responsibilities, is to reconstruct their weeks and file their timesheets.

She checks the calendar for meetings. She scans Slack channels for project mentions. She cross-references with the job code list, which may or may not match what's in the project management tool. She makes educated guesses about how to split Tuesday between three overlapping campaigns. She submits twelve timesheets, each a carefully assembled approximation of what happened.

This takes two to four hours. Every week. And when she's done, nobody thanks her, because this work is invisible.

## The proxy workflow is everywhere. The tools are nowhere.

At large creative agencies, the proxy workflow isn't an edge case, it's the dominant pattern. Senior creatives, the ones billing the highest rates and juggling the most accounts, are also the ones least likely to file their own timesheets. They're in back-to-back client sessions, shoots, reviews. Administrative tasks fall to their support staff.

Our research across agencies in the 150-350 person range confirmed this consistently: EAs and creative coordinators are the de facto timesheet operators. They're filing for groups of people, against shared job codes, every single week.

And yet, if you survey the entire time tracking software market,Harvest, Toggl, Clockify, Streamtime, Productive, Scoro, Timely, Workamajig, Kantata, Function Point, not a single one offers a first-class interface designed for this workflow.

Some tools have admin overrides. Harvest lets managers view, edit, and submit timesheets on behalf of others. Clockify Pro lets admins edit team members' entries. Replicon offers up to five levels of delegation. But these are exactly that: overrides. They're designed for absence coverage ("use this when someone's on vacation"), not for the permanent, weekly practice of one person constructing and filing timesheets for a dozen others.

The distinction matters. An admin override says: here is someone else's timesheet; you can change things. A proxy workflow says: here are twelve people's weeks, side by side; you can see all their calendars, draft entries from what's visible, allocate hours across shared projects, review and submit the batch.

That second interface doesn't exist anywhere in the market.

## Why nobody built it

The reason is a category assumption. Every time tracking tool starts from the same premise: the person who does the work records the time. Individual user, individual timer, individual timesheet. The entire interaction model, start timer, stop timer, add note, submit, assumes a one-to-one relationship between worker and recorder.

This assumption is so deeply embedded that it shapes everything from the data model to the navigation. There is no "switch person" button in Toggl. There is no "batch view" in Timely. There is no "file for your group" in Streamtime. These features weren't removed, they were never conceived of, because the mental model behind the product doesn't include the proxy manager as a first-class user.

The irony is that the proxy manager is often the most important user in the system. She's the one who ensures that timesheets actually get filed, that the data is somewhat accurate, and that the compliance reports look reasonable. Without her, the compliance rate at most agencies would be catastrophic.

## The hidden cost of invisible labor

Research on invisible labor in workplaces consistently finds that it disproportionately falls on women, people of color, and administrative staff. A 2025 GroupTogether study of 457 administrative professionals found that **39%** have never received recognition on Admin Day, and **66%** say their contributions go unrecognized year-round.

In the agency context, the proxy manager's labor is doubly invisible. Her time spent filing other people's timesheets is itself non-billable, it doesn't show up in utilization reports. The value she creates (compliance, data quality, operational continuity) is only noticed when she's absent and the system falls apart.

One ops professional described spending "a whole day chasing timesheets, correcting timesheets." At a 150-person agency, timesheet processing can consume 18+ hours per week, nearly half a full-time role consumed by administrative follow-up. That's $60,000+ per year in labor cost, performing a task that every existing tool makes harder than it needs to be.

## What a real proxy workflow looks like

Imagine an interface designed from the ground up for the person who files for a group:

**A group view.** Not twelve separate logins or twelve separate tabs. One screen showing all the people she manages, with their filing status, their calendar data, and their current week's draft.

**Pre-populated entries.** The system has already pulled calendar meetings, Slack activity signals, and project tool data. Each person's week arrives as a visual draft, not a blank grid.

**A visual format.** Not rows and columns of 15-minute increments. A pie chart showing how the week breaks down by project, adjustable by dragging segments. The coordinator can glance at it and immediately see if the allocation looks right.

**Batch operations.** Review, adjust, and submit multiple people's timesheets in a single session. Flag anomalies. Add notes. The coordinator doesn't need to click through twelve separate workflows.

**Two-pass mode.** First pass: bulk review and submit the straightforward ones. Second pass: focus on the ones that need attention, unusual weeks, new projects, missing data.

This isn't a feature request list. It's a description of the actual workflow that happens every Friday at thousands of agencies, mapped into an interface that respects it as a legitimate, valuable task.

## The ripple effects of building for the proxy

When you build for the proxy manager, you don't just make one person's Friday easier. You improve data quality across the agency, because the person filing has context, institutional knowledge, and the ability to spot patterns. You reduce the compliance chase, because the filing isn't dependent on twelve separate individuals remembering to open a tool. You surface the invisible labor, because the proxy manager's workflow becomes a measured, supported function rather than an unacknowledged burden.

And you acknowledge a truth that the entire time tracking industry has ignored for decades: at agencies of any meaningful size, the person who does the work and the person who records the work are not the same person. Building as if they are doesn't just create a UX problem. It creates a category problem.

The proxy manager is the most under-served, under-recognized, under-tooled person in the creative agency. She's also the person most likely to adopt a tool that actually respects her workflow, because right now, she has nothing.

---

*samay is the first time tracking tool built for the proxy manager workflow. If you're the person who files timesheets for others at a creative agency, we built this for you. [Learn more at samayapp.co](https://samayapp.co)*
