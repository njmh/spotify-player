
export enum SpotifyAction {
  PausePlayback,
  ResumePlayback,
  SkipNext,
  SkipPrevious,
  ShuffleOn,
  ShuffleOff,
  RepeatOnContext,
  RepeatOnTrack,
  RepeatOff,
};

export enum PlaybackState {
  Playing = 'playing',
  Paused = 'paused',
  InActive = 'inactive',
};

export enum ShuffleState {
  On = 'on',
  Off = 'off',
};

export enum RepeatState {
  Off = 'off',
  Context = 'context',
  Track = 'track',
};

export enum PlaybackType {
  Track = 'track',
  Episode = 'episode',
};

export enum PlaybackDirection {
  Forward = 'forward',
  Back = 'back',
};

export enum PlayingContext {
  Playlist = 'playlist',
  Album = 'album',
  Show = 'show',
};
