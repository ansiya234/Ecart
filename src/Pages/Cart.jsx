import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decQuantity, deleteCartItem, emptyCart, incQuantity } from "../redux/cartSlice";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";




function Cart() {
  const userCart = useSelector((state) => state.cartReducer);

  const [totalProducts,settotalProducts]=useState(0)
  const [totalAmount,settotalAmount]=useState(0)


  const dispatch = useDispatch();

  const navigate = useNavigate()
  useEffect(() => {

    if(userCart?.length>0){
      settotalProducts(userCart.length)
      settotalProducts(userCart.map(pro=>pro.totalPrice).reduce((t1,t2)=>t1+t2))
    }

    else{
      settotalProducts(0)
      settotalAmount(0)
    }
  
  }, [userCart])
  


  const handledeQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decQuantity(item.id))

    } else {
      dispatch(deleteCartItem(item.id))
    }
  }

  // const handledecQuantity = (item) => {
  //   if (item.quantity > 1) {
  //     dispatch(decQuantity(item.id))
  //   }
  //   else {
  //     dispatch(deleteCartItem(item.id))
  //   }
  // }

  // const handleQuantityChange = (e, productId) => {
  //   const newQuantity = parseInt(e.target.value, 10);
  //   if (newQuantity >= 1) {
  //     dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
  //   }
  // };

  const checkout =()=>{
    dispatch(emptyCart())
    alert("order placed successfully.......")
    navigate('/')
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      <div className="row">
        <div className="col-lg-8 col-md-7 col-12">
          {
            userCart.length > 0 ?
              userCart?.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center justify-content-between p-3 mb-3 border rounded"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />

                  <div className="flex-grow-1 mx-3">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="text-success mb-0">${item.price}</p>
                  </div>

                  {/* <Form.Control
                    type="number"
                    value={item.quantity}
                    min="1"
                    style={{ width: "80px" }}
                    onChange={(e) => handleQuantityChange(e, item.id)}
                  /> */}

                  <button onClick={() => handledeQuantity(item)} className='btn fw-bold me-3'>-</button>
                  <input className='border border-white' style={{ width: '30px' }} type="text" readOnly value={item.quantity} />
                  <button onClick={() => dispatch(incQuantity(item.id))} className='btn fw-bold'>+</button>


                  <p className="mb-0 ms-3">${item.totalPrice.toFixed(2)}</p>

                  <Button
                    className="ms-2"
                    variant="outline-danger"
                    onClick={() =>
                      dispatch(deleteCartItem(item.id)) // Implement this reducer if needed
                    }
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </div>
              ))

              :

              <div className="text-center mt-5 text-danger fs-5">Cart is empty</div>}

        </div>

        <div className="col-lg-4 col-md-5 col-12">
          <div className="p-4 border rounded">
            <h4 className="mb-4">Order Summary</h4>
            <p className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>
                $
                {userCart
                  .reduce((total, item) => total + item.totalPrice, 0)
                  .toFixed(2)}
              </span>
            </p>
            <p className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>Free</span>
            </p>
            <hr />
            <h5 className="d-flex justify-content-between">
              <span>Total</span>
              <span>
                $
                {userCart
                  .reduce((total, item) => total + item.totalPrice, 0)
                  .toFixed(2)}
              </span>
            </h5>
            <Button onClick={()=>dispatch(checkout())} variant="primary" className="w-100 mt-4">
              Checkout
            </Button>
          </div>
        </div>


      </div>
      <div>
        <Link to={'/'} className='btn btn-primary me-2'> shop more</Link>
        <button onClick={() => dispatch(emptyCart())} className='btn btn-danger'> empty cart</button>
      </div>
    </div>
  );
}

export default Cart;