import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_PRODUCTS, LOAD_CATEGORY_INFO } from "../../GraphQL/Queries";

import Header from "../Layout/Header";

import classes from "./Category.module.css";

const Category = ({ selected, setSelected, activeCategory }) => {
    const { loading, data } = useQuery(GET_CATEGORY_PRODUCTS, {
        variables: { CategoryInput: { title: activeCategory } },
    });

    console.log(data);

    return (
        <div className={classes.wrapperMain}>
            <div className={classes.categoryName}>{activeCategory}</div>
            <div className={classes.category}>
                {!loading &&
                    data.category.products.map((item) => {
                        const currentPrice = item.prices.filter((price) => price.currency.label === selected)[0].amount;
                        const currentSymbol = item.prices.filter((price) => price.currency.label === selected)[0].currency.symbol;
                        return (
                            <a href={"/product/" + item.id} key={item.name} className={classes.categoryInnerWrapper}>
                                <div className={classes.imgWrapper}>
                                    <img className={classes.img} src={item.gallery[0]}></img>
                                </div>
                                <div className={classes.categoryProductName}>{item.name}</div>
                                <span className={classes.categoryProductPrice}>
                                    {currentSymbol}
                                    {currentPrice}
                                </span>
                            </a>
                        );
                    })}
            </div>
        </div>
    );
};

export default Category;
