import React from "react";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { useGetMyOwnedPhonesQuery } from "../services/users";

export default function OwnedPhonesPage() {
  console.log("own");
  const [round, setRound] = React.useState(1);
  const { isLoading, isFetching, isError, error, data } =
    useGetMyOwnedPhonesQuery(round);

  return (
    <CustomAppBar showLabel={true} label="منتجاتي" showBackBtn={true}>
      {/* {data} */}
    </CustomAppBar>
  );
}
