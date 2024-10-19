import React from "react";
import emptycart from "../images/common/empty-cart.svg";
import { Label, Stack, Text } from "@fluentui/react";
import CartCard from "./cartSection/cartCard";

class Cart extends React.Component {
  getEmptyCart() {
    return (
      <Stack>
        <img src={emptycart} alt="Cart" />
        <Label>Your Cart is Empty</Label>
        <Text block>Please add something to your cart</Text>
      </Stack>
    );
  }

  getSelectedProducts() {
    const cards = this.props.products.map((products) => (
      <CartCard
        key={products.id}
        id={products.id}
        name={products.name}
        desc={products.desc}
        price={products.price}
        quantity={products.quantity}
        onRemoveFromCart={this.props.onRemoveFromCart}
      />
    ));

    return <>{cards}</>;
  }

  render() {
    let totalAmount = 0;
    this.props.products.forEach(product => {
      totalAmount += (product.price * product.quantity);
    });

    return this.props.products.length === 0
      ? this.getEmptyCart()
      : <>
        {this.getSelectedProducts()}
        {
          <div
            style={{
              borderTop: "1px solid grey",
              margin: 8
            }}
          >
            <span
              style={{ float: "left" }}
            ><b>Total</b></span>
            <span
              style={{ float: "right" }}
            >{totalAmount.toPrecision(5)}</span>
          </div>
        }
      </>
  }
}

export default Cart;
