## 1. Introduction

Samay ("Samay", "we", "us", "our") provides a timesheet and job-code management service that helps organizations keep each person's active job/charge codes accurate and lets people file a weekly time allocation against those codes from the Samay web app or from Slack (the "Service").

Samay is operated by Samay LLC. For questions about this Policy, contact us at hello@samayapp.co.

This Privacy Policy explains how we handle personal data in connection with the Service. Samay is a business-to-business product: our direct customers are organizations (employers, agencies, and similar — each a "Customer") who make the Service available to their staff, contractors, and assistants (each an "Authorized User" or "End User").

### Plain-language summary

Samay is designed to hold as little personal data as possible. For the core product we store derived working data — who can bill which job codes, and the weekly time splits people submit — not raw activity.

We do not capture keystrokes, screenshots, clipboard contents, message or document bodies, or chat channel history. We do not sell personal data, and we do not use your data to train generalized AI models.

Optional AI features that read a person's connected apps are off by default, require that person's explicit consent, and discard the underlying data after producing a draft.

## 2. Our role: controller vs. processor

How privacy law applies to a given piece of data depends on our role:

- We act as a **processor** (or "service provider") for Customer Workspace Data. Most personal data in the Service — Authorized User identities, job-code assignments, submitted time allocations, and the audit and security logs generated about a Customer's workspace and users — is provided by, or generated on behalf of, a Customer. For that data, the Customer is the controller and decides why and how it is processed; we process it only on the Customer's documented instructions, under our agreement and our Data Processing Addendum (the "DPA"). If you are an End User and have questions about your data, please contact your employer/organization (the Customer) first.
- We act as a **controller** for a limited set of data we determine the purposes of — for example, account/administrator contact details, billing records, support communications, our own corporate security monitoring, and data collected through our marketing website. This Policy governs that data directly.

**A note on logs.** Put simply: most logs are Workspace Data for which the Customer is controller, and a narrow security subset we hold as controller. Audit logs about a Customer's workspace (syncs, filings, logins, permission changes, proxied actions) are processed as part of providing the Service and follow the Customer's instructions. Separately, we process a limited set of security and abuse-prevention logs as a controller, solely to protect the integrity and security of our own systems. We do not use either set to profile End Users for our own purposes.

**Private deployments.** Where a Customer runs Samay as a Customer Private Deployment inside their own network/VPC (see Section 4), the Customer hosts and controls the data plane. In that mode we generally do not have access to Workspace Data, and the Customer is responsible for its handling; this Policy then applies primarily to the limited control/license metadata described in Section 4 and to our website and business contacts.

## 3. Who this Policy is for

- Customers and their administrators — how we handle the data you entrust to us.
- End Users (Creatives, Proxies/EAs, and other staff who file time) — what data about you the Service holds, noting that your organization controls it.
- Website visitors and prospects.

## 4. Deployment modes & what they mean for your data

Samay runs from a single codebase in one of two modes. The mode determines where your data lives and who operates it.

| Mode | Operator of the data plane | Where Workspace Data lives | Our access |
| --- | --- | --- | --- |
| Samay SaaS | Samay | Samay's cloud environment (managed Postgres, hosted in the United States) | We host and operate it as your processor |
| Customer Private Deployment | The Customer | Inside the Customer's own network/VPC (e.g. AWS RDS or self-hosted Postgres) | Workspace Data does not leave the Customer environment; our access is limited to optional, non-sensitive license/update/health metadata |

In Customer Private Deployment mode, any connection back to Samay is optional and limited to things like license validation, software-update metadata, and non-sensitive health signals — never your activity data, integration credentials, or time entries.

### 4.1 What Samay can access, by mode

The clearest way to see the difference: in private-deployment mode, your Workspace Data never leaves your VPC, and Samay (the company) cannot see it.

