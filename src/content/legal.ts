/**
 * LEGAL PAGES
 *
 * ============================================================
 * NOT LEGAL ADVICE. NEEDS ATTORNEY REVIEW BEFORE LAUNCH.
 * ============================================================
 * These are standard, reasonable documents for a Texas service
 * business operating a website with lead capture. They are not
 * drafted by a lawyer and they are not tailored to how Design By
 * TWM actually handles data, warranties or disputes.
 *
 * Specific items requiring confirmation are flagged in
 * CLIENT_REVIEW_NOTES.md section 19.
 * ============================================================
 */

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
}

const CONTACT_LINE =
  "Questions about this policy can be directed to the house by phone, by email or in person at the facility. Contact details are on the contact page.";

export const legalDocs: Record<string, LegalDoc> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary:
      "How DESIGNBYTWM collects, uses and protects information submitted through this website.",
    updated: "August 2026",
    intro: [
      "DESIGNBYTWM operates this website to present its services and to allow prospective clients to request consultations. This policy explains what information is collected, why, and what happens to it.",
      "We collect the minimum needed to respond to an inquiry and to run the business. We do not sell personal information.",
    ],
    sections: [
      {
        heading: "Information you give us",
        body: [
          "When you submit a form on this site, we collect the details you enter. Depending on the form this may include your name, email address, phone number, vehicle details, the services you are interested in, your timeline and any message you write.",
          "You choose what to submit. Nothing on this site requires you to provide information in order to read it.",
        ],
      },
      {
        heading: "Information collected automatically",
        body: [
          "Like most websites, this site records basic technical information such as pages visited, approximate location derived from IP address, device type and referring source. This is used to understand how the site is performing and where visitors are coming from.",
          "This site uses analytics services for that purpose. Those services may set cookies or use similar technologies.",
        ],
      },
      {
        heading: "How your information is used",
        body: [
          "To respond to your inquiry and arrange a consultation. To prepare a quote. To communicate with you about a project. To keep records of work performed. To improve the website and understand which services people are looking for.",
          "If you have asked us to, we may contact you about services relevant to your vehicle. You can ask to stop receiving that at any time.",
        ],
      },
      {
        heading: "Who your information is shared with",
        body: [
          "We do not sell personal information.",
          "Information is shared only with service providers that help us operate, such as email delivery, form handling, customer records and analytics. Those providers process information on our behalf and are not permitted to use it for their own purposes.",
          "Information may also be disclosed where required by law.",
        ],
      },
      {
        heading: "How long it is kept",
        body: [
          "Inquiry records are kept for as long as needed to respond and to maintain a record of the relationship. Records relating to work performed are kept longer, since warranty and service history depend on them.",
          "You can ask us to delete information we hold about you and we will do so where we are not required to retain it.",
        ],
      },
      {
        heading: "Text messages",
        body: [
          "If you contact the house by text message, your phone number and the content of those messages are used to respond to you. Message and data rates from your carrier may apply.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can ask what information we hold about you, ask for it to be corrected, or ask for it to be deleted. You can ask us to stop contacting you at any time.",
          CONTACT_LINE,
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "This policy may be updated. The date at the top reflects the most recent revision.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms of Use",
    summary:
      "The terms that apply to using this website. Work performed on a vehicle is governed by a separate written agreement.",
    updated: "August 2026",
    intro: [
      "These terms apply to your use of this website. They do not govern work performed on a vehicle, which is covered by the written quote and agreement provided before any work begins.",
    ],
    sections: [
      {
        heading: "Using this site",
        body: [
          "You may use this site to learn about our services and to contact us. You may not use it to attempt to interfere with its operation, to gain unauthorised access, or for any unlawful purpose.",
        ],
      },
      {
        heading: "Information on this site",
        body: [
          "Descriptions of services, timeframes and processes on this site are general and are provided to help you understand the work. They are not a quote and are not a guarantee of a particular outcome, price or schedule for your vehicle.",
          "Every vehicle is different. Pricing and timing are confirmed in writing after the vehicle has been inspected.",
        ],
      },
      {
        heading: "Photography and content",
        body: [
          "Photographs, text, logos and design elements on this site are the property of DESIGNBYTWM or are used with permission. They may not be reproduced without written consent.",
          "Vehicle photographs shown are of work performed by DESIGNBYTWM unless stated otherwise.",
        ],
      },
      {
        heading: "Forms and inquiries",
        body: [
          "Submitting a form on this site starts a conversation. It does not create a contract, reserve capacity or commit either party to anything. Work is scheduled only once a written quote has been provided and accepted.",
        ],
      },
      {
        heading: "Third party links",
        body: [
          "This site may link to other websites. We are not responsible for the content or practices of sites we do not operate.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "This website is provided as is. To the extent permitted by law, DESIGNBYTWM is not liable for any loss arising from use of this website or reliance on general information published on it.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of the State of Texas.",
          CONTACT_LINE,
        ],
      },
    ],
  },

  accessibility: {
    slug: "accessibility",
    title: "Accessibility",
    summary:
      "Our commitment to keeping this website usable for everyone, and how to tell us when something is not working.",
    updated: "August 2026",
    intro: [
      "This site was built to be usable by as many people as possible, including people using screen readers, keyboard navigation, magnification or reduced motion settings.",
    ],
    sections: [
      {
        heading: "What we have done",
        body: [
          "The site targets WCAG 2.2 Level AA. In practice that means text meets contrast requirements against its background, every interactive element can be reached and operated with a keyboard, focus is always visible, images carry descriptive alternative text, and page structure uses proper headings and landmarks so assistive technology can navigate it.",
          "Animation on this site respects the reduced motion setting in your operating system. If you have that enabled, scroll animations are replaced with a simple fade.",
          "Frequently asked questions are written into the page rather than loaded by script, so they are readable regardless of how you are accessing the site.",
        ],
      },
      {
        heading: "Known limitations",
        body: [
          "The map on the contact page is provided by Google and its accessibility is outside our control. The full address and phone number are always presented as text alongside it, so no information is available only through the map.",
        ],
      },
      {
        heading: "Visiting the facility",
        body: [
          "If you have accessibility requirements for a visit or a consultation, contact the house in advance and we will make arrangements.",
        ],
      },
      {
        heading: "Tell us about a problem",
        body: [
          "If you encounter something on this site that you cannot access or use, we want to know. Contact us by phone, text or email with a description of the problem and the page it happened on, and we will address it.",
          CONTACT_LINE,
        ],
      },
    ],
  },
};

export const getLegalDoc = (slug: string) => legalDocs[slug];
