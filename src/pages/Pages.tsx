import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "../components/products/Products";
import Product from "../components/product/Product";

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route
              path="/product/:id"
              element={<Product params={{ id: "no" }} />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default AppRoutes;
