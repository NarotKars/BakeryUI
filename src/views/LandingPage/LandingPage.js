import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionImages from "./Sections/SectionImages.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      {console.log(props.customerId != undefined)}
      {props.customerId === undefined ?
      <Header
        id={props.customerId}
        brand="Our bakery"
        rightLinks={<HeaderLinks id={props.customerId}/>}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      /> : 
      <Header
        brand="Our bakery"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />}
      <Parallax image={require("assets/img/bg.jpg")} />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionImages id={props.customerId}/>
      </div>
      <Footer />
    </div>
  );
}
