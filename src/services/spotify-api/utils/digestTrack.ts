import { Track } from "types";
import digestArtists from './digestArtists';

export default function digestTrack(trackData: any, album: string | null) : Track | null {
  if (!trackData) return null;

  const {
    uri,
    href,
    name,
    track_number: trackNumber,
    duration_ms: duration,
  } = trackData;

  const artists = digestArtists(trackData.artists);
  const artist = artists.map(artist => artist.name).join(', ');

  const track: Track = {
    uri,
    href,
    name,
    artist,
    artists,
    trackNumber,
    duration,
    album: album || '',
  };

  return track;
}
