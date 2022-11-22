import { useState } from "react";
import { useQuery } from "@apollo/client";

import { LOAD_CURRENCIES } from "../../GraphQL/Queries";

import classes from "./Dropdown.module.css";
import ArrowDown from "../../assets/icons/down.svg";
import ArrowUp from "../../assets/icons/up.svg";

const Dropdown = ({ selected, setSelected }) => {
    const [isActive, setIsActive] = useState(false);

    const { data } = useQuery(LOAD_CURRENCIES);

    const currencyClickHandler = (item) => {
        setSelected(item.label);
        setIsActive(false);
    };

    return (
        <div className={classes.dropdown}>
            <div className={classes.dropdownBtn} onClick={(e) => setIsActive(!isActive)}>
                {selected}
                <img className={classes.dropdownArrowImg} src={isActive ? ArrowUp : ArrowDown} />
            </div>
            {isActive && (
                <div className={classes.dropdownContent}>
                    {data &&
                        data.currencies.length &&
                        data.currencies.map((opt) => (
                            <div className={classes.dropdownItem} key={opt.symbol} onClick={() => currencyClickHandler(opt)}>
                                <span className={classes.currencySpacer}> {opt.symbol} </span>
                                <span> {opt.label} </span>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
