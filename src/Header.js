import React from "react";
import { Typography, Divider, withStyles } from "@material-ui/core";
import styles from "./MainCss";

function Header(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography
        className={classes.mainHeading}
        align='center'
      >
        Weather App Using ReactJs, MobX, react-chartjs-2 and material-ui
      </Typography>
      <Divider className={classes.headerDivider}/>
    </React.Fragment>
  );
}

export default  withStyles(styles)(Header);
