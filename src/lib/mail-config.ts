/**
 * LEAD DELIVERY CONFIGURATION
 *
 * Addresses live here rather than in environment variables, deliberately.
 *
 * Vercel encrypts environment values and will not show them again after
 * they are saved, which means nobody, including Jose, can read who a form
 * is currently emailing. For a secret that is correct. For a recipient
 * list it is a liability: the one thing most likely to need changing is
 * the thing nobody can see.
 *
 * So the API key stays in the environment, where it belongs, and the
 * addresses sit in version control where they can be read, reviewed and
 * changed in a commit.
 */

/**
 * Sending identity.
 *
 * noreply@designbytwm.com is already verified and sending in production,
 * proven by the coming soon page. Do not change it without checking the
 * domain is verified for the new address in Resend first.
 */
export const MAIL_FROM = "Design By TWM <noreply@designbytwm.com>";

/**
 * The customer facing auto-response comes from a monitored inbox rather
 * than from noreply. If someone hits reply to ask a question, that reply
 * has to land somewhere a human reads.
 */
export const MAIL_REPLY_FROM = "Design By TWM <info@designbytwm.com>";

/**
 * Who receives a new lead.
 *
 * info@designbytwm.com is the primary address and the only public facing
 * one. It is first because it is where a lead is answered from.
 *
 * The gmail and media@ entries below it are internal copies, kept so a
 * lead is visible to Jose and Liz without either of them working out of
 * the public inbox.
 */
export const LEAD_RECIPIENTS = [
  "info@designbytwm.com",
  "designbytwmwebmaster@gmail.com",
  "media@designbytwm.com",
];

/** Human readable labels for the source tag each form submits. */
export const SOURCE_LABELS: Record<string, string> = {
  home: "Homepage intake",
  contact: "Contact page",
  "design-your-build": "Design Your Build flow",
  "dealer-services": "Dealer account application",
  wheels: "Wheel fitment inquiry",

  /* The ten service pages, each closing band stamping its own slug. */
  "service-blackout-packages": "Blackout Packages service page",
  "service-paint-protection-film": "Paint Protection Film (PPF) service page",
  "service-vehicle-wraps": "Vehicle Wraps service page",
  "service-wheels-and-fitment": "Wheels & Fitment service page",
  "service-interior-transformation": "Interior Transformation service page",
  "service-suspension": "Suspension service page",
  "service-paint-and-body": "Paint & Body service page",
  "service-lighting": "Lighting service page",
  "service-audio": "Audio service page",
  "service-truck-accessories": "Truck Accessories service page",
};
