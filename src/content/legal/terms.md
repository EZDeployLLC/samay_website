## 1. Agreement & how it forms

These Terms of Service ("Terms") are a binding agreement between Samay LLC, [ENTITY TYPE, e.g. a Delaware corporation], located at [REGISTERED ADDRESS] ("Samay", "we", "us", "our"), and the organization identified on an Order Form or that otherwise subscribes to or uses the Service ("Customer", "you").

The Service is a business product offered only to organizations, not to consumers. It is not intended for personal, family, or household use, and you may not rely on any consumer-protection law in connection with the Service.

### 1.1 How these Terms take effect

These Terms become binding when the earliest of the following occurs: (a) you and Samay sign an Order Form, Master Services Agreement, or other ordering document that references or incorporates these Terms; (b) an authorized representative of your organization accepts these Terms electronically; or (c) you or your Authorized Users access or use the Service. The individual accepting these Terms or first using the Service represents that they are authorized to bind the organization, and "you" then refers to that organization.

### 1.2 Order of precedence

If there is a conflict among the documents that make up this agreement, the following order controls, from highest to lowest: (1) a mutually signed Order Form or Master Services Agreement; (2) the Data Processing Addendum at [DPA URL] (the "DPA") as to the processing of personal data; (3) these Terms; and (4) the Documentation. A signed Order Form or Master Services Agreement supersedes these Terms only where it expressly conflicts; otherwise these Terms apply in full.

### 1.3 The complete agreement

These Terms, together with the Privacy Policy, the DPA, and any Order Form, form the entire agreement between the parties for the Service and are referred to together as the "Agreement." Pre-printed terms on a purchase order or vendor portal do not apply and are rejected.

## 2. Definitions

- **Service** — the Samay timesheet and job-code management application, including the web app, the Slack integration, AI Features, APIs, and related software and documentation, whether delivered as Samay SaaS or as a Customer Private Deployment.
- **Authorized User** — an individual the Customer permits to access the Service, including Administrators, Proxies/EAs, and Creatives (End Users).
- **Administrator** — an Authorized User the Customer designates with rights to configure the workspace, connect Integrations, and manage users.
- **Customer Data** — data the Customer or its Authorized Users submit to, or that is generated for the Customer through, the Service — including identity/directory data, job-code directories, person↔code mappings, allocations/timesheets, consent records, and audit logs.
- **Integrations** — third-party systems an Administrator connects to the Service (for example a Resource Manager, a Time-Tracking platform, Slack, or an identity provider).
- **AI Features** — optional features in which an AI agent drafts suggested allocations from a user's connected activity (see Section 9).
- **Order Form** — an ordering document signed by both parties (or an online order accepted by the Customer) that specifies the subscription, fees, and term.
- **Documentation** — Samay's then-current usage documentation for the Service, as made available to the Customer.
- **Aggregated/De-identified Data** — data derived from operation of the Service that has been aggregated and/or stripped of identifiers so that it does not identify, and cannot reasonably be used to identify, the Customer or any individual.

## 3. The Service

Samay helps an organization keep each person's active job/charge codes accurate and lets people file a weekly time allocation against those codes from the web app or Slack. The core Service:

- reconciles job codes and project titles from the Customer's own Resource Manager and Time-Tracking systems into a derived directory;
- resolves each person's active codes and presents them for filing;
- records weekly allocations (draft and filed); and
- provides notifications and administrator compliance views.

### 3.1 Changes to the Service

We may update, improve, or change features of the Service over time. We will not materially degrade the core functionality of the Service during a paid subscription term without giving the Customer reasonable prior notice. If we materially and adversely degrade the core functionality and do not restore it within thirty (30) days of the Customer's written notice, the Customer may terminate the affected subscription and receive a pro-rata refund of prepaid, unused fees for the terminated portion.

### 3.2 Not a system of record or backup service

The Service produces derived and suggested outputs and is a convenience layer over the Customer's own systems. The Customer's source systems remain the systems of record. The Service is not a books-and-records system, a payroll system, a system of record, or a backup or archival service, and the Customer is responsible for independently maintaining authoritative records of time, billing, and payroll, and for retaining its own copies of Customer Data.

