import { useQuery } from 'react-query';
import { CurrentlyPlaying } from 'types';
import getCurrentlyPlaying from '../resources/player/getCurrentlyPlaying';
import digestCurrentlyPlaying from '../utils/digestCurrentlyPlaying';

export default function useCurrentlyPlaying(polling: boolean = false, refetchInterval: number = 1000): CurrentlyPlaying {

  const response = useQuery(
    'currentlyPlaying',
    () => getCurrentlyPlaying(),
    {
      enabled: polling,
      cacheTime: 0,
      refetchInterval: polling && refetchInterval,
      refetchIntervalInBackground: false,
    },
  );

  const { data } = response;

  return digestCurrentlyPlaying(data);
}