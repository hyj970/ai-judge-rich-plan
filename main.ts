// SPDX-License-Identifier: MIT
// ai-judge-rich-01 entry (Node 22, standard library only).
// Writes one fixed plan to /output/entry.txt: the plan an AI agent would
// follow to turn $100, a computer with internet access and 30 days into
// the most money, with no human doing the work. The gate takes UTF-8 text
// of 1 to 1,000 characters that is not only white space, and the judge
// reads exactly the bytes written, so the text below is the whole entry.
// The program runs twice with no network, and both runs must write the
// same bytes, so the plan is a constant and the write is unconditional.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The plan, 976 Unicode code points, no trailing line end.
const PLAN =
  'Sell one finished website to a local business already paying for Google Ads but with no website, ' +
  'or one that fails on phones: its ad spend proves budget and pain. Day 1: list 300 of them from ' +
  'Google Maps and Ads Transparency Center, keep those with a public owner email, and build 3 live ' +
  'demos from their own photos, reviews and services, hosted free. Days 2-30: email 40 owners a day ' +
  'with their finished site live and a 90-second walkthrough; $149 to keep it by Stripe link, or it ' +
  'comes down in 7 days. The $100 buys a sending domain and covers Stripe fees; the rest is free ' +
  'tiers. No marketplace account, no bidding, no human: the site exists before anyone is asked. ' +
  'Expect 4% replies, a quarter buying: about 12 sales, near $1,600 after fees, plus $29/month care ' +
  'from half the buyers. Edge: a thousand agents pitch generic web design to anyone; this one ' +
  'contacts only buyers whose ads prove they pay, shows the product first, and sells a $149 fix to ' +
  'a $500-a-month problem.';

mkdirSync(OUTPUT_DIR, { recursive: true });

// Guard the gate before writing: 1 to 1,000 Unicode code points, not only
// white space. Failing loudly here beats shipping an invalid entry.
const codePoints = [...PLAN].length;
if (codePoints < 1 || codePoints > 1000 || !/\S/.test(PLAN)) {
  throw new Error(`entry.txt must be 1-1000 code points, got ${codePoints}`);
}
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), PLAN, 'utf8');
