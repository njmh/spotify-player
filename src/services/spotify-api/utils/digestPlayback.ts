import get from 'lodash/get';
import { Playback } from "types";
import { PlaybackType, PlaybackState, ShuffleState, RepeatState } from "enums";
import digestDevice from './digestDevice';

export default function digestPlayback(playbackData: any, type: PlaybackType) : Playback | null {

  const isPlaying = get(playbackData, 'is_playing', null);
  const currentMs = get(playbackData, 'progress_ms', 0);
  const durationMs = get(playbackData, 'item.duration_ms', 0);
  const remainingMs = durationMs - currentMs;
  const shuffleState = get(playbackData, 'shuffle_state', false);
  const repeat = get(playbackData, 'repeat_state', false) as RepeatState;
  const device = digestDevice(get(playbackData, 'device', null));

  let state = PlaybackState.InActive;
  if (isPlaying !== null) {
    state = isPlaying ? PlaybackState.Playing : PlaybackState.Paused;
  }

  const shuffle = shuffleState ? ShuffleState.On : ShuffleState.Off;

  const playback: Playback = {
    state,
    shuffle,
    current: Math.round(currentMs / 1000),
    duration: Math.round(durationMs / 1000),
    remaining: Math.round(remainingMs / 1000),
    type,
    repeat,
    device,
  };

  return playback;
}
