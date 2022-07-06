import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ProductDetailsTable from "../Components/ProductDetailsTable";
import {
  useGetPhoneSpecsQuery
} from "../services/phones";

export const ComparisonScreen = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  // const compareId = useSelector((state) => state.compare.compareId);
  // const productId = useSelector((state) => state.compare.productId);
  const [searchParams] = useSearchParams();
  const pid = searchParams.get("pid");
  const cid = searchParams.get("cid");

  const {
    isLoading: compLoading,
    error: compError,
    data: compData,
  } = useGetPhoneSpecsQuery(cid);
  const {
    isLoading: productLoading,
    error: productError,
    data: productData,
  } = useGetPhoneSpecsQuery(pid);

  return (
    <CustomAppBar showBackBtn showLabel label={textContainer.comparison}>
      {productLoading || compLoading ? (
        <LoadingSpinner />
      ) : compError || productError ? (
        <div>{compError.data.status + productError.data.status}</div>
      ) : (
        <Grid container>
          {/* Right */}
          <Grid item xl={2} lg={2} md={2}></Grid>
          {/* Center Grid */}
          <Grid item xl={8} lg={8} md={8} xs={12}>
            <ProductDetailsTable
              comparedPhoneData={compData}
              phoneData={productData}
              isComparison={true}
            />
          </Grid>
          {/* Left */}
          <Grid item xl={2} lg={2} md={2}></Grid>
        </Grid>
      )}
    </CustomAppBar>
  );
};
