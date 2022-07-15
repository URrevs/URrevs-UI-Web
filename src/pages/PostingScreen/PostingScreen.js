import { useTheme } from "@emotion/react";
import { Formik } from "formik";
import { useLocation, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { GAevent } from "../../functions/gaEvents";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import { useAddPhoneReviewMutation } from "../../services/phone_reviews";
import { useAppSelector } from "../../store/hooks";
import { AddReviewTab } from "./AddReviewTab";
import { QuestionsTab } from "./QuestionsTab";
import React from "react";

const PostingScreen = ({
  value,
  initValues = {
    id: "",
    label: "",
    type: "",
  },
}) => {
  const handleInitialValues = (fieldName, initialValue) => {
    const stored = sessionStorage.getItem(fieldName);
    if (stored) {
      if (typeof initialValue === "object") return JSON.parse(stored);
      if (typeof initialValue === "number") return parseInt(stored);
      return stored;
    } else {
      return initialValue;
    }
  };
  //Handle Blocking Navigation
  React.useEffect(() => {
    window.onbeforeunload = () => {
      sessionStorage.clear();
      return null;
    };
  }, []);
  //Handle Blocking Navigation
  React.useEffect(() => {
    window.onbeforeunload = () => {
      sessionStorage.clear();
      return null;
    };
  }, []);

  const [searchParams] = useSearchParams();
  const paramId = searchParams.get("refCode");
  const location = useLocation();
  const isPhone = initValues.type === "phone";
  const checkSignedIn = useCheckSignedIn();
  const [addReview] = useAddPhoneReviewMutation();
  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionary = {
    tabbar: [textContainer.tabBarReview, textContainer.tabBarQuestion],
    likedAboutProductErrorMsg: textContainer.likedAboutProductErrorMsg,
    hateAboutProductErrorMsg: textContainer.hateAboutProductErrorMsg,
    likedAboutManufacturerErrorMsg:
      textContainer.likedAboutManufacturerErrorMsg,
    hatedAboutManufacturerErrorMsg:
      textContainer.hatedAboutManufacturerErrorMsg,
    purchaseDateErrorMsg: textContainer.purchaseDateErrorMsg,
    enterAValidRefCode: textContainer.enterAValidRefCode,
  };
  /* Form Validation */
  const BasicValidationSchema = Yup.object().shape({
    chooseProduct: Yup.object().shape({
      label: Yup.string().required(),
      id: Yup.string().required(),
      type: Yup.string().required(),
    }),
    purchaseDate: Yup.date().required(pageDictionary.purchaseDateErrorMsg),
    manufacturingQuality: Yup.number().integer().min(1, "Select Stars"),
    userInterface: Yup.number().integer().min(1, "Select Stars"),
    priceQuality: Yup.number().integer().min(1, "Select Stars"),
    camera: Yup.number().integer().min(1, "Select Stars"),
    callsQuality: Yup.number().integer().min(1, "Select Stars"),
    battery: Yup.number().integer().min(1, "Select Stars"),
    overAllExp: Yup.number().integer().min(1, "Select Stars"),
    rateManufacturer: Yup.number().integer().min(1, "Select Stars"),
    likeAboutProduct: Yup.string()
      .trim()
      .required(pageDictionary.likedAboutProductErrorMsg),
    hateAboutProduct: Yup.string()
      .trim()
      .required(pageDictionary.hateAboutProductErrorMsg),
    likeAbout: Yup.string()
      .trim()
      .required(pageDictionary.likedAboutManufacturerErrorMsg),
    hateAbout: Yup.string()
      .trim()
      .required(pageDictionary.hatedAboutManufacturerErrorMsg),
    invitationCode: Yup.string().matches(
      /^ur[1-9][0-9]*$/gi,
      pageDictionary.enterAValidRefCode
    ),
  });
  return (
    <div
      style={{
        marginBottom:
          theme.isMobile && location.pathname === "/add-review"
            ? "85px"
            : "16px",
      }}
    >
      {value === 0 ? (
        <Formik
          initialValues={{
            companyId: handleInitialValues("companyId", {
              _id: "",
              name: "",
              type: "",
            }),
            chooseProduct: isPhone
              ? initValues
              : handleInitialValues("chooseProduct", {
                  id: "",
                  label: "",
                  type: "",
                }),
            overAllExp: handleInitialValues("overAllExp", 0),
            manufacturingQuality: handleInitialValues(
              "manufacturingQuality",
              0
            ),
            userInterface: handleInitialValues("userInterface", 0),
            priceQuality: handleInitialValues("priceQuality", 0),
            camera: handleInitialValues("camera", 0),
            callsQuality: handleInitialValues("callsQuality", 0),
            battery: handleInitialValues("battery", 0),
            rateManufacturer: handleInitialValues("rateManufacturer", 0),
            purchaseDate: handleInitialValues("purchaseDate", ""),
            likeAboutProduct: handleInitialValues("likeAboutProduct", ""),
            hateAboutProduct: handleInitialValues("hateAboutProduct", ""),
            likeAbout: handleInitialValues("likeAbout", ""),
            hateAbout: handleInitialValues("hateAbout", ""),
            invitationCode:
              paramId ?? handleInitialValues("invitationCode", ""),
          }}
          validationSchema={BasicValidationSchema}
          onSubmit={async (
            values,
            { setSubmitting, resetForm, setFieldValue }
          ) => {
            if (checkSignedIn()) {
              const reviewPost = {
                phoneId: values.chooseProduct.id,
                companyId: values.companyId._id,
                ownedDate: values.purchaseDate,
                generalRating: values.overAllExp,
                uiRating: values.userInterface,
                manQuality: values.manufacturingQuality,
                valFMon: values.priceQuality,
                camera: values.camera,
                callQuality: values.callsQuality,
                battery: values.battery,
                pros: values.likeAboutProduct,
                cons: values.hateAboutProduct,
                refCode: values.invitationCode,
                companyRating: values.rateManufacturer,
                compPros: values.likeAbout,
                compCons: values.hateAbout,
              };
              try {
                await addReview(reviewPost).unwrap();
                //Success Message
                // TODO uncomment
                setFieldValue("chooseProduct", {
                  id: "",
                  label: "success",
                  type: "",
                });
                setFieldValue("purchaseDate", null);
                await setTimeout(() => {}, 100);
                resetForm();
                sessionStorage.clear();
                GAevent(
                  "User interaction",
                  "Adding review",
                  "Adding review",
                  false
                );
              } catch (e) {}
              setSubmitting(false);
            }
          }}
        >
          {(props) => <AddReviewTab {...props} isLoading={false} />}
        </Formik>
      ) : (
        <QuestionsTab initValues={initValues} />
      )}
    </div>
  );
};

export default PostingScreen;
