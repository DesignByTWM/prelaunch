import { Reveal } from "@/components/Reveal";
import { FormPending } from "@/components/forms/FormPending";
import { services } from "@/content/services";
import { nap } from "@/lib/site";

/**
 * IntakeForm
 *
 * Approved V2 layout and copy, now reusable across pages.
 *
 * `source` is the important prop. Every page that renders this form stamps
 * its own source, which is carried into the lead payload so the pipeline
 * can attribute a lead to the exact page that produced it. Without it the
 * 22 location pages and 10 service pages are unmeasurable.
 *
 * `preselect` matches a service name so a visitor arriving from a service
 * page finds the dropdown already set.
 *
 * NOT YET WIRED. The button is inert, exactly as in the V2 demo.
 * Submission, Resend delivery and Airtable sync are the next task.
 */
export function IntakeForm({
  eyebrow = "Get Started",
  title = "Design your build.",
  lede = "Tell us about your vehicle and what you have in mind. We follow up to schedule a consultation.",
  source = "homepage",
  preselect,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  source?: string;
  preselect?: string;
}) {
  return (
    <section id="intake">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="display">{title}</h2>
          <p className="lede" style={{ margin: "0 auto" }}>{lede}</p>
        </Reveal>

        <Reveal className="form-card">
          <input type="hidden" name="source" value={source} />

          <div className="row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Full name" autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="name@email.com" autoComplete="email" />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="(832) 000-0000" autoComplete="tel" />
            </div>
            <div className="field">
              <label htmlFor="vehicle">Vehicle</label>
              <input id="vehicle" name="vehicle" type="text" placeholder="Year, make and model" />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="service">Service of interest</label>
              <select id="service" name="service" defaultValue={preselect ?? ""}>
                <option value="" disabled>Select a service</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.name}>
                    {service.name}
                  </option>
                ))}
                <option>Complete transformation</option>
                <option>Custom, not sure yet</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="timeline">Timeline</label>
              <select id="timeline" name="timeline" defaultValue="">
                <option value="" disabled>Select a timeline</option>
                <option>As soon as possible</option>
                <option>1 to 3 months</option>
                <option>3 to 6 months</option>
                <option>Just exploring</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="vision">Tell us about the project</label>
            <textarea
              id="vision"
              name="vision"
              placeholder="Describe your vehicle and the transformation you have in mind."
            />
          </div>

          <FormPending label="Request Consultation" />
        </Reveal>
      </div>
    </section>
  );
}
