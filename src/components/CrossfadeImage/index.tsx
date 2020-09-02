import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import preLoadImage from 'utils/preloadImage';

interface StyleProps {
  width?: string;
  height?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  backgroundRepeat?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  duration: number;
};

const useStyles = makeStyles<Theme, StyleProps>({
  root: {
    width: props => props.width ? props.width : '100%',
    height: props => props.height ? props.height : '100%',
    backgroundColor: props => props.backgroundColor ? props.backgroundColor : 'transparent',
    transition: props => `${props.duration}ms background-color ease`,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundImage: props => props.backgroundImage ? props.backgroundImage : 'none',
    backgroundRepeat: props => props.backgroundRepeat ? props.backgroundRepeat : 'no-repeat',
    backgroundPosition: props => props.backgroundPosition ? props.backgroundPosition : 'center center',
    backgroundSize: props => props.backgroundSize ? props.backgroundSize : 'cover',
    transition: props => `${props.duration}ms background-image ease, ${props.duration}ms opacity ease`,
  },
});

interface CrossfadeImageProps {
  imageUrl: string;
  width?: number;
  height?: number;
  backgroundImage?: string;
  backgroundColor?: string;
  backgroundRepeat?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  duration?: number;
  className?: string;
};

const CrossfadeImage: React.FunctionComponent<CrossfadeImageProps> = (props) => {
  const { imageUrl, duration = 1000, className } = props;
  const classes = useStyles({ ...props, duration } as StyleProps);
  const [hasImage, setHasImage] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {

    const setImage = (imageUrl: string): void => {
      setImageSrc(imageUrl);
      setHasImage(true);
    };

    if (imageSrc !== imageUrl || !hasImage) {
      if (imageUrl !== '') {
        preLoadImage(imageUrl).then(image => {
          setImage(imageUrl);
        });
      } else {
        setHasImage(false);
        setTimeout(() => setImageSrc('none'), duration);
      }
    }

  }, [imageUrl, hasImage, imageSrc, duration]);

  const opacity = hasImage ? 1 : 0;
  const backgroundImage = imageSrc ? `url(${imageSrc})` : (props.backgroundImage ? `url(${props.backgroundImage}` : 'none');

  return (
    <div className={clsx(classes.root, className && className)}>
      <div className={classes.image} style={{ backgroundImage, opacity }}></div>
    </div>
  );
};

export default CrossfadeImage;
