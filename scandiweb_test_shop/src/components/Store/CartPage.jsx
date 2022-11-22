import React from "react";

const CartPage = (props) => {
    console.log(props.cartItems, "cart testing");
    return (
        <div>
            {props.cartItems.map((item) => (
                // <CartItem itemID={item.id} attributes={item.attributes} />
            ))}
        </div>
    );
};

export default CartPage;