## 4. Accounts, roles & access

### 4.1 Provisioning

The Service uses an admin-managed, no-end-user-signup model. Authorized Users are provisioned by the Customer (via SSO/JIT, SCIM where available, or Administrator action). There is no self-serve public signup.

### 4.2 Authentication

Sign-in is passwordless (magic link, enterprise SSO such as Okta, or a short-lived signed Slack deep link). The Customer is responsible for configuring its identity provider and for the security of its users' email and SSO accounts.

### 4.3 Roles & delegation

Access is role-based (Administrator, Proxy/EA, Creative). A Proxy/EA may file on behalf of another person only where the Customer authorizes that delegation; every proxied action is attributed to the acting individual in the audit log.

### 4.4 Administrator authority

The Customer is responsible for its Administrators' actions, including connecting Integrations and granting access. Administrators act on the Customer's behalf, and instructions or authorizations given by an Administrator are deemed given by the Customer.

### 4.5 Account security

The Customer must take reasonable measures to secure access to the Service and must promptly notify us of any unauthorized access or suspected security incident affecting its account or Authorized Users.

## 5. Customer responsibilities

The Customer is responsible for:

- **Lawful basis and notices.** Ensuring it has the right to provide Authorized Users' personal data and to connect the Integrations, and that it has given any legally required notices to, and obtained any required consents from, its Authorized Users — including regarding workplace time tracking and any AI Features. As between the parties, the Customer is the controller of Customer Data and Samay is its processor (see the DPA).
- **Integration authority.** Having the rights and permissions to connect each Integration and to allow Samay to read (and, where applicable in later phases, write back) the relevant data.
- **Accuracy and use of outputs.** Reviewing and verifying time entries before they are relied upon for billing, payroll, or compliance. Samay produces derived and suggested outputs; the Customer and its users are responsible for the accuracy of what they file (see Sections 9 and 12).
- **User conduct.** Ensuring its Authorized Users comply with these Terms; the Customer is responsible for their acts and omissions as if they were its own.
- **Its environment (Private Deployment).** If it operates a Customer Private Deployment, hosting, securing, backing up, and operating that environment and its data (see Section 11).

## 6. Acceptable use & suspension

The Customer and its Authorized Users will not:

- use the Service in violation of applicable law or third-party rights;
- access or use the Service to build a competing product, or reverse engineer, decompile, or attempt to derive source code, except to the extent that restriction is prohibited by law;
- resell, sublicense, rent, or provide the Service to third parties except as expressly permitted;
- upload malicious code, attempt to gain unauthorized access, probe or disrupt the Service, or circumvent usage limits or security controls;
- submit data they are not authorized to provide, or use the Service to surveil individuals unlawfully;
- misrepresent their identity or another person's, or misuse proxy/delegation capabilities.

### 6.1 Suspension

We may suspend access to the Service (or an affected portion or Authorized User) where reasonably necessary to address a material, ongoing security risk, a legal requirement, a violation of this Section, or non-payment under Section 10. We will give notice where practicable and will limit any suspension in scope and duration to what is reasonably necessary. We will restore access promptly once the cause is resolved. Customer Data is retained during a suspension and remains subject to Section 17.

## 7. Customer Data & ownership

### 7.1 Your data is yours

As between the parties, the Customer owns all Customer Data. The Customer grants Samay a limited, non-exclusive, worldwide license to host, process, transmit, and display Customer Data solely to provide, secure, support, and improve the Service for the Customer and as otherwise permitted by the Agreement and the DPA.

### 7.2 Source systems remain authoritative

Samay stores a derived view of job codes and related data; it does not become the system of record for the Customer's source systems (see Section 3.2).

### 7.3 Data protection

Our processing of personal data within Customer Data is governed by the DPA at [DPA URL], which is incorporated into these Terms and includes the Standard Contractual Clauses where required. The DPA controls over these Terms regarding the processing of personal data.

### 7.4 No sale; no model training on Customer Data

We do not sell Customer Data, and we do not use Customer Data to train generalized or foundation AI models. Where AI Features are used, Customer Data and activity processed by the AI subprocessor are subject to contractual terms that prohibit use of that data to train the subprocessor's models, as described in Section 9 and the Privacy Policy.

