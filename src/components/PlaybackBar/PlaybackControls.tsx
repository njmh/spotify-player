import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Playback } from 'types';
import { ControlButtonGroup } from 'components/ControlButtons';
import PlayPauseButton from './PlayPauseButton';
import SkipButton from './SkipButton';
import ShuffleButton from './ShuffleButton';
import RepeatButton from './RepeatButton';
import { PlaybackType, PlaybackDirection } from 'enums';

const useStyles = makeStyles({
  playbackControls: {
    width: '100%',
    height: 80,
  },
});

interface PlaybackControlsProps {
  playback: Playback;
};

const PlaybackControls: React.FunctionComponent<PlaybackControlsProps> = (props) => {
  const classes = useStyles();
  const { playback } = props;

  return (
    <div className={classes.playbackControls}>
      <ControlButtonGroup>
        {playback.type === PlaybackType.Track && (
          <ShuffleButton shuffleState={playback.shuffle} />
        )}
        <SkipButton playback={playback} direction={PlaybackDirection.Back} />
        <PlayPauseButton playbackState={playback.state} />
        <SkipButton playback={playback} direction={PlaybackDirection.Forward} />
        {playback.type === PlaybackType.Track && (
          <RepeatButton repeatState={playback.repeat} />
        )}
      </ControlButtonGroup>
    </div>
  );
};

export default PlaybackControls;
