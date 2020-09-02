import { PlaybackState, ShuffleState, RepeatState, PlaybackType, PlayingContext } from './enums';

export type CurrentlyPlaying = {
  type: null | PlaybackType;
  playback: null | Playback;
  track: null | Track;
  episode: null | Episode;
  album: null | Album;
  show: null | Show;
  context: null | Context;
};

export type Playback = {
  state: PlaybackState;
  type: null | PlaybackType;
  current: number;
  duration: number;
  remaining: number;
  shuffle: ShuffleState;
  repeat: RepeatState;
  device: null | Device;
};

export type Track = {
  uri: string;
  href: string;
  name: string;
  album: string;
  artist: string;
  artists: Artist[];
  trackNumber?: number;
  duration?: number;
};

export type Album = {
  uri: string;
  href: string;
  name: string;
  artist: string;
  artists: Artist[];
  image: Image;
};

export type Artist = {
  uri: string;
  href: string;
  name: string;
  image?: Image;
};

export type Episode = {
  uri: string;
  href: string;
  name: string;
  show: string;
  description: string;
  duration: number;
};

export type Show = {
  uri: string;
  href: string;
  name: string;
  description: string;
  publisher: string;
  image: Image;
};

export type Playlist = {
  uri: string;
  href: string;
  name: string;
  image: Image;
  tracks?: Track[],
  pagination?: {
    total: number;
    offset: number;
    limit: number;
    next: null | string;
    previous: null | string;
  },
};

export type Context = {
  uri: string;
  href: string;
  type: PlayingContext;
};

export type Device = {
  id: string;
  name: string;
  type: string;
  active: boolean;
  volume: number;
};

export type User = {
  uri: string;
  href: string;
  displayName: string;
  initials: string;
  image: Image;
};

export type Image = {
  url: string;
  width?: number;
  height?: number;
};
