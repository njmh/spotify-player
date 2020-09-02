import { Episode } from "types";

export default function digestEpisode(episodeData: any, show: string | null) : Episode | null {
  if (!episodeData) return null;

  const {
    uri,
    href,
    name,
    description,
    duration_ms: duration,
  } = episodeData;

  const episode: Episode = {
    uri,
    href,
    name,
    description,
    duration,
    show: show || '',
  };

  return episode;
}
