import StaticShell from "../StaticShell";
import { CONTACT_EMAIL } from "../config";

export function Component() {
  return (
    <StaticShell
      title="Privacy policy"
      seoTitle="Privacy Policy"
      description="DSWReturnRefund does not use accounts, analytics trackers or advertising cookies. What our hosting provider logs, and how to contact us about your data."
      path="/privacy"
    >
      <p>Last updated: November 13, 2026.</p>
      <h2>What we collect</h2>
      <p>
        Nothing you type on this site is sent to us. The store search, filters, comparison tool and return deadline calculator all run in your browser. We do not use
        accounts, analytics trackers or advertising cookies.
      </p>
      <h2>Hosting</h2>
      <p>
        The site is hosted by Vercel. Like any web host, Vercel processes standard request data (such as IP address and browser type) to deliver pages and keep the
        service secure. See Vercel's privacy policy for details.
      </p>
      <h2>Email</h2>
      <p>If you email us, we use your message and address only to reply and to check the policy change you reported.</p>
      <h2>Links to stores</h2>
      <p>Store pages link to retailers' official websites. Their privacy policies apply once you leave this site.</p>
      <h2>Changes</h2>
      <p>If we add analytics or advertising in the future, we will update this page before doing so.</p>
      <h2>Contact</h2>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </StaticShell>
  );
}
