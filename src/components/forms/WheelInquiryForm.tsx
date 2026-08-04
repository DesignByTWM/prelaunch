import { Reveal } from "@/components/Reveal";
import { FormPending } from "@/components/forms/FormPending";
import { wheelPrograms } from "@/content/wheels";
import { nap } from "@/lib/site";

/**
 * WheelInquiryForm
 *
 * The Shop Wheels module ships as a form, not a catalog. Fields are chosen
 * so a single submission carries everything needed to quote without a round
 * trip: the vehicle, what is on it now, the construction and diameter they
 * are after, and whether suspension is in play.
 *
 * That last field matters. Ride height changes what will clear, so a wheel
 * inquiry that does not ask about suspension generates a second phone call
 * on roughly half of truck and SUV leads.
 *
 * NOT YET WIRED.
 */
export function WheelInquiryForm() {
  return (
    <section id="wheel-inquiry">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow">Wheel Inquiry</span>
          <h2 className="display">Get a fitment quote.</h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            Tell us the vehicle and the look you are after. We come back with
            options that will actually fit rather than a catalog to scroll.
          </p>
        </Reveal>

        <Reveal className="form-card">
          <input type="hidden" name="source" value="wheels" />

          <div className="row">
            <div className="field">
              <label htmlFor="w-name">Name</label>
              <input id="w-name" name="name" type="text" placeholder="Full name" autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="w-phone">Phone</label>
              <input id="w-phone" name="phone" type="tel" placeholder="(832) 000-0000" autoComplete="tel" />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="w-email">Email</label>
              <input id="w-email" name="email" type="email" placeholder="name@email.com" autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="w-vehicle">Vehicle</label>
              <input id="w-vehicle" name="vehicle" type="text" placeholder="Year, make, model and trim" />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="w-construction">Construction</label>
              <select id="w-construction" name="construction" defaultValue="">
                <option value="" disabled>Select a type</option>
                {wheelPrograms.map((program) => (
                  <option key={program.slug} value={program.name}>
                    {program.name}
                  </option>
                ))}
                <option>Not sure, recommend something</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="w-diameter">Diameter</label>
              <select id="w-diameter" name="diameter" defaultValue="">
                <option value="" disabled>Select a size</option>
                <option>18 inch</option>
                <option>19 inch</option>
                <option>20 inch</option>
                <option>21 inch</option>
                <option>22 inch</option>
                <option>24 inch</option>
                <option>26 inch and above</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="w-current">What is on the vehicle now</label>
              <input id="w-current" name="current" type="text" placeholder="Factory wheels, or current size and brand" />
            </div>
            <div className="field">
              <label htmlFor="w-suspension">Suspension changes planned?</label>
              <select id="w-suspension" name="suspension" defaultValue="">
                <option value="" disabled>Select one</option>
                <option>No, keeping factory ride height</option>
                <option>Yes, lift or leveling kit</option>
                <option>Yes, lowering or coilovers</option>
                <option>Yes, air suspension</option>
                <option>Already modified</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="w-notes">Finish, style or anything else</label>
            <textarea
              id="w-notes"
              name="notes"
              placeholder="Gloss black, brushed, a specific look you have seen, or how the vehicle gets used."
            />
          </div>

          <FormPending label="Request Fitment Options" />
        </Reveal>
      </div>
    </section>
  );
}
