---
name: ikhlos-editing-style
description: Ikhlos's preferred video editing style, learned from reference videos he uploaded. Load before making, editing or montaging ANY video for Ikhlos (promo, Reels, travel footage, Koreadatalim ads), and before analyzing a new reference video he sends.
---

# Ikhlos's editing style

Ikhlos runs Koreadatalim (Korea university admission and visa agency, Uzbekistan) and also shoots and edits video.
He talks in Uzbek (Latin script). On-screen text is Uzbek unless he says otherwise.

Apply everything under "Learned style" by default. When a rule here conflicts with what he asks in the conversation, his request wins.

## How to analyze a new reference video

When Ikhlos uploads a reference video:

1. Probe it: duration, resolution, aspect ratio, fps.
2. Find every cut: `ffmpeg -i ref.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null -` and list the timestamps. Work out the average shot length and the cut rhythm.
3. Pull frames densely around each cut (every 2-3 frames, ±0.5 s) and look at them in contact sheets to see how each transition is built.
4. Pull frames at ~4-6 fps across the whole video to study motion graphics, text animation and subtitles.
5. Audio: find loudness peaks and onsets (where sound effects hit) and check whether cuts and animations land on the beat or on SFX. Transcribe speech if possible, then match spoken words to on-screen animations.
6. Write the analysis for him in Uzbek, point by point, using the checklist below.
7. Update "Learned style" below: add new rules, strengthen rules confirmed by more than one reference, note contradictions. Add the reference to "Reference log". Commit and push.

Be honest about limits. I see frames and measure audio; I don't watch or hear the video like a person. Say so when something (for example the exact SFX sound) is a guess.

## Analysis checklist

1. **Motion graphics**: shapes, icons, arrows, highlights, lower thirds, layout, colors, how they enter and exit.
2. **Animation smoothness**: easing (linear, ease-out, spring, overshoot), durations in frames, motion blur, scale and position moves.
3. **Subtitle style**: font, weight, size, case, color, stroke and shadow, background box, position, words per line, word-by-word highlight, entry animation.
4. **Cuts and transitions**: shot length, cut types (hard cut, whip, zoom, match cut, mask), smoothness between shots, speed ramps, camera-shake effects.
5. **Sound effects**: which kinds (whoosh, pop, click, riser, hit), where they hit relative to cuts and animations, music ducking under speech.
6. **Animation matched to speech**: which spoken words trigger an icon, text pop, zoom or B-roll, and how many frames before or after the word it lands.
7. *(Ikhlos's 7th point, still to be filled in)*

## Learned style

_No references analyzed yet._

## Reference log

| # | Date | Video | Main takeaways |
|---|------|-------|----------------|
