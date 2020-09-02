import spotifyApi, { ApiResponse } from '../..';

export default async function play(): Promise<ApiResponse> {
  const response = await spotifyApi.put('https://api.spotify.com/v1/me/player/play', {});
  return response.data;
}
