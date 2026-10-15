# rally (mobile prototype)

An interactive Expo/React Native prototype of the Rally app — frontend
only, mock data, no backend, no real auth. Lives entirely in this
`mobile/` folder; the website in `../src` is untouched.

## Running it

```bash
cd mobile
npm install
npx expo start
```

This prints a QR code. Scan it with the **Expo Go** app (free, App
Store/Play Store) on your phone — the prototype opens live, on your own
device, over your phone's network. No build step, no Xcode/Android
Studio needed for this.

If `npx expo start` fails trying to reach Expo's servers (only relevant
if you're behind a restrictive network), run `npx expo start --offline`
instead.

To preview in a browser instead of a phone: `npx expo start --web`.

## Project structure

```
src/
  app/            Every file here is a screen (Expo Router, file-based
                   routing). (tabs)/ is the bottom nav. [id].tsx files
                   are dynamic routes (event/[id], crew/[id], etc).
  components/     Reusable UI: PillButton, EventCard, CrewCard,
                   ChatBubble, Chip, Avatar, etc.
  data/           Mock content — festivals, local shows, crew members,
                   chat messages, genre/artist lists. Edit these to
                   change what the prototype shows.
  state/          AppState.tsx is the one source of truth for
                   onboarding profile, crews, and messages — all
                   in-memory, resets on reload. OnboardingDraft.tsx
                   holds in-progress onboarding answers.
  theme/          Colors, spacing, radius, fonts — mirrors the
                   website's design tokens exactly.
```

## What's real vs. placeholder

Real, working interactions: onboarding flow with validation (18+ gate,
required fields), search/filter on Discover, the full find-my-crew
questionnaire → matching animation → crew chat flow, sending messages,
uploading a photo to Rally Archives (asks for share confirmation first).

Visible but non-functional placeholders (tap them and they say so):
age verification display, account deletion, group privacy preferences,
blocked members list, report history, report/block buttons on
individual members. These need a real backend before they ship — the
brief was explicit that this prototype shouldn't pretend otherwise.

## Known limitation from the build sandbox

Placeholder photography uses `picsum.photos` URLs. They didn't load
during my own testing because this cloud sandbox's network policy
blocks that domain — they'll load normally on your phone's real network
connection. Not a bug in the code.
