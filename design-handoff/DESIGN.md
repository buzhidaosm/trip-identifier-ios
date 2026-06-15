# Tomato Design System Draft

This file is the portable design brief for Stitch, Figma, and implementation agents.

## Product

Tomato is a driver income assistant for rideshare or delivery workers. It helps drivers track net income, operating cost, shift status, and whether a trip helps them reach their target.

## Screen Inventory

### Onboarding

Purpose:

- Introduce Tomato as a login-free driver income assistant.
- Explain offer recognition without promising guaranteed earnings.
- Demonstrate the core value moment with a dynamic offer notification, not a static in-app screenshot.
- Prepare users for notification and offer-recognition permissions before the first shift.

Recommended first-run flow:

1. `Onboarding.Welcome`: First launch screen with the primary slogan, Tomato branding, and login-free value proposition.
2. `Onboarding.HowItWorks`: Three-step explanation: detect the offer, estimate real value, notify in time.
3. `Onboarding.TryOffer`: Interactive offer demo. Entering this step should start a simulated or real recognition event, display a time-sensitive notification, and allow `Try another offer`.
4. `Onboarding.Ready`: Permission readiness and goal setup before entering the app.

Primary English copy:

- Slogan: `Drive Less, Earn More!`
- Support copy: `Tomato helps you spot stronger rideshare offers before you accept them.`
- No-login value prop: `No account required. Start without email, password, or platform login.`
- Demo explainer: `Tomato starts offer recognition, then displays a notification instead of a static in-app image.`

Simplified Chinese copy direction:

- Slogan adaptation: `少跑冤枉路，多留净收入。`
- Support copy: `Tomato 帮你在接单前快速识别更值得跑的订单。`
- No-login value prop: `无需账号。无需邮箱、密码或平台登录即可开始。`

Copy rules:

- Use `helps`, `estimates`, `classifies`, and `recommendation`.
- Avoid guaranteed earnings claims such as `you will earn more`.
- Keep the slogan strong, but make the supporting copy precise and defensible.
- Default language is English; Simplified Chinese is supported as a locale variant.

Theme rules:

- Onboarding should match the current Tomato visual system: pale mint page background, white rounded cards, deep ink text, tomato-red progress and CTA accents.
- Use green only for positive offer decisions such as `Accept` or `Good Offer`.
- Night mode should keep the tomato accent while moving surfaces to dark low-glare cards and preserving strong text contrast.
- The offer popup test screen must show a dynamic notification state tied to the active offer, not a static screenshot.

Stable component IDs:

| ID | Purpose |
| --- | --- |
| `Onboarding.Welcome` | First launch value proposition |
| `Onboarding.HowItWorks` | Three-step feature explanation |
| `Onboarding.TryOffer` | Interactive offer-recognition demo |
| `Onboarding.Ready` | Permission and goal setup screen |

### Home

Modes:

- `Home.Dark`: night / in-car mode.
- `Home.Light`: daytime / high-contrast mode.

Primary areas:

- `Home.Topbar`: app identity and settings access.
- `Home.ShiftCard`: current shift timer, GPS distance, and shift actions.
- `Home.GoalCard`: net income target, current net estimate, cost ledger, sync action, and progress.
- `Home.TripCard`: latest trip recommendation and trip economics.
- `Home.TabBar`: bottom navigation.

## Stable Component IDs

Use these IDs when requesting design or implementation changes:

| ID | Purpose |
| --- | --- |
| `Home.Topbar.AppIcon` | Four-square app icon |
| `Home.Topbar.Brand` | Brand text |
| `Home.Topbar.Subtitle` | Product subtitle |
| `Home.Topbar.SettingsIcon` | Settings affordance |
| `Home.ShiftCard.Timer` | Shift duration |
| `Home.ShiftCard.Status` | Online/offline status |
| `Home.ShiftCard.Gps` | GPS recording and distance |
| `Home.ShiftCard.Actions.Online` | Online action button |
| `Home.ShiftCard.Actions.Pause` | Pause action button |
| `Home.ShiftCard.Actions.End` | End shift action button |
| `Home.GoalCard.IncomeValue` | Current estimated net income |
| `Home.GoalCard.Metrics.Target` | Target metric |
| `Home.GoalCard.Metrics.Remaining` | Remaining-to-goal metric |
| `Home.GoalCard.Ledger` | Revenue/cost ledger |
| `Home.GoalCard.Sync.Button` | Sync earnings button |
| `Home.GoalCard.Progress` | Goal progress rail |
| `Home.TripCard.Recommendation` | Take/skip recommendation |
| `Home.TripCard.TakeValue` | Expected retained amount |
| `Home.TripCard.RiskBadges` | Trip risk badges |
| `Home.TripCard.Metrics` | Offer, cost, time, rating grid |
| `Home.TabBar.Home` | Home tab |
| `Home.TabBar.Records` | Records tab |
| `Home.TabBar.Settings` | Settings tab |

## Visual Direction

Dark mode should feel cockpit-like, high-signal, and legible inside a car at night. Keep the purple tech tone, but avoid dense tiny text.

Light mode should feel clearer and more operational. Prioritize contrast and reading speed over decorative warmth.

Avoid:

- Low-contrast orange/gray combinations.
- Decorative changes that reduce scan speed.
- Changing multiple unrelated components in one pass.
- Introducing large marketing-style hero treatments.

## Current Tokens

Colors:

| Token | Value | Usage |
| --- | --- | --- |
| `color.signal.online` | `#00f05b` / `#00ff58` | Online state, positive recommendation |
| `color.signal.warning` | `#ffd146` / `#ffd400` | Remaining target, risk badges |
| `color.signal.danger` | `#ff8b85` | Cost and destructive/end-shift affordance |
| `color.dark.bg` | `#100b19` | Dark phone base |
| `color.dark.card` | `rgba(54,30,86,.72)` | Dark cards |
| `color.dark.text` | `#f3e8ff` | Dark primary text |
| `color.light.bg` | `#f4f5fa` | Light phone base |
| `color.light.card` | `rgba(255,255,255,.78)` | Light cards |
| `color.light.primary` | `#3a2366` | Light income text |
| `color.light.active` | `#5a35a1` | Light active tab |

Sizing:

| Token | Value | Usage |
| --- | --- | --- |
| `screen.phone.width` | `390px` | iPhone-style mock frame |
| `screen.phone.height` | `844px` | iPhone-style mock frame |
| `radius.phone` | `26px` | Device frame |
| `radius.card` | `12px` | Cards |
| `radius.button` | `9px` | Main shift buttons |
| `space.content.x` | `12px` | Screen horizontal padding |
| `space.card.gap` | `12px` | Vertical gap between cards |

Typography:

| Token | Value | Usage |
| --- | --- | --- |
| `font.display` | `SF Pro Display`, `PingFang SC`, system | Headings and major values |
| `font.mono` | `SF Mono`, `ui-monospace` | Timers and money metrics |
| `type.timer` | `54px / 800` | Shift timer |
| `type.income` | `58px / 820` | Main net income |
| `type.tripAction` | `29px / 850` | Recommendation |
| `type.tab` | `11px / 760` | Tab labels |

## Implementation Rules

- Treat `Home.Dark` and `Home.Light` as variants of the same screen, not separate products.
- Preserve `data-design-id` names when moving between HTML, Figma notes, and SwiftUI component names.
- For each requested change, specify whether it applies to dark mode, light mode, or both.
- When implementing in SwiftUI, map component IDs to small views such as `ShiftCard`, `GoalCard`, `TripCard`, and `TomatoTabBar`.
- If a change is visual only, do not alter layout hierarchy or app behavior.
