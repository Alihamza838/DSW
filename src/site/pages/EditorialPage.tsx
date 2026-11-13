import { Link } from "react-router-dom";
import StaticShell from "../StaticShell";

export function Component() {
  return (
    <StaticShell
      title="How we check return policies"
      seoTitle="How We Check Store Return Policies"
      description="Our method: every store policy is read from the retailer's official pages, dated and rewritten when it changes, plus what we leave out and how to report errors."
      path="/editorial-policy"
    >
      <h2>Only official sources</h2>
      <p>
        Store facts come from the retailer's own website: its returns policy, help centre or terms. We don't copy other return-policy websites, forum posts or social
        media, because they are often out of date.
      </p>
      <h2>Every page is dated</h2>
      <p>
        Each store page shows the date we last checked the official page, and links to it. When we re-check a store we update that date even if nothing changed.
      </p>
      <h2>No guessing</h2>
      <p>
        If the official pages disagree with each other, or don't state a detail (for example a fee or a member-only window), we write that down under "Not confirmed"
        instead of filling the gap. We would rather say less than say something wrong.
      </p>
      <h2>Simple language</h2>
      <p>
        We write for someone standing at the returns desk: the answer first, then the exceptions, then the steps. Legal wording is translated into everyday words.
      </p>
      <h2>Corrections</h2>
      <p>
        Policies change, sometimes without notice. If you see a difference between a page and the store's official policy, please <Link to="/contact/">tell us</Link>.
        We check every report against the official source and update the page.
      </p>
      <h2>Independence</h2>
      <p>
        We are not affiliated with any store and are not paid by stores. If we ever show advertising or affiliate links, they will be labelled and will never change
        how a policy is described.
      </p>
    </StaticShell>
  );
}
