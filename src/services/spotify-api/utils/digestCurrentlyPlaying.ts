import get from 'lodash/get';
import { CurrentlyPlaying, Track, Album, Episode, Show } from 'types';
import { PlaybackType } from 'enums';
import digestPlayback from './digestPlayback';
import digestTrack from './digestTrack';
import digestAlbum from './digestAlbum';
import digestEpisode from './digestEpisode';
import digestShow from './digestShow';
import digestContext from './digestContext';

export default function digestCurrentlyPlaying(data: any) : CurrentlyPlaying {

  const type = get(data, 'currently_playing_type', null);

  const playback = digestPlayback(data, type);

  let track: Track | null = null;
  let album: Album | null = null;
  if (type === PlaybackType.Track) {
    album = digestAlbum(get(data, 'item.album'));
    track = digestTrack(get(data, 'item'), album && album.name);
  }

  let episode: Episode | null = null;
  let show: Show | null = null;
  if (type === PlaybackType.Episode) {
    show = digestShow(get(data, 'item.show'));
    episode = digestEpisode(get(data, 'item'), show && show.name);
  }

  const context = digestContext(get(data, 'context'));

  const currentlyPlaying: CurrentlyPlaying = {
    type,
    playback,
    track,
    album,
    episode,
    show,
    context,
  };

  return currentlyPlaying;
}
