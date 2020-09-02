import React from 'react';
import repeat from 'services/spotify-api/resources/player/repeat';
import { RepeatState } from 'enums';
import { ControlButton } from 'components/ControlButtons';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';

interface RepeatButtonProps {
  repeatState: RepeatState
};

const RepeatButton: React.FunctionComponent<RepeatButtonProps> = (props) => {
  const { repeatState } = props;

  let repeatActive = repeatState !== RepeatState.Off;

  const handleClick = () => {
    let nextRepeatState: RepeatState;
    switch (repeatState) {
      default:
      case RepeatState.Off:
        nextRepeatState = RepeatState.Context;
        break;
      case RepeatState.Context:
        nextRepeatState = RepeatState.Track;
        break;
      case RepeatState.Track:
        nextRepeatState = RepeatState.Off;
        break;
    }
    repeat(nextRepeatState);
  };

  return (
    <ControlButton active={repeatActive} onClick={handleClick}>
      {repeatState === RepeatState.Off && <RepeatIcon />}
      {repeatState === RepeatState.Context && <RepeatIcon />}
      {repeatState === RepeatState.Track && <RepeatOneIcon />}
    </ControlButton>
  );
};

export default RepeatButton;
