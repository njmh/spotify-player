import spotifyApi, { ApiResponse } from '../..';
import getSpotifyIdFromUri from '../../utils/getSpotifyIdFromUri';

export default async function getPlaylist(playlistUri: string | null): Promise<ApiResponse> {
  const playlistId = getSpotifyIdFromUri(playlistUri);
  if (!playlistId) throw new Error('Invaid playlist URI');
  const response = await spotifyApi.get(`https://api.spotify.com/v1/playlists/${playlistId}`);
  return response.data;
}