### 7.5 Aggregated/De-identified Data

We may generate and use Aggregated/De-identified Data to operate, secure, analyze, and improve the Service and our business. Such data does not identify the Customer or any individual, and we will not attempt to re-identify it.

## 8. Integrations & third parties

The Service interoperates with third-party systems the Customer chooses to connect. These are among the Service's most important capabilities and also its largest area of dependence on parties outside our control, so the following apply.

- The Customer's use of an Integration is governed by the Customer's agreement with that third party, not by Samay. We are not responsible for third-party services, their availability, their accuracy, their security, or their data practices.
- The Customer authorizes Samay to access and exchange data with an Integration as needed to provide the Service, based on the credentials and scopes an Administrator provides.
- We are not liable for any act or omission of an Integration or its provider, including any unavailability, change, suspension, rate-limiting, deprecation, error, or any access to, modification of, corruption of, or deletion of data by the Integration or its provider.
- If an Integration changes, restricts, or discontinues its service, related Service functionality may be affected, suspended, or discontinued without liability to us, although we will use commercially reasonable efforts to provide notice where practicable.

## 9. AI Features

If enabled, AI Features draft suggested allocations from a user's connected activity. By enabling or using AI Features the Customer acknowledges and agrees:

- **Opt-in and scoped.** AI Features are off by default. The Administrator enables which connectors are available, and each End User chooses which sources the agent may read for them. Users can view an access log and revoke access at any time.
- **Ephemeral processing.** The agent reads activity at request time, holds it in memory only, and persists only a derived suggestion and minimal provenance — it does not store the underlying raw activity.
- **Suggestions only, not authoritative.** AI outputs are drafts that may be inaccurate or incomplete. They are not professional, financial, legal, tax, payroll, or accounting advice. A human must review and confirm any allocation before it is filed or relied upon, and the Customer remains responsible for the accuracy of filed time.
- **Third-party AI provider.** AI Features are powered by a third-party model provider acting as a subprocessor under the DPA. That provider is contractually prohibited from using Customer Data or activity processed through the Service to train its models, and inputs and outputs are not used to improve generally available models. The current AI subprocessor is identified in the Privacy Policy and subprocessor list.

## 10. Fees & payment

### 10.1 Fees

The Customer will pay the fees stated in the applicable Order Form. Except where an Order Form says otherwise, fees are quoted and payable in [CURRENCY, e.g. US dollars], invoiced [BILLING FREQUENCY, e.g. annually in advance], and due within [NET PAYMENT DAYS, e.g. 30] days of the invoice date.

### 10.2 Taxes

Fees are exclusive of taxes. The Customer is responsible for all sales, use, VAT, and similar taxes, excluding taxes on our net income. If we are required to collect such taxes, we will add them to the invoice unless the Customer provides a valid exemption certificate in advance.

### 10.3 Late payment

Undisputed amounts not paid when due may accrue interest at the lower of 1.5% per month or the maximum rate permitted by law. We may suspend the Service for material non-payment that remains uncured ten (10) days after written notice.

### 10.4 Renewal

Unless an Order Form states otherwise, subscriptions renew for successive terms equal to the initial term unless either party gives written notice of non-renewal at least thirty (30) days before the end of the then-current term. We may adjust fees for a renewal term with at least thirty (30) days' notice before the renewal date.

### 10.5 No refunds except as stated

Fees are non-refundable except where these Terms expressly provide a refund (for example, Sections 3.1 and 17).

## 11. Deployment modes

The Service is offered as Samay SaaS (we host and operate it) or as a Customer Private Deployment (the Customer hosts and operates it within its own network/VPC).

### 11.1 Samay SaaS

We are responsible for hosting, availability, security of the hosted environment, backups, and updates, as further described in any service-level terms referenced in an Order Form. [Attach or reference SLA/support terms, or state "no separate SLA applies" for the pilot.]

### 11.2 Customer Private Deployment

