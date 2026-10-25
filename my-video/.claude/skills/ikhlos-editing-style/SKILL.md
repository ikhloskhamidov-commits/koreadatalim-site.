---
name: ikhlos-editing-style
description: Ikhlos's named video editing styles, learned from reference videos he uploaded. Load before making, editing or montaging ANY video for Ikhlos (promo, Reels, travel footage, Koreadatalim ads), whenever he says to edit "in <name> style" / "<name> stylida", and before analyzing a new reference video he sends.
---

# Ikhlos's editing style

Ikhlos runs Koreadatalim (Korea university admission and visa agency, Uzbekistan) and also shoots and edits video.
He talks in Uzbek (Latin script). On-screen text is Uzbek unless he says otherwise.

## Named styles

Each analyzed reference becomes a **named style**, stored as its own file in `styles/<name>.md` (lowercase, hyphens). Ikhlos picks the name after the analysis.

- When he uploads raw footage and says "edit it in <name> style" ("<name> stylida edit qil"), read `styles/<name>.md` and follow it closely: cut rhythm, transitions, motion graphics, subtitles, SFX placement, speech-matched animation and B-roll.
- If the name doesn't match a file, list the styles in "Style index" and ask which one he means.
- If he names no style, ask which one, or use "Common preferences" if he says to choose.
- When a rule conflicts with what he asks in the conversation, his request wins.

## How to analyze a new reference video

When Ikhlos uploads a reference video:

1. Probe it: duration, resolution, aspect ratio, fps.
2. Find every cut: `ffmpeg -i ref.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null -` and list the timestamps. Work out the average shot length and the cut rhythm.
3. Pull frames densely around each cut (every 2-3 frames, ±0.5 s) and look at them in contact sheets to see how each transition is built.
4. Pull frames at ~4-6 fps across the whole video to study motion graphics, text animation and subtitles.
5. Audio: find loudness peaks and onsets (where sound effects hit) and check whether cuts and animations land on the beat or on SFX. Transcribe speech if possible, then match spoken words to on-screen animations.
6. Write the analysis for him in Uzbek, point by point, using the checklist below.
7. Ask Ikhlos what to name the style. Save it as `styles/<name>.md` using the style template below, add it to "Style index", and move anything shared by several styles into "Common preferences". Commit and push.

Be honest about limits. I see frames and measure audio; I don't watch or hear the video like a person. Say so when something (for example the exact SFX sound) is a guess.

## Analysis checklist

1. **Motion graphics**: shapes, icons, arrows, highlights, lower thirds, layout, colors, how they enter and exit.
2. **Animation smoothness**: easing (linear, ease-out, spring, overshoot), durations in frames, motion blur, scale and position moves.
3. **Subtitle style**: font, weight, size, case, color, stroke and shadow, background box, position, words per line, word-by-word highlight, entry animation.
4. **Cuts and transitions**: shot length, cut types (hard cut, whip, zoom, match cut, mask), smoothness between shots, speed ramps, camera-shake effects.
5. **Sound effects**: which kinds (whoosh, pop, click, riser, hit), where they hit relative to cuts and animations, music ducking under speech.
6. **Animation matched to speech**: which spoken words trigger an icon, text pop, zoom or B-roll, and how many frames before or after the word it lands.
7. **B-roll matched to speech**: where B-roll replaces or overlays the speaker, which words trigger it, how literal it is (exact object vs. mood), clip length, and how it enters and exits (cut, overlay window, split screen).

## Editing raw footage in a named style

1. Read `styles/<name>.md`.
2. Inventory the footage: duration, fps, resolution of each clip; pull contact sheets; transcribe any speech.
3. Pick the best shots (sharp, well exposed, steady, strongest moments) and drop bad takes, silences and repeats.
4. Build the edit in Remotion in this project, matching the style's cut rhythm, transitions, graphics, subtitles, SFX and B-roll rules.
5. Render, check frames from the output, send the MP4, and list what was done and any rule that couldn't be followed (for example, missing B-roll or music).

## Style template (`styles/<name>.md`)

```
# <name>
Reference: <file name, date analyzed>, <duration>, <aspect ratio>, <fps>
Overall feel: <one or two sentences>

1. Motion graphics
2. Animation smoothness (easings, durations in frames)
3. Subtitles (font, size, color, stroke, position, words per line, animation)
4. Cuts and transitions (avg shot length, cut types, speed ramps)
5. Sound effects (types, timing relative to cuts/animations, music ducking)
6. Animation matched to speech
7. B-roll matched to speech
Implementation notes: <Remotion settings, colors, frame timings to reuse>
```

## Common preferences

_Filled in once two or more styles share something._

## Style index

| Name | File | Reference | Summary |
|------|------|-----------|---------|
