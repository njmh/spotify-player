import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Drawer, DrawerProps } from '@material-ui/core';

const useStyles = makeStyles<Theme, { paperOpacity: number}>({
  paper: {
    backgroundColor: props => `rgba(0, 0, 0, ${props.paperOpacity})`,
    color: '#fff',
    boxShadow: 'none',
    border: 'none',
    transition: '0.8s transform cubic-bezier(.25, .25, 0, 1) !important',
    overflowY: 'visible',
  },
  drawerInner: {
    display: 'flex',
    alignItems: 'center',
    height: 80,
  },
});

interface CustomDrawerProps {
  paperOpacity?: number;
}

const CustomDrawer: React.FunctionComponent<DrawerProps & CustomDrawerProps> = (props) => {
  const { paperOpacity = 1, ...drawerProps } = props;
  const classes = useStyles({ paperOpacity });
  return (
    <Drawer
      {...drawerProps}
      variant="persistent"
      classes={{ paper: classes.paper }}
      ModalProps={{ hideBackdrop: true }}
      transitionDuration={800}
    >
      <div className={classes.drawerInner}>
        {props.children}
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
