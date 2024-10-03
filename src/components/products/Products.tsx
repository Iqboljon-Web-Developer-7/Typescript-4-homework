import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
interface ProductPropTypes {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: {
    value: number;
    percentage: number;
  };
  status: string;
  category: {
    primary: string;
    secondary: string;
  };
  sku: string;
  stock: {
    [color: string]: number; // Dynamic keys for color and stock quantity
  };
  images: {
    color: string;
    images: string[];
  }[];
  reviews: {
    totalReviews: number;
    comments: {
      user: string;
      profileImg: string;
      comment: string;
      rating: number;
    }[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    slug: string;
  };
  timestamps: {
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
  };
  additional_infos: {
    measurements: {
      width: number;
      depth: number;
      unit: string;
    };
    weight: {
      value: number;
      unit: string;
    };
  };
}

interface PropTypes {
  data: ProductPropTypes[];
  limit: number;
}

export default class Products extends Component<{}, PropTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      limit: 8,
    };
  }
  componentDidMount(): void {
    axios
      .get("https://66f115e341537919154f732a.mockapi.io/products")
      .then((data) => this.setState({ data: data.data }));
  }

  getproducts(): JSX.Element {
    return (
      <>
        <div className="grid grid-cols-4">
          {this.state.data
            ? this.state.data
                .slice(0, this.state.limit)
                .map((product: ProductPropTypes) => {
                  return (
                    <div className="product p-2" key={product.id}>
                      <div className="product__images relative group">
                        <span className="status py-1 px-2 text-sm font-medium tracking-widest absolute inset-[4%_auto_auto_4%] bg-white rounded-lg">
                          {product.status == "New" && "NEW"}
                        </span>
                        <img
                          src={product?.images[0].images[0]}
                          alt="product img"
                          className="rounded-md"
                        />
                        <button className="bg-black  py-2 text-slate-100 absolute inset-[auto_4%_4%_4%] rounded-lg text-base opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300">
                          Add to cart
                        </button>
                      </div>
                      <div className="product__info mt-3 mb-7 grid gap-1 text-sm text-start font-medium">
                        <div className="product__info--stars flex-center justify-start gap-1 text-sm text-slate-800"></div>
                        <h4 className="product__title">
                          <Link to={`/product/${product.id}`}>
                            {product.title}
                          </Link>
                        </h4>
                        <p className="product__price">${product.price}</p>
                      </div>
                    </div>
                  );
                })
            : "Hello world"}
        </div>
        <div className="flex items-center justify-center">
          {this.state.limit > 8 ? (
            <button
              onClick={() => this.setState({ limit: 8 })}
              className="py-3 px-5 bg-green-500 rounded-2xl text-sm"
            >
              <span>Load Less</span>
            </button>
          ) : (
            <button
              onClick={() => this.setState({ limit: this.state.limit * 2 })}
              className="py-3 px-5 bg-green-500 rounded-2xl text-sm"
            >
              <span>Load More</span>
            </button>
          )}
        </div>
      </>
    );
  }

  render() {
    return (
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl my-8 text-green-400">
          Welcome to products page!
        </h2>
        {this.getproducts()}
      </div>
    );
  }
}
