import { Reveal } from "@/components/Reveal";
import { FormPending } from "@/components/forms/FormPending";
import { dealerPackages } from "@/content/dealers";
import { nap } from "@/lib/site";

/**
 * DealerForm
 *
 * B2B intake, deliberately different from the retail form. It asks for
 * dealership, role, monthly volume and which package categories are of
 * interest, because those four answers are what determine whether a
 * program conversation is worth scheduling.
 *
 * NOT YET WIRED. Submission handling comes with the lead pipeline.
 */
export function DealerForm() {
  return (
    <section id="dealer-intake">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow">Dealer Inquiry</span>
          <h2 className="display">Start a dealer program.</h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            Tell us about your inventory and your turn cycle. We come back with
            a specification and reserved capacity rather than a price list.
          </p>
        </Reveal>

        <Reveal className="form-card">
          <input type="hidden" name="source" value="dealer-services" />

          <div className="row">
            <div className="field">
              <label htmlFor="d-dealership">Dealership</label>
              <input id="d-dealership" name="dealership" type="text" placeholder="Dealership name" autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="d-name">Your name</label>
              <input id="d-name" name="name" type="text" placeholder="Full name" autoComplete="name" />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="d-role">Role</label>
              <select id="d-role" name="role" defaultValue="">
                <option value="" disabled>Select a role</option>
                <option>Dealer principal or owner</option>
                <option>General manager</option>
                <option>Used car manager</option>
                <option>Fixed operations</option>
                <option>Finance and insurance</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="d-volume">Estimated monthly units</label>
              <select id="d-volume" name="volume" defaultValue="">
                <option value="" disabled>Select a range</option>
                <option>1 to 5 units</option>
                <option>6 to 15 units</option>
                <option>16 to 30 units</option>
                <option>30 or more units</option>
                <option>Selected units only, not a standing spec</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="d-email">Email</label>
              <input id="d-email" name="email" type="email" placeholder="name@dealership.com" autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="d-phone">Phone</label>
              <input id="d-phone" name="phone" type="tel" placeholder="(832) 000-0000" autoComplete="tel" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="d-packages">Packages of interest</label>
            <select id="d-packages" name="packages" defaultValue="">
              <option value="" disabled>Select a package category</option>
              {dealerPackages.map((pkg) => (
                <option key={pkg.slug} value={pkg.name}>
                  {pkg.name}
                </option>
              ))}
              <option>Multiple categories</option>
              <option>Not sure yet, want to discuss</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="d-inventory">Inventory mix and what you are trying to solve</label>
            <textarea
              id="d-inventory"
              name="inventory"
              placeholder="What you carry, which units are sitting, and what turnaround you need."
            />
          </div>

          <FormPending label="Request A Dealer Consultation" />
        </Reveal>
      </div>
    </section>
  );
}
