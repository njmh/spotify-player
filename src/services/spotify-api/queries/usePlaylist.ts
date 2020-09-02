import { useQuery } from 'react-query';
import { Playlist } from 'types';
import getPlaylist from '../resources/playlists/getPlaylist';
import digestPlaylist from '../utils/digestPlaylist';

export default function usePlaylist(playlistUri: string | null): Playlist | null {
  const response = useQuery(['playlist', playlistUri], () => getPlaylist(playlistUri));
  const { data } = response;
  if (data) {
    return digestPlaylist(data);
  }
  return null;
}