import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface StyleProps {
  fontSize: string;
  fontWeight: number;
};

const useStyles = makeStyles<Theme, StyleProps>({
  root: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
    fontSize: props => props.fontSize,
    fontWeight: props => props.fontWeight,
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
});

function calculateFontSize(size: number | undefined, scaled: 'vw' | 'vh' | false = false): string {
  const base = 16;
  size = size ? size : base;

  if (scaled) {
    const target = scaled === 'vw' ? 1024 : 768;
    return `${((size / target) * 100)}${scaled}`;
  }

  return `${size / base}rem`;
}

interface TypographyProps {
  children: React.ReactNode;
  className?: string; 
  scaled?: 'vw' | 'vh' | false;
  size?: number;
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  component?: 'span' | 'div' | 'p' | 'ul' | 'ol' | 'li';
};

const Typography: React.FunctionComponent<TypographyProps> = (props) => {
  const {
    children,
    className,
    scaled,
    size,
    weight = 'regular',
    component = 'span',
  } = props;

  const fontSize = calculateFontSize(size, scaled);
  let fontWeight: number;
  switch (weight) {
    case 'light': fontWeight = 300; break;
    case 'regular': default: fontWeight = 400; break;
    case 'medium': fontWeight = 500; break;
    case 'bold': fontWeight = 700; break;
  }
  const classes = useStyles({ fontSize, fontWeight });

  const Wrapper = component;
  return (
    <Wrapper className={clsx(classes.root, className && className)}>
      {children}
    </Wrapper>
  );
};

export default Typography;
