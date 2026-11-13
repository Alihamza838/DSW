import { Link } from "react-router-dom";
import StaticShell from "../StaticShell";
import { POLICIES } from "../../data/policies";
import { AUTHORS, CONTACT_EMAIL } from "../config";

export function Component() {
  return (
    <StaticShell
      title="About DSWReturnRefund"
      seoTitle="About DSWReturnRefund: Who Checks the Policies"
      description="Who runs DSWReturnRefund, how every store policy is checked against the retailer's own site, and why the site is independent of DSW and other stores."
      path="/about"
    >
      <p>
        DSWReturnRefund explains store return policies in plain English. It started with DSW (Designer Shoe Warehouse) and now covers {POLICIES.length} stores in the
        United States, Canada, the UK, Australia, the UAE, Pakistan and India.
      </p>
      <h2>Independent, not affiliated</h2>
      <p>
        We are not part of DSW or any retailer, and no store pays to be listed or to be described in a certain way. Store names are used only to say whose policy a
        page describes. Each store page links to the store's own official policy, which always has the final word.
      </p>
      <h2>Who writes the pages</h2>
      {Object.values(AUTHORS).map((a) => (
        <p key={a.id}>
          <strong>
            {a.name}, {a.role.toLowerCase()}.
          </strong>{" "}
          {a.bio}
        </p>
      ))}
      <h2>How we check a policy</h2>
      <p>
        For every store we read the retailer's own returns or help pages, note the window, receipt rules, fees, exceptions and any holiday changes, and write them up
        with the date we checked. If an official page doesn't confirm something, we say so on the page instead of guessing. Read the full method on{" "}
        <Link to="/editorial-policy/">how we check policies</Link>.
      </p>
      <h2>Contact</h2>
      <p>
        Found a change or a mistake? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the <Link to="/contact/">contact page</Link>.
      </p>
    </StaticShell>
  );
}