| Data | Samay SaaS | Customer Private Deployment |
| --- | --- | --- |
| Identity & directory data | Processed by Samay as processor | Stays in your VPC — Samay has no access |
| Job codes, mappings & allocations | Processed by Samay as processor | Stays in your VPC — Samay has no access |
| Integration credentials | Encrypted at rest in Samay's environment | Stays in your VPC — Samay has no access |
| AI-assist activity (if enabled) | Read ephemerally; only derived suggestion stored | Read and processed inside your VPC; Samay has no access |
| Audit / workspace logs | Held by Samay as processor on your behalf | Stays in your VPC — Samay has no access |
| License / update / health metadata | n/a (we operate it) | Optional, non-sensitive — the only thing that may flow back to Samay |

## 5. Data we process

We group personal data by purpose. The core Service is intentionally minimal; some categories below apply only if a Customer enables optional features (clearly marked).

### 5.1 Account & administrator data (controller)

- Administrator name, work email, and role.
- Organization/workspace name and configuration.
- Billing and payment contact information and transaction records (handled via our payment processor; we do not store full card numbers).
- Support requests and related correspondence.

### 5.2 Identity & directory data (processor)

- Authorized User name, work email, employee ID (where provided), role (Admin, Proxy/EA, Creative), and account status.
- Identity links — mappings that connect one person across the systems they appear in (e.g. an SSO/Okta identity, a Slack user ID, a Time-Tracking-platform user ID, and a Resource-Manager display name), along with how each link was established (SSO, email match, employee ID, manual, or fuzzy match) and a confidence indicator. This ensures a Slack prompt, a synced job code, and a filed allocation all refer to the same person.
- Proxy/EA delegation relationships (who is authorized to file on whose behalf).

### 5.3 Job-code & allocation data (processor)

- The job-code directory: job/charge codes, current project titles, client, status, and close dates — a derived, cached view reconciled from the Customer's own systems. Samay is not the system of record for these.
- Person↔code mappings: which active codes a person can file against for a period.
- Allocations / timesheets: the weekly split of hours or percentages a person (or their proxy) submits against their codes, including draft vs. filed status.

### 5.4 Integration configuration & credentials (processor)

- Admin-configured connections to third-party systems (see Section 8), including encrypted credential/secret references and the scopes granted. Credentials are connected by an administrator, are encrypted at rest, and are scoped per organization. End Users do not connect these core integrations.

### 5.5 Slack data (processor — only if Slack is enabled)

- Workspace/team ID and an encrypted bot token / signing-secret reference.
- A mapping between a Slack user ID and the corresponding Samay user (matched by work email).
- Message references (channel + timestamp) for prompts we send, so reminders can be threaded/updated, plus send status.
- For the optional "I'll Reply Here" flow, we transiently read a user's direct reply to the Samay bot only, parse the time split from it, store the resulting allocation, and discard the message text. We do not request or read channel history or other message content.

### 5.6 AI-assist data (processor — later-phase, opt-in, with End User consent)

A future, optional feature lets an AI agent pre-draft a person's allocation by reading that person's connected activity sources (e.g. calendar, email, chat, design tools). Where offered and enabled:

- Access is opt-in per source and scope, controlled at two levels — the workspace admin enables which connectors are available, and each End User chooses which of those the agent may read for them.
- The agent reads activity at request time and holds it in memory only.
- We persist only the derived suggestion (suggested codes + percentages) and minimal provenance (e.g. "based on 3 calendar events and 12 design-tool comments"). The underlying raw activity is not stored.
- By default the agent uses metadata over content; content is read only with explicit per-user consent and is never persisted.
- The AI subprocessor is contractually prohibited from using the data it processes to train its models, and that data is not used to improve generally available models.
- Each user can view an access log of what was read and revoke access at any time.

### 5.7 Technical & operational data (processor for workspace logs; controller for security)

- Authentication events and session metadata. Samay is passwordless — we do not store Samay-managed passwords. Sign-in uses magic links (email), enterprise SSO (e.g. Okta via OIDC/SAML), or short-lived signed Slack deep links.
- Audit records about a Customer's workspace (syncs, filings, logins, permission changes, proxied actions), processed as Workspace Data on the Customer's behalf (Customer is controller).
- Security, abuse-prevention, and operational logs and basic device/connection metadata needed to run and secure the Service, processed by us as a controller for the limited purpose of system security and integrity.
- Limited website analytics and cookies (see Section 13).

### 5.8 What we deliberately do not collect

