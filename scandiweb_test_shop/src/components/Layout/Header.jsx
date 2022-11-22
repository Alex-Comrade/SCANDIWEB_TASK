import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import Dropdown from "./Dropdown";

import { LOAD_CATEGORIES } from "../../GraphQL/Queries";

import classes from "./Header.module.css";

import logo from "../../assets/Brand_icon.png";

import down from "../../assets/icons/down.svg";
import cart_empty from "../../assets/icons/cart_empty.svg";
import { Link } from "react-router-dom";

const Header = ({ selected, setSelected, setActiveCategory }) => {
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
                        <a className={classes.linkItem} href='#' key={opt.name} onClick={() => setActiveCategory(opt.name)}>
                            {opt.name}
                        </a>
                    );
                })}
            </div>
            <a href='/'>
                <img src={logo} alt='Brand logo' />
            </a>
            <div className={classes.dropdown}>
                <Dropdown selected={selected} setSelected={setSelected} />
                <img src={cart_empty} />
            </div>
            <Link to='/cart'>cart</Link>
        </div>
    );
};

export default Header;
