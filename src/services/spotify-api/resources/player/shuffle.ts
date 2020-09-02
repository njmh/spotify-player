import spotifyApi, { ApiResponse } from '../..';

export default async function shuffle(shuffleState: boolean): Promise<ApiResponse> {
  const response = await spotifyApi.put(`https://api.spotify.com/v1/me/player/shuffle?state=${String(shuffleState)}`, {});
  return response.data;
}
