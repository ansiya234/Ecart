import React, { useEffect, useState } from "react";
import Header from "../Components/Heading";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/productSlice";
import "./Home.css";
import Pagination from '../components/Pagination'

function Home() {

  const [currentPage, setCurrentPage] = useState(1)
  const [prodperPage, setProdPerPage] = useState(6)

  const { allProducts, error, loading } = useSelector((state) => state.productReducer); // Ensure state structure matches
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());

  }, [dispatch]); // Added dispatch to the dependency array


  const endingIndex = currentPage * prodperPage
  const startingIndex = endingIndex - prodperPage
  const currentProducts = allProducts.slice(startingIndex, endingIndex)

  return (
    <>
      <Header insideHome={true} />
      <h1>Products</h1>

      <div className="container">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <div className="text-center mt-5 text-danger">{error}</div>
        ) : allProducts.length > 0 ? (
          <div className="row mt-5">
            {currentProducts.map((product, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
                <Card className="fixed-card m-2">
                  <Link to={`/view/${product.id}`} className="text-decoration-none">
                    <Card.Img className="p-2" variant="top" src={product.images[0]} alt={product.title} />
                  </Link>
                  <Card.Body>
                    <Card.Title className="fs-5">{product.title.slice(0, 15)}...</Card.Title>
                    <Card.Text>
                      <Button variant="outline-primary mt-2">
                        <Link to={`/view/${product.id}`} className="text-decoration-none text-white">
                          View More
                        </Link>
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-5">Nothing to display</div>
        )}
        {
          currentProducts?.length > 0 &&
          <Pagination
            totalProducts={allProducts.length}
            prodperPage={prodperPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

        }
      </div>
    </>
  );
}

export default Home;