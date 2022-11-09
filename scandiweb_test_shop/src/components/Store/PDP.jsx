import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { LOAD_PRODUCTS } from "../../GraphQL/Queries";

import Header from "../Layout/Header";

import classes from "../Store/PDP.module.css";

const PDP = () => {
    const params = useParams();

    const { loading, data } = useQuery(LOAD_PRODUCTS, {
        variables: { id: params.id },
    });

    const [mainImg, setMainImg] = useState(data && data.product.gallery[0]);
    useEffect(() => {
        if (data) {
            setMainImg(data.product.gallery[0]);
        }
    }, [data]);

    // const product = data && data.product.name;
    // console.log(product);

    const test = data && data.product.gallery[0];
    console.log(test);

    return (
        <div className={classes.wrapperMain}>
            <Header />
            <div className={classes.wrapperSide}>
                <div className={classes.sidePanel}>
                    {!loading &&
                        data &&
                        data.product.gallery.map((item) => {
                            return <img className={classes.img} src={item} onClick={() => setMainImg(item)}></img>;
                        })}
                </div>
            </div>
            <div className={classes.wrapperPanel}>
                <div className={classes.mainPanel}>
                    <img src={mainImg} alt='' />
                </div>
                <div className={classes.sideMenu}>Side</div>
            </div>
        </div>
    );
};

export default PDP;
