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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.keys(this.state.data).length == 0 &&
            new Array(10).fill(8).map((_, idx) => (
              <div
                key={idx}
                role="status"
                className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
              >
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  </svg>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="flex items-center mt-4">
                  <svg
                    className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ))}
          {this.state.data
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
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </h4>
                    <p className="product__price">${product.price}</p>
                  </div>
                </div>
              );
            })}
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
