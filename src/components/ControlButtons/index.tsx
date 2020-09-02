import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

export type Align = 'left' | 'right' | 'center';
export type Size = 'small' | 'medium' | 'large' | 'x-large';

interface StyleProps {
  align?: Align;
  size?: Size;
  active?: boolean;
};

function alignment(align: Align): string {
  switch (align) {
    case 'left': return 'flex-start';
    case 'right': return 'flex-end';
    case 'center': default: return 'center';
  }
}

function size(size: Size): number {
  switch (size) {
    case 'small': return 20;
    case 'medium': default: return 40;
    case 'large': return 50;
    case 'x-large': return 80;
  }
}

const useStyles = makeStyles<Theme, StyleProps>({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: props => props.align ? alignment(props.align) : 'center',
  },
  button: {
    position: 'relative',
    width: props => props.size ? size(props.size) : 40,
    height: props => props.size ? size(props.size) : 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 0,
    appearance: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    '&:active, &:focus': {
      outline: 0,
    },
  },
  icon: {
    '& > svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: props => props.size ? size(props.size) : 40,
      height: props => props.size ? size(props.size) : 40,
      '& path': {
        fill: props => props.active ? '#50B95D' : '#fff',
        transition: `0.3s fill ease`,
      },
    }
  }
});

interface ControlButtonProps {
  size?: Size;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ControlButton: React.FunctionComponent<ControlButtonProps> = (props) => {
  const { children, size, active, onClick } = props;
  const classes = useStyles({ size, active });
  return (
    <button className={classes.button} onClick={onClick ? onClick : undefined}>
      <div className={classes.icon}>
        {children}
      </div>
    </button>
  );
};

interface ControlButtonGroupProps {
  children: React.ReactNode;
  align?: Align;
};

export const ControlButtonGroup: React.FunctionComponent<ControlButtonGroupProps> = (props) => {
  const { align = 'center' } = props;
  const classes = useStyles({ align });
  return (
    <div className={classes.root}>
      {props.children}
    </div>
  );
};
