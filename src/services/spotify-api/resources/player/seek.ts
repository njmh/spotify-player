import spotifyApi, { ApiResponse } from '../..';

export default async function seek(positionMs: number): Promise<ApiResponse> {
  const response = await spotifyApi.put(`https://api.spotify.com/v1/me/player/seek?position_ms=${positionMs}`, {});
  return response.data;
}
