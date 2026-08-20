import * as React from "react";
import { ShieldCheck, BookOpen, Scale, Store, Globe } from "lucide-react";
import { Link } from "../ui/Link";
import { BrandLogo } from "../ui/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0B131E] text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Brand Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 mb-10 border-b border-slate-800">
          <div className="space-y-2 max-w-xl">
            <Link href="/" aria-label="dswReturnRefund Home" className="inline-block">
              <BrandLogo variant="light" size="md" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              dswReturnRefund is an independent consumer resource providing verified, transparent policy breakdowns, receipt lookup hacks, worn item condition limits, and return shipping fee evaluations for 2026.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/60 border border-red-800/60 px-3.5 py-2 rounded-xl font-mono">
              <ShieldCheck className="h-4 w-4 text-red-500 shrink-0" />
              <span>Independent 2026 Consumer Audit Desk</span>
            </div>
            <Link
              href="/compare"
              className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-all shadow-2xs inline-flex items-center gap-1.5"
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Compare Stores Tool</span>
            </Link>
          </div>
        </div>

        {/* Organized 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: DSW Primary Niche Hub */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-red-400 tracking-wider">
              <BookOpen className="h-3.5 w-3.5 text-red-500" />
              <span>DSW Policy Hub</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors font-bold text-red-400">
                  DSW Master Audit Guide (2026)
                </Link>
              </li>
              <li>
                <Link href="/blog/dsw-vip-rewards-return-policy-perks-guide" className="hover:text-red-400 transition-colors font-semibold text-slate-200">
                  DSW VIP 90-Day & Points Perks
                </Link>
              </li>
              <li>
                <Link href="/blog/dsw-in-store-exchanges-and-clearance-rack-returns-guide" className="hover:text-red-400 transition-colors">
                  In-Store & Clearance Rules
                </Link>
              </li>
              <li>
                <Link href="/blog/dsw-shoes-return-policy" className="hover:text-red-400 transition-colors">
                  Worn Shoes Acceptance Rules
                </Link>
              </li>
              <li>
                <Link href="/blog/dsw-return-policy-without-receipt" className="hover:text-red-400 transition-colors">
                  Lost Receipt Lookup Hacks
                </Link>
              </li>
              <li>
                <Link href="/blog/dsw-online-return-policy" className="hover:text-red-400 transition-colors">
                  Online Mail Fee Waiver Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Footwear & Apparel */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
              Footwear & Fashion
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/stores/nike" className="hover:text-red-400 transition-colors">Nike (60 Days)</Link></li>
              <li><Link href="/stores/foot-locker" className="hover:text-red-400 transition-colors">Foot Locker (45 Days)</Link></li>
              <li><Link href="/stores/adidas" className="hover:text-red-400 transition-colors">Adidas (30 Days)</Link></li>
              <li><Link href="/stores/nordstrom" className="hover:text-red-400 transition-colors">Nordstrom (Case-by-Case)</Link></li>
              <li><Link href="/stores/lululemon" className="hover:text-red-400 transition-colors">Lululemon Quality Promise</Link></li>
              <li><Link href="/stores/zara" className="hover:text-red-400 transition-colors">Zara ($3.95 Return Fee)</Link></li>
              <li><Link href="/stores/hm" className="hover:text-red-400 transition-colors">H&M (30 Days)</Link></li>
              <li><Link href="/stores/tj-maxx" className="hover:text-red-400 transition-colors">TJ Maxx & Marshalls</Link></li>
              <li><Link href="/stores/old-navy" className="hover:text-red-400 transition-colors">Old Navy & Gap</Link></li>
            </ul>
          </div>

          {/* Col 3: Big Box & Electronics */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
              Big Box & Tech
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/stores/apple" className="hover:text-red-400 transition-colors">Apple Store (14 Days)</Link></li>
              <li><Link href="/stores/target" className="hover:text-red-400 transition-colors">Target (90 Days / Cat & Jack)</Link></li>
              <li><Link href="/stores/walmart" className="hover:text-red-400 transition-colors">Walmart (90 Days)</Link></li>
              <li><Link href="/stores/costco" className="hover:text-red-400 transition-colors">Costco (90-Day Tech)</Link></li>
              <li><Link href="/stores/amazon" className="hover:text-red-400 transition-colors">Amazon (30-Day Drop Off)</Link></li>
              <li><Link href="/stores/best-buy" className="hover:text-red-400 transition-colors">Best Buy Open Box</Link></li>
              <li><Link href="/stores/ikea" className="hover:text-red-400 transition-colors">IKEA (365 Days)</Link></li>
              <li><Link href="/stores/sephora" className="hover:text-red-400 transition-colors">Sephora Beauty Insider</Link></li>
              <li><Link href="/stores/home-depot" className="hover:text-red-400 transition-colors">Home Depot (90 Days)</Link></li>
            </ul>
          </div>

          {/* Col 4: Global & Marketplaces */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
              Global E-Commerce
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/stores/shein" className="hover:text-red-400 transition-colors">SHEIN (35 Days)</Link></li>
              <li><Link href="/stores/temu" className="hover:text-red-400 transition-colors">Temu (90 Days Free)</Link></li>
              <li><Link href="/stores/ebay" className="hover:text-red-400 transition-colors">eBay Money Back Guarantee</Link></li>
              <li><Link href="/stores/etsy" className="hover:text-red-400 transition-colors">Etsy Seller Protection</Link></li>
              <li><Link href="/stores/aliexpress" className="hover:text-red-400 transition-colors">AliExpress Choice 15-Day</Link></li>
              <li><Link href="/stores/daraz" className="hover:text-red-400 transition-colors">Daraz PK Doorstep</Link></li>
              <li><Link href="/stores/flipkart" className="hover:text-red-400 transition-colors">Flipkart India (7 Days)</Link></li>
              <li><Link href="/stores/noon" className="hover:text-red-400 transition-colors">Noon UAE & KSA</Link></li>
              <li><Link href="/stores/capcut-pro" className="hover:text-red-400 transition-colors">CapCut Pro Subscriptions</Link></li>
            </ul>
          </div>

          {/* Col 5: Tools & Governance */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
              Directory & Legal
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/stores" className="hover:text-red-400 transition-colors font-semibold text-slate-300">All 44 Stores Directory</Link></li>
              <li><Link href="/compare" className="hover:text-red-400 transition-colors font-semibold text-slate-300">Compare Matrix Engine</Link></li>
              <li><Link href="/blog" className="hover:text-red-400 transition-colors font-semibold text-slate-300">Consumer Guides Hub</Link></li>
              <li><Link href="/about" className="hover:text-red-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-red-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-red-400 transition-colors">Editorial Verification</Link></li>
              <li><Link href="/disclaimer" className="hover:text-red-400 transition-colors">Legal Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-red-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-red-400 transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Country Quick Links Row */}
        <div className="pt-6 border-t border-slate-800/80 mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-red-500" />
            <span>Regional Desks:</span>
          </span>
          <Link href="/stores?c=US" className="hover:text-red-400 transition-colors">🇺🇸 United States</Link>
          <Link href="/stores?c=CA" className="hover:text-red-400 transition-colors">🇨🇦 Canada</Link>
          <Link href="/stores?c=UK" className="hover:text-red-400 transition-colors">🇬🇧 United Kingdom</Link>
          <Link href="/stores?c=IN" className="hover:text-red-400 transition-colors">🇮🇳 India</Link>
          <Link href="/stores?c=PK" className="hover:text-red-400 transition-colors">🇵🇰 Pakistan</Link>
          <Link href="/stores?c=AE" className="hover:text-red-400 transition-colors">🇦🇪 United Arab Emirates</Link>
        </div>

        {/* Disclaimer Note & Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-4">
          <p className="leading-relaxed text-[11px]">
            <strong>Disclaimer:</strong> dswReturnRefund is an independent consumer guide and is not affiliated, endorsed, or sponsored by Designer Shoe Warehouse (DSW), Designer Brands Inc., or any other third-party retailer mentioned herein. All trademarks, logos, and brand names belong to their respective owners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 font-mono text-[11px]">
            <div>
              © 2026 dswReturnRefund. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-slate-300">Privacy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-slate-300">Terms</Link>
              <span>•</span>
              <Link href="/editorial-policy" className="hover:text-slate-300">Editorial</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

