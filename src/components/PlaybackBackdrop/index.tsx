import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Album, Show } from 'types';
import CrossfadeImage from 'components/CrossfadeImage';

interface StyleProps {};

const useStyles = makeStyles<Theme, StyleProps>({
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  root: {
    zIndex: 0,
    userSelect: 'none',
    overflow: 'hidden',
  },
  overlay: {
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(0, 0, 0, 0.33)',
    zIndex: 2,
  },
  image: {
    zIndex: 1,
    transform: 'scale(1.2)',
    transition: '1.25s transform cubic-bezier(.25, .25, 0, 1)',
  },
});

interface PlaybackBackdropProps {
  item: Album | Show | null;
};

const PlaybackBackdrop: React.FunctionComponent<PlaybackBackdropProps> = (props) => {
  const { item } = props;
  const classes = useStyles({});

  return (
    <div className={clsx(classes.root, classes.fill)}>
      <div className={clsx(classes.overlay, classes.fill)}></div>
      <div className={clsx(classes.image, classes.fill)}>
        <CrossfadeImage imageUrl={item ? item.image.url : ''} backgroundColor="#000" />
      </div>
    </div>
  );
};

export default PlaybackBackdrop;
