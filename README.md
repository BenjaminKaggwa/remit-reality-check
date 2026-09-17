Remit Reality Check

A small tool that shows what actually lands in your recipient's account when you send money abroad — not the advertised fee, the real cost once the exchange-rate markup is included.

Live demo: add your GitHub Pages URL here

Why this exists

Money transfer providers advertise their cost in one place — a flat fee, or a percentage — and hide a second cost inside the exchange rate they give you. A provider can advertise "no fees" and still be the most expensive option on the list, because the markup on the rate does the work the fee isn't allowed to.

This tool compares five providers on a MYR → KES transfer and ranks them by true cost: what you'd have received at the real mid-market rate, minus what you actually receive, as a percentage.

How it works
Enter an amount in MYR.
For each provider, the app calculates:
Total fee — flat fee plus a percentage fee on the amount sent
Effective rate — the real mid-market rate, minus that provider's margin
Amount received — the leftover after fees, converted at the provider's real (marked-up) rate
True cost % — the gap between what you'd get at the fair rate and what you actually get
Providers are sorted cheapest-to-most-expensive by true cost, and re-render live as you type.

No frameworks, no build step, no backend — plain HTML, CSS-free, and vanilla JavaScript, on purpose. This was the first project of a structured relearning of the JavaScript fundamentals before touching any framework.

Tech
HTML
JavaScript (ES6+) — no libraries
Intl.NumberFormat for currency display
Data

Provider fee structures and FX margins are illustrative and hardcoded in app.js — pulled from each provider's own published send-money calculator at the time of writing, for a MYR → KES corridor. They are not live and will drift out of date; this is a demonstration of the comparison logic, not a financial tool.

Known limitations
At very small amounts, a provider's flat fee can exceed the amount being sent, which would produce a negative "amount received." (Note whether you added a guard for this — if so, describe it here; if not, remove this bullet or note it as a planned fix.)
Provider data is static and manually maintained — a real version would pull live rates from each provider's API.
Only one currency corridor (MYR → KES) is supported.
Running it locally

No build step required.

bash
git clone https://github.com/<your-username>/remit-reality-check.git
cd remit-reality-check

Open index.html directly in a browser, or serve it with any static server (e.g. the VS Code Live Server extension).

What I'd do differently next time
Add input validation and the small-amount edge case at the start, not after building the render logic.
Pull real-time exchange rates via a free FX API instead of a hardcoded MID_MARKET constant.
Add a currency/corridor selector instead of a single fixed pair.
About

Built as Week 1 of a self-directed 22-week plan to properly learn JavaScript, TypeScript, React, and full-stack web development from first principles, after previously relying on AI-assisted ("vibe-coded") builds without understanding the underlying mechanics.
