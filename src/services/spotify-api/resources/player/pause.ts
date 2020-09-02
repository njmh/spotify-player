import spotifyApi, { ApiResponse } from '../..';

export default async function pause(): Promise<ApiResponse> {
  const response = await spotifyApi.put('https://api.spotify.com/v1/me/player/pause', {});
  return response.data;
}
