import React from 'react';
import play from 'services/spotify-api/resources/player/play';
import pause from 'services/spotify-api/resources/player/pause';
import { PlaybackState } from 'enums';
import { ControlButton } from 'components/ControlButtons';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

interface PlayPauseButtonProps {
  playbackState: PlaybackState
};

const PlayPauseButton: React.FunctionComponent<PlayPauseButtonProps> = (props) => {
  const { playbackState } = props;

  const handleClick = () => {
    if (playbackState === PlaybackState.Paused) play();
    if (playbackState === PlaybackState.Playing) pause();
  };

  return (
    <ControlButton size="x-large" onClick={handleClick}>
      {playbackState === PlaybackState.Playing && <PauseIcon />}
      {playbackState === PlaybackState.Paused && <PlayArrowIcon />}
    </ControlButton>
  );
};

export default PlayPauseButton;
