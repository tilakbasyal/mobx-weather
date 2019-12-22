import React from "react";
import { Typography, Divider } from "@material-ui/core";

function Header() {
  return (
    <React.Fragment>
      <Typography
        style={{ fontSize: "32px", marginBottom: "10px", color:'#7272ff', fontWeight: 700 }}
        align='center'
      >
        Weather App Using ReactJs, MobX, react-chart-js and material-ui
      </Typography>
      <Divider  style={{
          height: '4px',
          maxWidth: '150px',          
          backgroundColor: '#09e1c0',          
          margin: '0 auto',          
          borderRadius: 4,
          marginBottom: '40px'
      }}/>
    </React.Fragment>
  );
}

export default Header;
