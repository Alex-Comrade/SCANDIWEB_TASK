import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import Dropdown from "./Dropdown";

import { LOAD_CATEGORIES } from "../../GraphQL/Queries";

import classes from "./Header.module.css";

import logo from "../../assets/Brand_icon.png";

import down from "../../assets/icons/down.svg";
import cart_empty from "../../assets/icons/cart_empty.svg";

const Header = () => {
    const [selected, setSelected] = useState("$");

    const [categories, setCategories] = useState([]);
    const { data } = useQuery(LOAD_CATEGORIES);
    useEffect(() => {
        if (data) {
            setCategories(data.categories);
        }
    }, [data]);

    return (
        <div className={classes.nav}>
            <div className={classes.link}>
                {categories.map((opt) => {
                    return (
                        <a className={classes.linkItem} href='www.google.com'>
                            {opt.name}
                        </a>
                    );
                })}
            </div>
            <div>
                <img src={logo} alt='Brand logo' />
            </div>
            <div className={classes.dropdown}>
                <Dropdown selected={selected} setSelected={setSelected} />
                <img src={cart_empty} />
            </div>
        </div>
    );
};

export default Header;
