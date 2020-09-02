import React from 'react';
import next from 'services/spotify-api/resources/player/next';
import previous from 'services/spotify-api/resources/player/previous';
import seek from 'services/spotify-api/resources/player/seek';
import { Playback } from 'types';
import { PlaybackType, PlaybackDirection } from 'enums';
import { ControlButton } from 'components/ControlButtons';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Replay30Icon from '@material-ui/icons/Replay30';
import Forward30Icon from '@material-ui/icons/Forward30';

interface SkipButtonProps {
  playback: Playback;
  direction: PlaybackDirection;
};

const SkipButton: React.FunctionComponent<SkipButtonProps> = (props) => {
  const { playback, direction } = props;
  const { type: playbackType } = playback;

  const handleClick = () => {
    if (playbackType === PlaybackType.Track) {
      if (direction === PlaybackDirection.Forward) next();
      if (direction === PlaybackDirection.Back) previous();
    }
    if (playbackType === PlaybackType.Episode) {
      if (direction === PlaybackDirection.Forward) {
        const newPositionMs = (playback.current + 30) * 1000;
        seek(newPositionMs);
      };
      if (direction === PlaybackDirection.Back) {
        const newPositionMs = (playback.current - 30) * 1000;
        seek(newPositionMs);
      };
    }
  };

  return (
    <ControlButton size="large" onClick={handleClick}>
      {direction === PlaybackDirection.Back && (
        <>
          {playbackType === PlaybackType.Track && <SkipPreviousIcon />}
          {playbackType === PlaybackType.Episode && <Replay30Icon />}
        </>
      )}
      {direction === PlaybackDirection.Forward && (
        <>
          {playbackType === PlaybackType.Track && <SkipNextIcon />}
          {playbackType === PlaybackType.Episode && <Forward30Icon />}
        </>
      )}
    </ControlButton>
  );
};

export default SkipButton;
