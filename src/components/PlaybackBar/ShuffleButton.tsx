import React from 'react';
import shuffle from 'services/spotify-api/resources/player/shuffle';
import { ShuffleState } from 'enums';
import { ControlButton } from 'components/ControlButtons';
import ShuffleIcon from '@material-ui/icons/Shuffle';

interface ShuffleButtonProps {
  shuffleState: ShuffleState;
};

const ShuffleButton: React.FunctionComponent<ShuffleButtonProps> = (props) => {
  const { shuffleState } = props;

  const handleClick = () => {
    const shuffleOn = shuffleState === ShuffleState.On;
    shuffle(!shuffleOn);
  };

  return (
    <ControlButton active={shuffleState === ShuffleState.On} onClick={handleClick}>
      <ShuffleIcon />
    </ControlButton>
  );
}

export default ShuffleButton;
