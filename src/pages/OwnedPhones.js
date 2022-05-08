import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import {
  useGetMyOwnedPhonesMutation,
  useGetOthersOwnedPhonesMutation,
} from "../services/users";
import { useAppSelector } from "../store/hooks";

export default function OwnedPhonesPage() {
  const currentUserId = useAppSelector((state) => state.auth.uid);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("uid");

  const [round, setRound] = React.useState(1);
  const [getPhones, {}] = useGetMyOwnedPhonesMutation();
  const [getOthersPhones, {}] = useGetOthersOwnedPhonesMutation();

  React.useEffect(() => {
    try {
      if (paramId === currentUserId) {
        getPhones(round);
      } else {
        getOthersPhones({ round: round, uid: paramId });
      }
    } catch (e) {
      console.log(e);
    }
  }, [round]);

  return (
    <CustomAppBar showLabel={true} label="المنتجات الممتلكة" showBackBtn={true}>
      {/* {data} */}
    </CustomAppBar>
  );
}
