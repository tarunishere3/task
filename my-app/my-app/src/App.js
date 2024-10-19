import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ItemSection from "./components/itemSection";
import { Stack, StackItem } from "@fluentui/react";
import products from "./products.json";
import React from "react";
import { getProductsData } from "./API";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      allProducts: []
    };
    this.onAddToCart = this.onAddToCart.bind(this);
    this.onRemoveFromCart = this.onRemoveFromCart.bind(this);
  }

  componentDidMount = () => {
    getProductsData().then((products) => {
      console.log(products);
      if (products) {
        this.setState({
          allProducts: products
        })
      }
    })
  }
  onAddToCart(id, name, desc, price, quantity) {
    if (!this.state.products?.find((products) => products.id === id)
      && quantity) {
      const newProduct = {
        id: id,
        name: name,
        desc: desc,
        price: price,
        quantity: quantity
      };

      this.setState(
        (prevState) => ({
          products: [...prevState.products, newProduct],
        }),
        () => {
          console.log(this.state.products);
        }
      );
    }
  }

  onRemoveFromCart(id) {
    const updatedList = this.state.products.filter(
      (products) => products.id !== id
    );
    this.setState({ products: updatedList });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Stack horizontal horizontalAlign="space-between">
          <StackItem
            grow="4"
            style={{ padding: "36px 0", backgroundColor: "#c2c2c2" }}
          >
            <ItemSection products={this.state.allProducts} onAddToCart={this.onAddToCart} />
          </StackItem>
          <StackItem grow="2"
            style={{ width: "30%" }}
          >
            <Cart
              products={this.state.products}
              onRemoveFromCart={this.onRemoveFromCart}
            />
          </StackItem>
        </Stack>
        <Footer />
      </div>
    );
  }
}

export default App;
