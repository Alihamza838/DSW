import StaticShell from "../StaticShell";

export function Component() {
  return (
    <StaticShell
      title="Disclaimer"
      seoTitle="Disclaimer: Independent Guide, Not the Store"
      description="DSWReturnRefund is an independent guide, not affiliated with DSW or any retailer. Summaries can be out of date; the store's official policy always applies."
      path="/disclaimer"
    >
      <p>
        DSWReturnRefund is an independent information site. It is not affiliated with, endorsed by or sponsored by DSW Designer Shoe Warehouse, Designer Brands Inc.
        or any other retailer mentioned. All store names and trademarks belong to their owners and are used only to identify whose policy is described.
      </p>
      <p>
        The summaries are written carefully from each store's official pages and dated, but stores can change their policies at any time, and rules can differ by
        location, product or promotion. The retailer's official policy and your receipt always take precedence over anything on this site.
      </p>
      <p>
        Nothing here is legal advice. For consumer rights questions, contact your local consumer protection authority.
      </p>
    </StaticShell>
  );
}