Consistent with the product's data-minimization design, the core Service does not collect or store:

- keystrokes, screenshots, screen recordings, or clipboard contents;
- the contents of your emails, documents, files, or chat messages (the optional AI feature reads only ephemerally and stores only a derived suggestion);
- Slack channel history or message bodies (beyond the transiently-parsed direct reply described in 5.5);
- raw, minute-by-minute activity logs.

## 6. How we use personal data

We use personal data to:

- Provide the Service — sync and reconcile job codes, resolve each person's active codes, present them in the app and Slack, and record submitted allocations.
- Authenticate users and secure accounts — passwordless sign-in, sessions, and role/permission enforcement (including proxy delegation).
- Send operational notifications — weekly filing prompts and reminders via Slack and email.
- Reconcile identities across connected systems so the right person gets the right codes and prompts.
- Provide optional AI drafts — only where enabled and consented (Section 5.6).
- Maintain compliance dashboards and reporting for administrators (e.g. who has filed, who is in draft, who has not started).
- Operate, secure, debug, and improve the Service, maintain audit logs, and prevent abuse.
- Communicate with Customers about support, service, billing, and material changes.
- Comply with legal obligations and enforce our terms.

We do not sell personal data, we do not "share" it for cross-context behavioral advertising, and we do not use Workspace Data to train generalized AI models. Any AI subprocessor is contractually bound not to train on data processed through the Service (see Sections 5.6 and 8).

## 7. Legal bases (where GDPR / UK GDPR applies)

For data where we are the controller, we rely on:

- **Contract** — to provide the Service to our Customer and administrators.
- **Legitimate interests** — to secure, operate, and improve the Service and our business (balanced against your rights).
- **Consent** — for optional features (e.g. certain AI source access) and certain cookies/marketing, where required.
- **Legal obligation** — to meet legal, tax, and accounting requirements.

For data where we are the processor, the relevant legal basis is determined by the Customer (controller), who is responsible for ensuring an appropriate basis and for providing required notices to End Users (see Section 11).

## 8. Sharing & subprocessors

We share personal data only as needed to run the Service:

**Service providers / subprocessors** who process data on our behalf under contract. A current list is available on request; we will give Customers a way to receive notice of changes and a reasonable opportunity to object as set out in the DPA. Indicative list:

| Subprocessor | Purpose | Notes |
| --- | --- | --- |
| Google Cloud Platform | Hosting and infrastructure (SaaS mode) | United States |
| Supabase | Database and authentication (SaaS mode) | |
| Postmark | Sending magic links and notifications | |
| Slack Technologies | Slack notifications and inline filing | Only if Slack enabled |
| Anthropic | Powering the optional AI draft feature | Only if AI feature enabled and consented; contractually bound not to train on the data |
| Stripe | Billing | If applicable |
| Sentry | Operations and reliability | Logs exclude activity payloads by default |

**Customer-directed integrations** — the third-party systems an administrator connects (e.g. Resource Managers such as Monday.com, Google Sheets, Smartsheet, Airtable; Time-Tracking platforms such as Accountable, Workamajig, NetSuite; identity providers such as Okta; and Google Workspace / Microsoft 365). Data we read from or write to these systems is governed by the Customer's relationship with each provider; this Policy does not cover those third parties' own practices.

**Within a Customer's organization** — administrators and authorized proxies can see the data appropriate to their role (e.g. an admin sees filing-compliance status; a Proxy/EA sees the people they file for).

**Legal and safety** — where required by law, to enforce our terms, or to protect rights, safety, and security.

**Business transfers** — in connection with a merger, acquisition, or asset sale, subject to this Policy and with notice to affected Customers.

In Customer Private Deployment mode, the Customer's own infrastructure and chosen vendors host the data; the SaaS subprocessors above generally do not apply to that Customer's Workspace Data.

## 9. International data transfers

For SaaS, data is processed in the United States. Where personal data is transferred across borders — including from the EEA, UK, or Switzerland to a country without an adequacy decision — we rely on appropriate safeguards, principally the European Commission's Standard Contractual Clauses (and the UK International Data Transfer Addendum and the Swiss addendum where applicable), incorporated through our DPA, together with supplementary measures where needed. Customers may request a copy of the relevant transfer mechanism using the contact details in Section 15. Customer Private Deployments keep data in the location the Customer chooses to host it.

