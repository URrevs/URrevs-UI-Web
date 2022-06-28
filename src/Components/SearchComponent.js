import { useTheme } from "@emotion/react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { SEARCH_INPUT_DELAY } from "../constants";
import { useAppSelector } from "../store/hooks";
import { COLORS } from "../Styles/main_light_colors";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: theme.palette.searchBar.searchBarColor,
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.searchBar.searchBarColor, 0.8),
//   },
//   marginLeft: 0,
//   width: "100%",
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//   },
// }));
/*============COMMENT=============== */
/* 
  Error handling:
  1- error flag is raisen only when user clicks on search button while compareItem is undefined
  2- if the textfield is emptied the flag is turned false
  3- if user clicks search while field is empty the error flag is turned true with error message_1
  4- if user clicks search without locking the error flag is turned true with error message_2
  5- if user clicks search with a gibberish input the error flag is turned true with error message_3
  */
export default function SearchComponent({
  label,
  onResult,
  query = "",
  item = {},
  isFormik = false,
  error = false,
  setError = () => {},
  helperText = "",
  searchFn,
}) {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionary = {
    noInputError: textContainer.nothingToSearchFor,
    phoneNotFound: textContainer.phoneNotFound,
    selectPhone: textContainer.selectPhone,
  };

  const [searchQuery, setSearchQuery] = React.useState(query);
  const [results, setResults] = React.useState([]);
  const [lock, setLock] = React.useState(query !== "");
  const [errorMsg, setErrorMsg] = React.useState(pageDictionary.noInputError);
  const theme = useTheme();
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
        disabled={lock}
        value={searchQuery}
        onChange={(e, value) => {
          setLock(true);
          setError(false);
          onResult(value);
          if (isFormik) {
            sessionStorage.setItem("chooseProduct", value.id);
            sessionStorage.setItem("search field", value.label);
          }
        }}
        freeSolo
        sx={{
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
        }}
        defaultValue={isFormik ? sessionStorage.getItem("search field") : ""}
        disableClearable
        options={results.map((option) => ({
          label: option.name,
          type: option.type,
          id: option._id, //Company/PhoneId depends on the search function
        }))}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              ...theme.typography.S16W500C050505, //Change input textfield font
              transition: "font-size 0.6s ease-in",
              ".Mui-disabled": {
                //Change Disabled CSS
                fontWeight: 800,
                fontSize: 18,

                WebkitTextFillColor: "black !important",
              },

              input: {
                "&::placeholder": {
                  //Change placeholder font
                  opacity: 1,
                  fontWeight: 300,
                  fontSize: 16,
                },
              },
            }}
            onBlur={(e) => {
              try {
                setTimeout(async () => {
                  if (e.target.value.trim() !== "") {
                    const phones = await searchFn(
                      e.target.value.trim()
                    ).unwrap();
                    setErrorMsg(pageDictionary.selectPhone);
                    if (phones.length === 0)
                      setErrorMsg(pageDictionary.phoneNotFound);
                    setResults(phones);
                  } else setErrorMsg(pageDictionary.noInputError);
                }, SEARCH_INPUT_DELAY);
              } catch (e) {
                console.log(e);
              }
            }}
            onChange={async (e) => {
              setSearchQuery(e.target.value);

              try {
                setTimeout(async () => {
                  if (e.target.value.trim() !== "") {
                    let phones = await searchFn(e.target.value.trim()).unwrap();

                    phones = phones.filter((phone) => phone.name !== item.name);

                    setResults(phones);
                  }
                }, SEARCH_INPUT_DELAY);
              } catch (e) {
                console.log(e);
              }
            }}
            error={error}
            helperText={error && errorMsg}
            placeholder={label}
            InputProps={{
              ...params.InputProps,

              // type: "search",
              endAdornment: (
                <InputAdornment position="end">
                  {searchQuery !== "" ? (
                    <IconButton
                      onClick={() => {
                        setSearchQuery("");
                        setResults([]);
                        setErrorMsg(pageDictionary.selectPhone);
                        setLock(false);
                        onResult({
                          label: "",
                          id: "",
                          type: "",
                        });
                        setError(false);
                      }}
                    >
                      <CloseOutlinedIcon
                        htmlColor={theme.palette.searchBar.searchIcon}
                      />
                    </IconButton>
                  ) : (
                    <SearchIcon
                      htmlColor={theme.palette.searchBar.searchIcon}
                    />
                  )}
                </InputAdornment>
              ),
              style: {
                // backgroundColor: lock ? "#d5dcf2" : "",
                height: "50px",
                fontWeight: 500,
                fontSize: 18,
                alignContent: "center",
                color: theme.palette.textField.inputFieldText,
                background: theme.palette.textField.inputFieldBackground, //Change Background color of textfield
                borderRadius: 90,
                border: `0.8px solid ${theme.palette.textField.borderColor} `,
                //
                // borderRadius: TEXT_FIELD_BORDER_RADIUS,
                // border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