We license the software and provide packaging/IaC and reasonable deployment support as agreed. The Customer is responsible for provisioning, configuring, securing, backing up, monitoring, and operating the deployment and its data. Any optional connection back to Samay is limited to license, update, and non-sensitive health metadata. Our SaaS availability and security obligations do not apply to environments the Customer operates, and our warranties and indemnities in Sections 12 and 15 apply only to the software as delivered, not to the Customer's operation of it.

## 12. Warranties & disclaimers

**Mutual.** Each party warrants that it has the authority to enter into these Terms.

**Service.** We warrant that, during a paid subscription term, the SaaS Service will perform materially in accordance with the Documentation. Our sole obligation, and the Customer's exclusive remedy, for breach of this warranty is for us to use commercially reasonable efforts to correct the non-conformity and, if we cannot do so within a reasonable period, to allow the Customer to terminate the affected subscription and receive a pro-rata refund of prepaid, unused fees for the terminated portion.

**DISCLAIMER.** EXCEPT AS EXPRESSLY STATED IN THIS SECTION 12, THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT ANY OUTPUT — INCLUDING JOB-CODE RECONCILIATION OR AI-GENERATED DRAFTS — IS ACCURATE, COMPLETE, OR SUITABLE FOR BILLING, PAYROLL, TAX, OR COMPLIANCE PURPOSES. THE CUSTOMER IS RESPONSIBLE FOR REVIEWING AND VERIFYING ALL TIME ENTRIES BEFORE RELYING ON THEM. SOME JURISDICTIONS DO NOT ALLOW CERTAIN DISCLAIMERS, SO PARTS OF THIS DISCLAIMER MAY NOT APPLY.

### 12.1 High-risk uses excluded

The Service is a business-productivity tool and is not designed for, and must not be used in, environments requiring fail-safe performance, including the operation of life-support, emergency, aircraft or vehicle navigation, nuclear, or other systems where failure could lead to death, personal injury, or severe physical or environmental damage.

## 13. Confidentiality

Each party may access the other's confidential information. The receiving party will use it only to perform under these Terms, protect it with at least reasonable care, and not disclose it except to personnel, advisors, and subprocessors who need to know and are bound by confidentiality obligations at least as protective as these. This does not apply to information that is or becomes public through no fault of the receiving party, was already known to it, is independently developed without use of the disclosing party's confidential information, or is rightfully received from a third party. Either party may disclose confidential information where legally compelled, giving notice where permitted and reasonably cooperating to limit the disclosure. The Customer's Customer Data is the Customer's confidential information and is also governed by Section 7 and the DPA.

## 14. Intellectual property & feedback

Samay and its licensors own all rights in the Service, the underlying software, and the Documentation, including all improvements. Except for the limited rights expressly granted in these Terms, no rights are transferred, and we reserve all rights not expressly granted. Customer Data remains the Customer's (Section 7).

If the Customer or its Authorized Users provide suggestions or feedback about the Service, the Customer grants us a perpetual, irrevocable, worldwide, royalty-free license to use that feedback to operate and improve our products and services, without obligation or compensation. Feedback is given voluntarily and need not be provided.

## 15. Indemnification

### 15.1 By Samay (IP infringement)

We will defend the Customer against any third-party claim alleging that the Service, when used as permitted under these Terms, infringes that third party's patent, copyright, trademark, or trade secret, and we will indemnify the Customer for damages and reasonable costs finally awarded against it (or agreed in settlement by us) for such a claim. If the Service becomes, or we believe it may become, the subject of an infringement claim, we may at our option and expense (a) procure the right for the Customer to continue using it, (b) modify or replace it to make it non-infringing while substantially preserving its functionality, or (c) if neither is commercially reasonable, terminate the affected subscription and refund prepaid, unused fees. We have no obligation for any claim arising from (i) use of the Service in violation of these Terms, (ii) combination of the Service with anything not provided by us where the claim would not have arisen but for the combination, (iii) Customer Data or Integrations, or (iv) modifications not made by us. This Section states our entire liability, and the Customer's exclusive remedy, for third-party intellectual-property claims, and our liability under it is subject to the IP-infringement cap in Section 16(c)(i).

### 15.2 By the Customer

