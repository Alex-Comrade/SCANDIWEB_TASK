import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { LOAD_PRODUCTS } from "../../GraphQL/Queries";

import Header from "../Layout/Header";

import classes from "../Store/PDP.module.css";

const PDP = ({ selected, setSelected, setCartItems, cartItems }) => {
    const params = useParams();

    const { loading, data } = useQuery(LOAD_PRODUCTS, {
        variables: { id: params.id },
    });

    // main pic
    const [mainImg, setMainImg] = useState(data && data.product.gallery[0]);
    const [productSelection, setProductSelection] = useState({ id: params.id, amount: 0 });

    useEffect(() => {
        if (data) {
            setMainImg(data.product.gallery[0]);
        }
    }, [data]);

    const setAttributeHandler = (attributeKey, attributeValue) => {
        setProductSelection((prevState) => ({
            ...prevState,
            attributes: { ...prevState.attributes, [attributeKey]: attributeValue },
        }));
    };

    const addToCartHandler = (product) => {
        if (cartItems.some((e) => e.id === params.id && JSON.stringify(e.attributes) === JSON.stringify(product.attributes))) {
            //find index
            const index = cartItems.findIndex((e) => {
                return e.id === params.id && JSON.stringify(e.attributes) === JSON.stringify(product.attributes);
            });

            let newArr = [...cartItems];
            newArr[index].amount = newArr[index].amount + 1;
            setCartItems(newArr);
        } else {
            let test = { ...product, amount: 0 };
            setCartItems((prevState) => [...prevState, test]);
        }
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const currentPrice = !loading && data && data.product.prices.filter((price) => price.currency.label === selected)[0].amount;
    const currentSymbol = !loading && data && data.product.prices.filter((price) => price.currency.label === selected)[0].currency.symbol;

    return (
        <div className={classes.wrapperMain}>
            <div className={classes.wrapperContent}>
                <div className={classes.thumbnails}>
                    {!loading &&
                        data &&
                        data.product.gallery.map((item) => {
                            return <img className={classes.thumbImg} src={item} onClick={() => setMainImg(item)} key={item}></img>;
                        })}
                </div>

                <div className={classes.wrapperMainImg}>
                    <div className={classes.mainPanel}>
                        <img src={mainImg} alt='' />
                    </div>
                </div>

                <div className={classes.wrapperInfo}>
                    <div className={classes.brand}>{!loading && data && data.product.brand}</div>
                    <div className={classes.itemName}>{!loading && data && data.product.name}</div>
                    <div>
                        <div>
                            {!loading &&
                                data &&
                                data.product.attributes.map(({ type, name, items }) => {
                                    if (type === "swatch") {
                                        return (
                                            <div key={name}>
                                                <div className={classes.attributeName}>{name}:</div>
                                                <div className={classes.colorBoxWrapper}>
                                                    {items.map(({ value, displayValue }) => (
                                                        <div key={value}>
                                                            <div
                                                                className={classes.colorBox}
                                                                style={{ backgroundColor: `${value}` }}
                                                                onClick={() => setAttributeHandler(name, displayValue)}
                                                            ></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={name}>
                                            <div className={classes.attributeName}>{name}:</div>
                                            <div className={classes.attributeValueWrapper}>
                                                {items.map(({ value }) => (
                                                    <div key={value}>
                                                        <div className={classes.attributeValue} onClick={() => setAttributeHandler(name, value)}>
                                                            {value}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <span className={classes.priceHeading}>Price:</span>
                    <div className={classes.price}>
                        {currentSymbol} {currentPrice}
                    </div>

                    <button className={classes.addToCartBTN} onClick={() => addToCartHandler(productSelection)}>
                        Add to cart
                    </button>
                    <div className={classes.description}>{!loading && data && data.product.description}</div>
                </div>
            </div>
        </div>
    );
};

export default PDP;
