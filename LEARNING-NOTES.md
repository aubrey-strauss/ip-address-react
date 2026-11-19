# Learning Notes: IP Address Tracker (React)

A running log kept while I built this project: every new term I asked about, every mistake I made and how I fixed it, and the decisions behind the code. I typed and debugged the code myself, working step by step with an AI tutor (Claude). The tutor wrote these notes down from my questions as we went.

- **Live site:** https://ip-address-react.netlify.app
- **Repo:** https://github.com/aubrey-strauss/ip-address-react

## Results

- **Lighthouse Accessibility: 100** (desktop)
- **Deployed on Netlify**, auto-redeploys on every push to `main`
- **Tested on a real iPhone 13 Pro Max**, not just DevTools, and fixed what I found there

## Tools I learned about

- **Lighthouse** (built into Chrome and Edge DevTools): a free checker that scores a page 0–100 and lists exactly what to fix, in categories like Accessibility, Best Practices, SEO, and Performance. Named after a real lighthouse: it shines a light on problems. How to run it: F12 → **Lighthouse** tab (look under **»** if hidden) → check the categories → Device: Desktop or Mobile → **Analyze page load**. Performance scores on `localhost` are always low because the dev server isn't optimized, so check Performance on the deployed site instead.
- **DevTools device toolbar**: F12, then Ctrl + Shift + M, previews the site at phone/tablet sizes. Good for layout, but it can't show real-phone bugs like Safari drawing glitches, so test on the real phone too.
- **Windows Narrator** (built-in screen reader): Ctrl + Win + Enter turns it on/off, to hear what screen-reader users hear.
- **Netlify**: free website host. Connects to GitHub ("Import from Git"), runs `npm run build`, publishes `dist`, and redeploys on every push. Secrets go in its environment variables (`VITE_IPIFY_KEY`).

## Terms (plain words + why it's called that)