The Customer will defend and indemnify Samay against any third-party claim arising from (a) Customer Data, including any claim that it infringes or violates a third party's rights or that the Customer lacked the rights or consents required to provide it or to connect the Integrations; (b) the Customer's or its Authorized Users' use of the Service in violation of these Terms or applicable law; or (c) an employment, privacy, or labor claim by an Authorized User or other individual arising from the Customer's own time-tracking, monitoring, or billing decisions.

### 15.3 Procedure

The party seeking indemnification will promptly notify the other of the claim, give the indemnifying party sole control of the defense and settlement (provided no settlement imposing a non-monetary obligation on the indemnified party is made without its consent), and reasonably cooperate. A delay in notice reduces the indemnifying party's obligations only to the extent it is prejudiced by the delay.

## 16. Limitation of liability

Liability is capped at three levels — a general cap, a higher cap for IP-infringement defense, and a higher cap for privacy/security breaches — with a narrow set of items that cannot be capped at all. This tiering is deliberate: it keeps everyday risk low while giving a sophisticated customer the elevated protection they expect on the two categories they care about most.

TO THE MAXIMUM EXTENT PERMITTED BY LAW:

**(a) NO INDIRECT DAMAGES.** NEITHER PARTY WILL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO THE AGREEMENT OR THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY.

**(b) GENERAL CAP.** EXCEPT AS STATED IN (c) AND (d), EACH PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THE AGREEMENT WILL NOT EXCEED THE GREATER OF (i) THE FEES PAID OR PAYABLE BY THE CUSTOMER FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE EVENT GIVING RISE TO THE LIABILITY, OR (ii) [GENERAL FLOOR, e.g. US $5,000 — set a meaningful figure for a no-/low-fee pilot].

**(c) ELEVATED CAPS.** THE FOLLOWING ARE NOT SUBJECT TO THE GENERAL CAP IN (b) BUT ARE INSTEAD SUBJECT TO THEIR OWN CAPS:

(i) SAMAY'S IP-INFRINGEMENT INDEMNITY UNDER SECTION 15.1 WILL NOT EXCEED THE GREATER OF [IP MULTIPLE, e.g. 2×] THE FEES PAID OR PAYABLE BY THE CUSTOMER IN THE TWELVE (12) MONTHS BEFORE THE CLAIM, OR [IP FLOOR, e.g. US $25,000].

(ii) EACH PARTY'S LIABILITY FOR A BREACH OF ITS DATA-PROTECTION OR SECURITY OBLIGATIONS (INCLUDING A PERSONAL-DATA BREACH OR BREACH OF THE DPA) WILL NOT EXCEED THE GREATER OF [SECURITY MULTIPLE, e.g. 3×] THE FEES PAID OR PAYABLE BY THE CUSTOMER IN THE TWELVE (12) MONTHS BEFORE THE EVENT, OR [SECURITY FLOOR, e.g. US $50,000].

**(d) UNCAPPED.** NOTHING IN THIS SECTION LIMITS: THE CUSTOMER'S PAYMENT OBLIGATIONS; THE CUSTOMER'S INDEMNITY UNDER SECTION 15.2; A PARTY'S BREACH OF ITS CONFIDENTIALITY OBLIGATIONS UNDER SECTION 13 (OTHER THAN A CLAIM RELATING TO CUSTOMER DATA OR PERSONAL DATA, WHICH IS GOVERNED BY (c)(ii)); OR LIABILITY THAT CANNOT BE LIMITED OR EXCLUDED UNDER APPLICABLE LAW (SUCH AS FOR GROSS NEGLIGENCE, FRAUD, OR WILLFUL MISCONDUCT).

**(e)** THE FOREGOING ALLOCATES RISK BETWEEN THE PARTIES AND IS A FUNDAMENTAL BASIS OF THE BARGAIN; THE FEES REFLECT IT.

## 17. Term, termination & data return

