import { Link } from "react-router-dom";
// import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
// import Product from "./Products/Product";

const Home = () => {
  // const { keyword } = useParams();
  // const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {/* {!keyword ? <Header /> : null} */}
      {/* {isLoading ? ( */}
        {/* <Loader /> */}
      {/* ) : isError ? ( */}
        {/* <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : ( */}
        <>
          <div className="">
            <h1 className="">
              Special Products
            </h1>

            <Link
              to="/shop"
              className=""
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="">
              {/* {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))} */}
            </div>
          </div>
        </>
      {/* )} */}
    </>
  );
};

export default Home;