- **Vite**: the tool that builds and runs a React project on your computer. It's French for "fast," because it starts up quickly.
- **Template (react-ts)**: a ready-made starter project. "ts" = TypeScript.
- **Dev server**: a mini website running only on your computer while you build ("dev" = development). `npm run dev` starts it.
- **localhost vs the live site**: `localhost:5173` = my laptop's copy, updates instantly. The Netlify site updates only after `git push` + Netlify finishes (~1 min). Phones may cache the old version: close the tab and reopen.
- **Build / `npm run build` / `dist`**: turns TypeScript + React into plain, compressed HTML/CSS/JS any host can serve, and runs a stricter TypeScript check than the dev server. The output goes in `dist` ("distribution," the finished files you hand out).
- **node_modules**: the folder of downloaded packages ("modules" = code pieces) your project uses. Never commit it; anyone can re-download it with `npm install`.
- **Remote / origin**: "remote" = a copy of your repo that lives somewhere else (GitHub). "origin" is just the nickname Git gives the main remote.
- **`-u` (upstream)**: links your local branch to the GitHub branch so later you can type plain `git push`.
- **Commit vs push**: commit = save a snapshot on your laptop; push = upload your commits to GitHub. ("Push" out to the remote; the opposite is "pull" in.)
- **`&&` in the terminal**: "if that worked, run the next one" (e.g. `git add . && git commit -m "..." && git push`).
- **`git rm`**: deletes a file and tells Git it's gone, in one step.
- **`git ls-files <name>`**: shows whether Git is tracking a file.
- **WIP**: "work in progress," used in commit messages when you stop mid-step.
- **API key**: like a library card. It tells the API who's asking. Keep it private.
- **Credits (IPify)**: how the API charges per lookup. Country = 1 credit, Country + City = 2. I used Country + City because only it gives lat/lng for the map.
- **Environment variable / `.env.local`**: a setting kept outside your code ("environment" = where the app runs). `.local` = only on this computer, and Git ignores it. Vite only exposes variables starting with `VITE_`, read with `import.meta.env.VITE_...`. Restart the dev server after changing it. The file holds only `NAME=value`, not a URL.
- **Dependency vs dev dependency (`-D`)**: dependencies ship with the site (leaflet); dev dependencies are only for building (`@types/leaflet`).
- **`@types/...` packages**: type blueprints for libraries written in plain JavaScript, so TypeScript understands them.
- **Leaflet / react-leaflet**: Leaflet draws the map; react-leaflet wraps it in React components (`MapContainer`, `TileLayer`, `Marker`, `ZoomControl`). A leaflet = a small folded map.
- **Tiles**: maps are built from small square images, like floor tiles. Ours come free from OpenStreetMap, which must be credited (attribution).
- **`L.icon` / iconAnchor**: makes a custom marker; the anchor is the pixel that touches the location (bottom-center so the pin's tip points at it).
- **`useMap` / `flyTo`**: react-leaflet hook that grabs the live map (only works inside `<MapContainer>`); `flyTo` glides the map to a new spot. A helper component that returns `null` draws nothing, it just steers.
- **`scrollWheelZoom={false}` / `ZoomControl`**: stops the map from grabbing the mouse wheel (so the page scrolls normally); `<ZoomControl position="bottomleft" />` puts +/– buttons in a clear corner.
- **a11y**: short for "accessibility" (an "a," 11 letters, then a "y").
- **`aria-live="polite"`**: marks an area that changes; screen readers read the new content automatically, waiting until they finish their current sentence. Used on the results card.
- **`role="status"` vs `role="alert"`**: status announces gently (the "Looking up…" message); alert interrupts right away (errors).
- **Component**: a function that returns what shows on screen. `App` is the root component that holds everything.
- **JSX**: HTML-looking code inside JavaScript (JavaScript + XML). React turns it into real HTML.
- **JSX comments**: `{/* like this */}` inside the return; `//` for normal code lines. HTML `<!-- -->` comments don't work in JSX. Ctrl + / picks the right style automatically.
- **Fragment `<> </>`**: an invisible wrapper so a component can return several things without an extra div.
- **Props** ("properties"): settings you pass into a component, like attributes on an HTML tag.
- **children**: whatever you put between a component's opening and closing tags. It's nested inside, like a child.
- **Composition**: building bigger components by nesting smaller ones (InfoPanel wraps InfoItems).
- **Hook / useState**: built-in React tools that "hook into" React features; they always start with `use`. `useState` lets a component remember a value.
- **Custom hook**: your own `use...` function that bundles state + effects so components can reuse the logic (`useIpLookup`, `useIpContext`).
- **Context**: a shared "bulletin board" any component inside the Provider can read, instead of passing props hand to hand. **Prop drilling** = passing props down through many layers (what Context avoids). **Provider** = the component that fills the board (`IpProvider`).
- **StrictMode / Provider nesting**: layers like nesting boxes: `<StrictMode>` (React's safety checker) → `<IpProvider>` (shared data) → `<App />`.
- **Refactoring**: changing how code is organized without changing what it does.
- **useEffect / side effect**: code that runs after the screen draws, for things outside drawing (like fetching data).
- **Dependency array `[query]`**: tells useEffect to re-run only when those values change; prevents endless loops.
- **Cleanup function**: what useEffect returns; React runs it before the next effect or when the component goes away.
- **AbortController / signal**: a "stop button" for a fetch. Like cancelling a food delivery order: the signal is the order number you give the restaurant (fetch); `abort()` cancels it. `AbortError` is the "order cancelled" notice, not a real error.
- **StrictMode double-run**: in development, React runs effects twice on purpose to catch bugs; the abort cleanup cancels the extra request. Production runs once.
- **async / await / Promise**: `async` = a function that waits on something slow; `await` = pause here until it's done; a Promise = an IOU for a value that arrives later. `.then` = on success, `.catch` = on failure, `.finally` = either way.
- **fetch / response.ok / throw**: fetch sends the request; `response.ok` is false for errors; `throw` stops the function and reports the problem.
- **URLSearchParams**: builds the `?key=value&...` part of a URL safely (special characters get coded, e.g. `&` → `%26`, `=` → `%3D`).
- **Regex** (regular expression): a pattern matcher. `/^[\d.]+$/` = only digits and dots (an IPv4 address).
- **Validation**: checking input before using it (saves API credits). `aria-invalid` tells screen readers a field has a problem.
- **HTTP status codes**: 200 = OK; 401/403 = key not accepted ("Forbidden"); 422 = bad search text; 429 = out of credits.
- **`Record<number, string>`**: a lookup table type (number keys → text values). Used for friendly error messages.
- **`??` (nullish operator)**: "if the left side is nothing, use this backup."
- **Array / `IpData[]`**: a list. `.map` turns each item into something (like a `<li>`); `.filter` keeps only items that pass a test; `.slice(0, 5)` keeps the first 5; `...` (spread) pours items into a new list.
- **Immutability**: never change the old list/object; build a new one (`[data, ...prev]`). React only notices changes when it gets a _new_ value.
- **`key`**: a name tag React uses to tell items apart. In lists, use something unique and unchanging (the IP), not the index. Changing a component's `key` (e.g. `<InfoPanel key={data.ip}>`) makes React build a brand-new one, a **remount**.
- **Conditional rendering**: `{data && (...)}` = only show this when data exists.
- **Controlled input**: a text box whose contents are controlled by React state (`value` + `onChange`).
- **Template string**: text in backticks; `${ }` drops values in (`${city}, ${region}`).
- **Inline style `style={{ }}`**: outer braces = "JavaScript here," inner braces = an object of CSS properties.
- **Type (TypeScript)**: a blueprint listing an object's fields and what kind each is (`string`, `number`). `IpData | null` = "either IpData or nothing."
- **Named vs default export**: `export default X` → `import X from`; `export function X` → `import { X } from` (curly braces).
- **`./` vs `../`**: `./` = this same folder; `../` = go up one folder first.
- **`import type`**: imports something only for TypeScript checking, not for running the app.
- **`public` folder**: files served exactly as they are, reachable at `/filename` from anywhere in the app.
- **className / htmlFor**: React's versions of `class` / `for`, because those words already mean something in JavaScript.
- **.ts vs .tsx**: .tsx files contain JSX (things on screen); .ts files are plain logic.
- **Media query**: a CSS block (`@media (max-width: 768px) { ... }`) whose rules only apply on certain screen sizes. It only lists what _changes_; everything else carries over from the desktop rule.
- **CSS grid / `1fr 1fr`**: grid lays things out in rows and columns, like a spreadsheet. `1fr 1fr` = two equal columns ("fr" = fraction of the space). Used for the 2×2 mobile card.
- **`::placeholder` / pseudo-element**: styles just the gray hint text in an input. `::` marks a pseudo-element, a part you can style without a real tag ("pseudo" = fake).
- **iPhone 16px rule**: iPhones auto-zoom into text boxes with font smaller than 16px, so keep input text ≥ 16px and shrink only the placeholder.
- **`transform: translateZ(0)` / layers**: moves an element 0px toward the viewer (no visible change) but makes the browser draw it on its own layer, like a separate sheet of glass. A common fix for Safari drawing glitches.
- **Pill button**: a button with fully rounded ends, shaped like a capsule. Made with `border-radius: 999px`.
- **`:focus-visible`**: styles an element when a keyboard user Tabs to it, so keyboard users get the same highlight as mouse hover.
- **`A + B` (adjacent sibling combinator)**: "a B that comes right after an A." `.result + .result` puts dividers between boxes but not before the first.

## What tripped me up (and how I fixed it)

- Choosing between the Country and Country + City API. Only Country + City returns latitude/longitude, which the map needs.
- Image paths changed when moving to React: `./images/...` in CSS now points inside `src/`. Images in `public/` need `/images/...`.
- Flexbox text inputs have a hidden minimum width, which can push the button off-screen on phones. Fix: `min-width: 0`.
- JSX error "unexpected >": I'd left off the opening `<` on `<InfoItem`. Errors often point to where the code stopped making sense, not where the mistake is.
- **Security slip:** I saved my API key in a `.md` file inside the project and pushed it to public GitHub. Fix: reset the key, `git rm` the file, and keep keys only in `.env.local` (ignored by Git). Deleting a file doesn't remove it from old commits; resetting the key makes the leaked copy useless.
- **CSS braces:** I put new rules _inside_ another rule's `{ }`, so nothing matched. Then the media query's `}` was in the wrong place twice: too early (phone styles applied on desktop) and then too late (footer + hidden-label styles became phone-only). Rule: a media query wraps only the rules that change on phones.
- **"Key missing" / 403 Forbidden:** I pasted the whole IPify URL into `.env.local` instead of just `VITE_IPIFY_KEY=at_...`, and wrote `Vite_IPIFY_KEY` instead of `VITE_IPIFY_KEY` (case-sensitive). The error URL showed the leftover text as `%26ipAddress%3D8.8.8.8`, which is how I found it.
- Import path in `api/fetchIpData.ts` needed `../types/ipData`, not `./types/ipData`.
- The map's `center` prop only applies on the first draw, so new searches didn't move the map; needed a `useMap` + `flyTo` helper.
- Pasting chunks of code in the wrong spots (a helper function twice, `return null;` inside a JSX tag, missing `>` / `<>` / `}`). Fix: when a file gets tangled, compare against a clean version.
- Thought `<IpProvider>` replaced `<StrictMode>`; they nest.
- Recent searches: forgot to add `history` to the Provider's `value`; imported React's `useContext` instead of my `useIpContext`; left off `export default`.
- **Mobile:** the map grabbed the scroll on phones, so users couldn't get past it. Fix: `scrollWheelZoom={false}` plus zoom buttons in a clear corner.
- **Netlify private by default:** the live site worked on my laptop (logged in) but my phone asked me to sign in. Fixed by setting Production visibility to **Public**.
- **"Powered by Netlify" badge covered the + zoom button.** Moved the zoom buttons to `bottomleft`.
- **Real-iPhone layout problems** that looked fine in DevTools: big gap under the search bar, the card took up most of the screen, the pin hid under the card, the map was short. Fixes: banner fits its content, card as a **2×2 grid** with smaller text, map 420px on phones. (Tried moving recents above the map with flexbox `order` first, but that left white space behind the card.)
- **An accidental delete wiped my desktop `.hero` styles**, so the title sat in the top-left corner. Restored the original rule.
- **Search placeholder cut off on phones.** Shrank only the placeholder and kept typed text at 16px.
- **Garbled card text on iPhone Safari:** after tapping a recent search, old and new values printed on top of each other. Not a data bug: Safari doesn't fully redraw things floating over the map while it animates. `transform: translateZ(0)` alone wasn't enough; `<InfoPanel key={data.ip}>` (a fresh card per IP) fixed it.
- One line of code at a time made me lose track of closing brackets, so I switched to small 3–8 line chunks that include their closers.

## Reused from my earlier (vanilla JS) version of this project

- Most of the CSS (reset, hero, search bar, results card, error message, 768px breakpoint, z-index above Leaflet)
- Replaced divider divs with a CSS `.result + .result` border
- Images, favicon, location icon

## Design decisions

- Built the layout with fake data first, shaped exactly like IPify's response, so swapping in real data needed no component changes.
- Split data logic: `api/fetchIpData.ts` (talks to IPify) → `hooks/useIpLookup.ts` (state + effect + loading/error) → `context/IpContext.tsx` (shares results app-wide) → components (just display).
- AbortController cleanup cancels outdated/duplicate requests (saves credits, avoids out-of-order results).
- Search input is validated before any API call.
- Recent searches: last 5 unique lookups, newest first, updated immutably, keyed by IP. Added beyond the original design to practice lists with stable keys; its colors and widths reuse the design's style guide.
- The API key is hidden from GitHub, but in a front-end-only app it's still visible in the browser once deployed. Fine for a class project; a real app would use a small server.

## Time log (active work only; breaks of 5+ minutes not counted)

- ~5h (setup, layout components, API key troubles, custom hook)
- ~3h20m (real data on screen, loading/errors, map + marker)
- ~2h15m (map fly-to, validation, Context)
- ~30m (recent searches)
- ~3h45m (styling, responsive + accessibility checks, deploy, real-iPhone fixes, README)
- - **Total: about 14 hours 50 minutes**
