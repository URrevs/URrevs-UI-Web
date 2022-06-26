import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  newProducts: [],
  newCompanies: [],
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

    addToLoaddedCompanies(state, action: PayloadAction<any>) {
      // make list of comments and replies
      let newList: any = [];
      const products = action.payload.newCompanies;
      products.forEach((product: any) => {
        newList.push(product);
      });
      state.newCompanies.push(...newList);
    },

    clearProducts(state) {
      state.newProducts = [];
      // state.newCompanies = [];
    },
  },
});

export const productListActions = productList.actions;
export const productListPostedScreenActions = productList.actions;
export const productListSliceName = productList.name;
export default productList;