- **Term.** These Terms apply for the subscription term stated in the Order Form and any renewals, or while the Customer uses the Service if there is no Order Form.
- **Termination for cause.** Either party may terminate for the other's material breach not cured within thirty (30) days after written notice.
- **Termination for insolvency.** Either party may terminate if the other becomes insolvent, ceases business, or becomes subject to bankruptcy or similar proceedings not dismissed within sixty (60) days.
- **Effect of termination.** Access ends. On the Customer's request made within thirty (30) days after termination, we will make Customer Data available for export in a commonly used format, after which we will delete it as described in the Privacy Policy and DPA, subject to legal retention requirements and routine backup cycles. For Customer Private Deployments, the Customer retains control of its own data.
- **Refund / payment on termination.** If the Customer terminates for our uncured material breach, we will refund prepaid, unused fees for the terminated portion of the term. If we terminate for the Customer's uncured material breach or non-payment, the Customer remains responsible for fees accrued through the effective date of termination.
- **Survival.** Sections that by their nature should survive — including 1.3, 2, 3.2, 6, 7, 8, 9, 10 (as to accrued amounts), 12–16, 18, 20, 21, and 22 — survive termination.

## 18. Limitation period on claims

Except for claims relating to non-payment, and except where a longer period is required by law, any claim arising out of or related to the Agreement or the Service must be brought within one (1) year after the claim arose; otherwise it is permanently barred.

## 19. Changes to these Terms

We may update these Terms from time to time. For material changes, we will give reasonable prior notice (for example, in-product or by email to Administrators) before they take effect. Changes take effect on the stated date; continued use of the Service after that date constitutes acceptance. If the Customer is under a current paid subscription term and reasonably objects to a material change that adversely affects it, the change will not apply until the next renewal of that subscription. Changes that must be made for legal or security reasons may take effect immediately.

## 20. Governing law & disputes

These Terms are governed by the laws of the State of [GOVERNING STATE, e.g. Delaware], without regard to its conflict-of-laws rules, and excluding the U.N. Convention on Contracts for the International Sale of Goods.

The parties will first attempt in good faith to resolve any dispute through senior-level discussions for thirty (30) days after written notice of the dispute. If unresolved, the parties submit to the exclusive jurisdiction of the state and federal courts located in [VENUE COUNTY/CITY AND STATE], and each party consents to personal jurisdiction and venue there and waives any objection to it.

Each party irrevocably waives any right to a jury trial in any proceeding arising out of or related to the Agreement. Because this is a business-to-business agreement between organizations, the parties have elected court jurisdiction rather than arbitration; if the parties later wish to arbitrate, they may agree to do so in an Order Form.

## 21. Export, sanctions & anti-corruption

Each party will comply with applicable export-control, economic-sanctions, and anti-corruption laws. The Customer represents that it and its Authorized Users are not located in, or ordinarily resident in, a country or territory subject to comprehensive sanctions, and are not on any government restricted-party list, and that it will not use the Service in violation of such laws or export, re-export, or make the Service available to anyone in violation of them.

## 22. General

- **Entire agreement.** The Agreement (Section 1.3) is the entire agreement and supersedes prior discussions on its subject matter.
- **Assignment.** Neither party may assign the Agreement without the other's consent, except that either party may assign it in full to a successor in a merger, acquisition, or sale of substantially all assets, on notice. Any other attempted assignment is void.
- **Subprocessors.** We may use subprocessors as described in the Privacy Policy and DPA, and remain responsible for their performance of the Service.
- **Publicity.** Neither party will use the other's name or marks without prior written consent, except that we may identify the Customer as a customer using its name and logo in customer lists and on our website unless the Customer notifies us in writing to stop.
- **Force majeure.** Neither party is liable for delay or failure caused by events beyond its reasonable control; this does not excuse payment obligations for the Service already provided.
- **No waiver; severability.** A failure to enforce is not a waiver; if a provision is unenforceable, it is modified to the minimum extent necessary or severed, and the rest remains in effect.
- **Independent contractors.** The parties are independent contractors; the Agreement creates no partnership, agency, or joint venture.
- **No third-party beneficiaries.** The Agreement confers no rights on anyone other than the parties.
- **Notices.** Legal notices will be in writing and sent to [NOTICE ADDRESS / EMAIL] and to the Customer's Administrator contact on file, and are deemed given on receipt (or, for email, on confirmed transmission).

## 23. Contact

Samay LLC
[REGISTERED ADDRESS]
hello@samayapp.co
