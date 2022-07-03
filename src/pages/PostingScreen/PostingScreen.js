import { useTheme } from "@emotion/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import { useAddPhoneReviewMutation } from "../../services/phone_reviews";
import { useAppSelector } from "../../store/hooks";
import { AddReviewTab } from "./AddReviewTab";
import { QuestionsTab } from "./QuestionsTab";

const PostingScreen = ({
  value,
  initValues = {
    id: "",
    label: "",
    type: "",
  },
}) => {
  const isPhone = initValues.type === "phone";
  const checkSignedIn = useCheckSignedIn();
  const [addReview, { isLoading: isAddphoneLoading }] =
    useAddPhoneReviewMutation();
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
    // invitationCode: Yup.string().required("Required"),
  });
  return (
    <div style={{ marginBottom: theme.isMobile ? "85px" : 0 }}>
      {value === 0 ? (
        <Formik
          initialValues={{
            companyId: { _id: "", name: "", type: "" },
            chooseProduct: isPhone
              ? initValues
              : { id: "", label: "", type: "" },
            overAllExp: 0,
            manufacturingQuality: 0,
            userInterface: 0,
            priceQuality: 0,
            camera: 0,
            callsQuality: 0,
            battery: 0,
            rateManufacturer: 0,
            purchaseDate: "",
            likeAboutProduct: "",
            hateAboutProduct: "",
            likeAbout: "",
            hateAbout: "",
            invitationCode: "",
          }}
          validationSchema={BasicValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            if (checkSignedIn) {
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
              // console.log(JSON.stringify(reviewPost, null, 2));
              try {
                const response = await addReview(reviewPost).unwrap();
                //Success Message
                sessionStorage.clear();
              } catch (e) {
                console.log("asd askjd bhasb", e);
              }
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
