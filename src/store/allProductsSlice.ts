import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  newComments: [],
};

const productList = createSlice({
  name: "productList",
  initialState,
  reducers: {
    addToLoaddedProducts(state, action: PayloadAction<any>) {
      // make list of comments and replies
      let newList: any = [];
      const products = action.payload.newProducts;
      products.forEach((product: any) => {
        newList.push(product);
      });
      state.newProducts.push(...newList);
    },

    clearProducts(state) {
      state.newProducts = [];
    },
  },
});

export const productListActions = productList.actions;
export const productListPostedScreenActions = productList.actions;
export const productListSliceName = productList.name;
export default productList;
