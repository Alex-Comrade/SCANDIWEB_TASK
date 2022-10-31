import React from "react";

import Header from "../Layout/Header";

import classes from "../Store/PDP.module.css";

const PDP = () => {
    return (
        <div className={classes.wrapperMain}>
            <Header />
            <div className={classes.wrapperSide}>
                <div className={classes.sidePanel}>small</div>
            </div>
            <div className={classes.wrapperPanel}>
                <div className={classes.mainPanel}>big</div>
                <div className={classes.sideMenu}>Side</div>
            </div>
        </div>
    );
};

export default PDP;
