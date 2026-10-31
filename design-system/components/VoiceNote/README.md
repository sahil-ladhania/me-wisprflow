# VoiceNote

A short real voice note from Sahil: a capsule player with the waveform, the time, where it was recorded, and a transcript.

**Provide:** an `<audio>` element inside (preload="none"), `data-duration` in seconds, the transcript text, a "where" line in Kalam ("recorded on the bike, 2026"), and ideally real peaks from the audio file passed to `TheRide.waveform()`.

**Rules**
- 10–25 seconds. Never autoplay; it plays on tap only. One at a time: starting one pauses the rest.
- Always offer "Read it instead". Judges skim; some will be on mute.
- Played bars in `ink`, unplayed in `wave-rest`. The waveform moves only while sound plays.
- The pill shape (`radius-pill`) is reserved for voice: if it's round, you can hear it.
- `--quiet` on the Night stop: no fill, no shadow, outlined play.
- Phones: full width, 48px play target, transcript under the capsule.
