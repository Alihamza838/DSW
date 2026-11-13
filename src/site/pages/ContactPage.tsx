import StaticShell from "../StaticShell";
import { CONTACT_EMAIL } from "../config";

export function Component() {
  return (
    <StaticShell
      title="Contact & corrections"
      seoTitle="Contact DSWReturnRefund & Report a Policy Change"
      description="Report a store policy change or a mistake, suggest a store to cover, or ask a question about DSWReturnRefund. We check every report against the official source."
      path="/contact"
    >
      <p>
        Email: <a href={`mailto:${CONTACT_EMAIL}?subject=DSWReturnRefund`}>{CONTACT_EMAIL}</a>
      </p>
      <h2>Reporting a policy change</h2>
      <p>Please include the store, the page on our site, and a link to the store's official page that shows the new rule. We check it and update the page.</p>
      <h2>We are not the store</h2>
      <p>
        We can't process returns, refunds or complaints for any retailer, and we can't see your orders. For help with a specific purchase, contact the store directly
        using the official link on its page.
      </p>
    </StaticShell>
  );
}