This section applies only where Samay actually processes personal data originating from the EEA, UK, or Switzerland. For a US-only deployment serving a US Customer, no cross-border transfer occurs and these mechanisms are not engaged; they are in place so the Service can serve those regions if and when it does.

## 10. Data retention

We keep personal data only as long as needed for the purposes described, then delete or de-identify it:

| Category | Retention |
| --- | --- |
| Workspace Data (directory, mappings, allocations) | For as long as the Customer's account is active and as instructed under the DPA. On termination, deleted or returned within 90 days of request, subject to legal retention and routine backup cycles. |
| Audit logs | Retained for 12 months to support security and compliance, then deleted or de-identified. |
| AI-assist data (Section 5.6) | Raw activity is not retained at all; derived suggestions/provenance follow the same lifecycle as other Workspace Data. |
| Security / abuse-prevention logs | Retained for 90 days, then deleted or de-identified. |
| Account, billing & support data | Retained as needed for our legitimate business and legal/tax obligations (typically up to 7 years for financial records). |
| Backups | Overwritten on a rolling cycle; data deleted from production is purged from backups within the normal backup-retention window. |

## 11. End Users: how your rights work

If you are an End User, your organization (the Customer) is the controller of your Workspace Data. Depending on your location, you may have rights to access, correct, delete, restrict, or port your personal data, or to object to certain processing. Please direct these requests to your employer/organization, who controls the data; we will assist the Customer in responding as required by the DPA and applicable law.

For data where we are the controller, you may contact us directly using Section 15. We may need to verify your identity before acting on a request, and we will respond within the timeframe required by applicable law. You will not be discriminated against for exercising your rights.

If you are in the EEA, UK, or Switzerland, you also have the right to lodge a complaint with your local data protection authority. If you are a California resident, you have rights under the CCPA/CPRA — to know, access, correct, and delete personal information, and to opt out of "sale" or "sharing" — which we honor; we do not sell or share personal information as those terms are defined. Residents of other U.S. states with comprehensive privacy laws (including Virginia, Colorado, Connecticut, Utah, Texas, and others as they take effect) have analogous rights, which we also honor. Where we act as a processor/service provider, we will route or forward your request to the relevant Customer.

## 12. Security

We use technical and organizational measures designed to protect personal data, including:

- encryption of integration credentials and secrets at rest, and encryption in transit;
- a passwordless authentication model (no Samay-managed passwords);
- role-based access control, tenant isolation for SaaS, and scoped service tokens that keep human and machine access separate;
- audit logging of administrative and security-relevant actions;
- a design that keeps sensitive processing (including the AI agent and provider credentials) inside the selected data plane, so in a private deployment raw data does not leave the Customer's network.

If we become aware of a personal-data breach affecting Workspace Data, we will notify the affected Customer without undue delay and cooperate as required by the DPA and applicable law; the Customer, as controller, is responsible for notifying End Users and regulators where required. No method of transmission or storage is completely secure, and we cannot guarantee absolute security. Customers are responsible for their own administrator and End-User access controls, and (in Private Deployment mode) for securing their hosting environment.

## 13. Cookies & similar technologies

The Samay app uses strictly necessary cookies (e.g. secure, httpOnly session cookies) to keep you signed in and to operate the Service; these do not require consent. Our marketing website may use limited analytics cookies, which we set only with consent where required and which you can manage through the cookie controls provided there.

## 14. Children

The Service is offered only to businesses and their staff and is not directed to, or intended for use by, anyone under 18. There is no self-serve signup, and we do not knowingly collect personal data from children. If we learn that we have collected personal data from a child, we will delete it.

## 15. Changes to this Policy & contact

We may update this Policy from time to time. We will post the updated version with a new "Last updated" date and, for material changes, provide additional notice to Customers as required. Continued use of the Service after an update constitutes acceptance of the revised Policy.

Samay LLC
Privacy contact: hello@samayapp.co
