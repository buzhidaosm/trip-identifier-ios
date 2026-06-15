# Change Request Template

Copy this structure when asking Codex to implement precise UI changes.

```text
Screen:
Mode: dark / light / both
Component ID:
Current problem:
Desired change:
Do not change:
Reference:
Priority:
```

## Example

```text
Screen: Home
Mode: dark only
Component ID: Home.ShiftCard.Actions.End
Current problem: End shift button looks too pale and not clearly destructive.
Desired change: Text #FF6B64, border rgba(255,107,100,.55), keep transparent background.
Do not change: height, width, label text, button order, other shift buttons.
Reference: Figma frame "Home / ShiftCard / Dark / Online"
Priority: high
```

## Batch Request Rules

For fastest, safest iteration:

- Group changes by screen.
- Separate layout changes from color/typography changes.
- Mention dark/light/both every time.
- Include exact Figma frame name when available.
- Say "do not change" for nearby elements that are easy to accidentally disturb.

