import React from "react";
import { Label, Stack, StackItem, Text, mergeStyles } from "@fluentui/react";
import cart from "../../images/common/add-to-cart.png";

const priceTextStyles = mergeStyles({
  marginTop: "8px",
  color: "red",
  textAlign: "initial",
});

const marginTop = mergeStyles({
  marginTop: "8px",
});

const textAlign = mergeStyles({
  textAlign: "initial",
});

const stackStyles = {
  root: {
    padding: "8px 16px",
  },
};

class ItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ quantity: parseInt(e.target.value) });
  }

  getDetails() {
    return (
      <>
        <Label className={textAlign}>{this.props.productDetails.name}</Label>
        <Text className={textAlign}>
          {this.props.productDetails.description}
        </Text>
        <Text className={priceTextStyles} variant="xLarge" block>
          ${this.props.productDetails.price * this.state.quantity}
        </Text>
      </>
    );
  }

  getActions() {
    return (
      <>
        <Text block> Qty</Text>
        <select
          name="quantity"
          id="product-quantity"
          onChange={this.handleChange}
          value={this.state.quantity}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <div className={marginTop}>
          <img
            onClick={() => {
              this.props.onAddToCart(
                this.props.productDetails.id,
                this.props.productDetails.name,
                this.props.productDetails.description,
                this.props.productDetails.price,
                this.state.quantity
              );
            }}
            height="30px"
            src={cart}
            alt="Add to Cart"
          />
        </div>
      </>
    );
  }

  render() {
    return (
      <Stack styles={stackStyles} horizontal horizontalAlign="space-between">
        <StackItem>{this.getDetails()}</StackItem>
        <StackItem>{this.getActions()}</StackItem>
      </Stack>
    );
  }
}

export default ItemDetails;
