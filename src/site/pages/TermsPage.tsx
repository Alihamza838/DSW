import StaticShell from "../StaticShell";

export function Component() {
  return (
    <StaticShell
      title="Terms of use"
      seoTitle="Terms of Use"
      description="The terms for using DSWReturnRefund: information is provided as a guide only, the store's official policy applies, and how you may use the content."
      path="/terms"
    >
      <p>Last updated: November 13, 2026.</p>
      <h2>A guide, not the official policy</h2>
      <p>
        Content on DSWReturnRefund is general information about store return policies. It is provided as is, without warranty, and may be out of date. Always check
        the retailer's official policy before relying on it.
      </p>
      <h2>No liability</h2>
      <p>
        We are not responsible for decisions made using this site, including refused returns or missed deadlines. Your agreement about a purchase is with the store.
      </p>
      <h2>Using our content</h2>
      <p>You may link to any page. Please don't republish our summaries in bulk without permission.</p>
      <h2>Trademarks</h2>
      <p>Store names and trademarks belong to their owners. Their use here does not imply any affiliation or endorsement.</p>
    </StaticShell>
  );
}
