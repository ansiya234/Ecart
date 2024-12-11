import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "mycart",
  initialState: [],
  reducers: {
    addCartItem: (state, action) => {
      const existingProduct = state.find((item) => item.id === action.payload.id);

      if (existingProduct) {

        const remainingProduct=state.filter(item=>item.id!=existingProduct.id)

        existingProduct.quantity++
        existingProduct.totalPrice=existingProduct.quantity*existingProduct.price
        state=[...remainingProduct,existingProduct]
        // Update quantity and totalPrice

        // existingProduct.quantity++;
        // existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
      } else {
        // Add new product with initial quantity and totalPrice
        state.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price
        });
      }
    },

    incQuantity: (state, action) => {

      const existingProduct=state.find(item=>item.id==action.payload)
      existingProduct.quantity++
      existingProduct.totalPrice=existingProduct.quantity*existingProduct.price

      const remainingProduct=state.filter(item=>item.id!=existingProduct.id)
      state=[...remainingProduct,existingProduct]


      // const { id, quantity } = action.payload;
      // const existingProduct = state.find((item) => item.id === id);

      // if (existingProduct) {
      //   // Update the quantity and totalPrice
      //   existingProduct.quantity = quantity;
      //   existingProduct.totalPrice = existingProduct.price * quantity;
      // }
    },

    decQuantity:(state,action)=>{

      const existingProduct=state.find(item=>item.id==action.payload)
      existingProduct.quantity--
      existingProduct.totalPrice=existingProduct.quantity*existingProduct.price

      const remainingProduct=state.filter(item=>item.id!=existingProduct.id)
      state=[...remainingProduct,existingProduct]

  },

    deleteCartItem: (state, action) => {

      return state.filter (item=>item.id!=action.payload)
      
    },

    emptyCart:(state)=>{
      return state=[]
  }
    
  }
})

export const { addCartItem, incQuantity, deleteCartItem , decQuantity, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;