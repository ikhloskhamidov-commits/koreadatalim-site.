# yangicha

Named by Ikhlos on 2026-10-25. Not yet tested on his own footage; the first edit in this style is a test, so ask for feedback afterwards and update this file with what he changes.

Reference: English real-estate talking-head Reel ("what's the difference between home inspection and appraisal"), analyzed 2026-10-25. 15.2 s, 9:16 (720x1280), 23.98 fps.
Overall feel: fast, dense, "something new every ~1.5 s". One static camera (no punch-ins); the variety comes entirely from graphics, B-roll and big yellow keyword subtitles. Speaker alone on screen only ~40% of the time.

## 1. Motion graphics
- 0.9-2.5 s: chevron/arrow-shaped masked B-roll panels enter top-left, then top-right, over the speaker (speaker stays visible below). Each panel has a big white condensed title (Bebas/Anton style, heavy drop shadow): "HOME INSPECTION", "APPRAISAL". Panels stack into a collage.
- 2.6-5.2 s: full-screen phone mockup of a property-listing app on a white background with radial light streaks. Phone zooms out from large to small, then a cut to a close-up of the button; the slider swipes "Offer → Offer Accepted ✓". A literal visual for the spoken idea.
- 7.7-9.0 s: full-screen meme card: cream background, outlined "???" glyphs, 3D emoji (thinking face) peeking from corners. Subtitle in the same layout but dark grey.
- 9.0-10.4 s: full-screen stock B-roll with animated highlight rings (yellow and red halos) popping around people's heads, plus a small speech-bubble icon.
- 10.4-11.7 s: icons pop next to the speaker's hands: fire (heating), then snowflake (cooling), each in a dark circle with a thin ring.
- 11.7-13.3 s: glowing yellow hexagons fly in one at a time and settle into a honeycomb between his hands, each with an icon and label (Roof, Kitchen, Bedroom, Paint Job, Electric). Hard cut out.
- Palette: yellow #F5D414, white, black. Warm and bright.

## 2. Animation smoothness
- Entries are fast: 3-6 frames at 24 fps, strong ease-out.
- Icons pop with overshoot (spring, low damping).
- Motion blur on big moves (panel entry, phone zoom).
- Bloom/flash on entry: hexagons appear over-bright white-yellow and settle in 2-3 frames; B-roll panels enter with a white flash.
- Exits are mostly hard cuts, not fades.

## 3. Subtitles (signature element)
- One keyword per phrase, huge: yellow #F5D414, Black/ExtraBold geometric sans (Poppins/Gilroy-like), lowercase, soft yellow glow.
- Other words in the phrase are small, white, regular weight, tucked top-left/right and below the keyword, e.g.
  ```
           what's the
    difference
      between
  ```
- The keyword types on letter by letter (~1-2 frames per letter, the newest letter fades in).
- Position: 62-70% of frame height (chest level, above the hands). Keyword cap height ≈ 7.5% of frame height.
- Not always on: hidden while a big graphic carries the message; on light backgrounds the same layout turns dark grey.

## 4. Cuts and transitions
- Visual changes at 0.92, 2.04, 2.58, 4.00, 5.20, 7.72, 9.00, 10.39 s: one every ~1.5 s.
- Three kinds: (1) overlay entry (B-roll over the speaker with white flash, motion blur and chevron mask); (2) hard cut to full-screen graphic or stock; (3) zoom inside a graphic (phone pulls back, then a close-up).
- Smoothness comes from rhythm and timing to speech, not from slow fades.

## 5. Sound effects
- Sharp transients line up with every cut and graphic: 0.96, 2.07, 2.66, 4.00, 7.71, 9.00, 10.44, 11.71 s. Every transition and pop has an SFX.
- Guess (can't identify by ear): whoosh on B-roll entries, pop or click on icons and hexagons, swipe plus ding on "Offer Accepted".
- Little or no music: quiet gaps drop to about -38 dB. Voice and SFX carry the audio.

## 6. Animation matched to speech
- Every graphic is a literal picture of the words: "home inspection"/"appraisal" → titled panels; "offer" → offer-accepted UI; "what that means is" → ??? and a thinking emoji; heating/cooling → fire and snowflake icons; listed items → one hexagon per word.
- Graphics land on the word or 2-3 frames before it.
- Graphics are placed around the speaker's hand gestures (hexagons appear between his open hands).

## 7. B-roll matched to speech
- Literal: "inspection" → an inspector; "inspector" → people in hard hats with clipboards.
- Two modes: overlay panels (speaker stays below) and full-screen for ~1.3-1.4 s.
- B-roll is never bare: always carries a title, subtitle or highlight rings.

## Implementation notes (Remotion)
- Output 1080x1920, 30 fps (scale frame timings by 30/24).
- Keyword subtitle: font ~120-140 px, color #F5D414, `textShadow: 0 0 24px rgba(245,212,20,0.55)`; small words ~36-40 px white. Typewriter: reveal `Math.floor(progress * word.length)` letters, newest letter fading in over 2 frames.
- Pop: `spring({damping: 9, stiffness: 180})` on scale; flash: brightness 2 → 1 over 3 frames.
- Overlay panel: clip-path chevron polygon, translate in over 5 frames with ease-out, white flash overlay opacity 0.8 → 0 over 4 frames, CSS blur 8 → 0 px.
- Needs from Ikhlos: SFX pack (whoosh, pop, click, swipe, ding), B-roll clips, any 3D emoji/PNG assets. Without them, use site photos and self-drawn 2D graphics, and say so.
