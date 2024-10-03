import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

// Higher-order component to pass URL params
function withRouter<T extends {}>(Component: React.ComponentType<T>) {
  return function WrappedComponent(props: T) {
    const params = useParams(); // Get URL params (e.g., 'id')
    return <Component {...props} params={params} />; // Pass them as props
  };
}

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

type ProductProps = {
  params: {
    id: string;
  };
};

type ProductState = {
  data: ProductPropTypes | null; // Set the type to either `ProductPropTypes` or `null`
};

class Product extends React.Component<ProductProps, ProductState> {
  constructor(props: ProductProps) {
    super(props);
    this.state = {
      data: null, // Initialize data as null
    };
  }

  componentDidMount() {
    const { id } = this.props.params;

    axios
      .get(`https://66f115e341537919154f732a.mockapi.io/products/${id}`)
      .then((response) => this.setState({ data: response.data }));
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <div className="singleProduct wrapper mb-5 p-4">
          <p className="my-4 text-sm text-[#605F5F]">
            <Link to={"/"}>Home</Link> &nbsp;{">"}&nbsp; Shop &nbsp;{">"}&nbsp;{" "}
            {data?.category?.primary} &nbsp;{">"}&nbsp; {data?.title}
          </p>
          <div className="singleProduct__top flex flex-col md:flex-row flex-center justify-between gap-8">
            <div className="singleProduct__top--images w-full flex-grow min-w-96">
              <img src={data?.images[0].images[0]} alt="" />
            </div>
            <div className="singleProduct__top--texts flex-grow self-stretch">
              <div className="flex items-center gap-3">
                <span className="reviews text-sm">
                  {data?.reviews?.comments?.length} reviews
                </span>
              </div>
              <h2 className="text-[1.5rem] lg:text-[2.5rem] my-2">
                {data?.title}
              </h2>
              <p className="text-[#6C7275] text-sm lg:text-base">
                {data?.description}
              </p>
              <h3 className="my-3 text-2xl lg:text-3xl flex-center justify-start gap-3">
                ${data?.price}{" "}
                {data?.price < data?.originalPrice && (
                  <span className="text-base lg:text-xl line-through text-[#6C7275]">
                    ${data?.originalPrice}
                  </span>
                )}
              </h3>
              <hr className="my-6" />
              <div className="additionalInfo">
                <h4 className="text-[#6C7275] font-[500]">Measurements</h4>
                <p className="text-[1.125rem] mt-2">
                  {data?.additional_infos?.measurements?.width} x{" "}
                  {data?.additional_infos?.measurements?.depth}{" "}
                  {data?.additional_infos?.measurements?.unit}
                </p>
              </div>
              <div className="colors mt-4">
                <div className="flex flex-wrap gap-2 mt-2">
                  {data?.images?.map((img, inx) => (
                    <div
                      key={inx}
                      className="min-w-10 min-h-10 rounded-full border shadow-md cursor-pointer hover:shadow-none duration-200"
                      style={{ backgroundColor: img.color }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
