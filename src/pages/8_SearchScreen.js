import { useTheme } from "@emotion/react";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import SearchComponent from "../Components/SearchComponent";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import {
  useSearchAllMutation,
  useAddToMyRecentSearchesMutation,
  useGetMyRecentSearchesQuery,
} from "../services/search";
import { SEARCH_INPUT_DELAY } from "../constants";

export const SearchScreen = () => {
  const textContainer = useSelector((state) => state.language.textContainer);

  const pageDictionary = {
    search: textContainer.search,
    placeholder: textContainer.searchForAProductOrACompany,
    oldResults: textContainer.previousSearchResults,
    smartphone: textContainer.smartphone,
    company: textContainer.company,
  };

  let {
    isLoading,
    error,
    isFetching,
    data: oldResults,
  } = useGetMyRecentSearchesQuery();
  const [search] = useSearchAllMutation();
  const [addRecentSearch] = useAddToMyRecentSearchesMutation();

  const [searchQuery, setSearchQuery] = React.useState("");

  const removeItem = (id) => {};

  // const oldResults = [
  //   {
  //     title: "Nokia 7 plus",
  //     icon: <SmartphoneRoundedIcon sx={{ fontSize: 40 }} />,
  //     to: "",
  //     subtitle: pageDictionary.smartphone,
  //   },
  //   {
  //     title: "Nokia",
  //     icon: <BusinessOutlinedIcon sx={{ fontSize: 40 }} />,
  //     to: "",
  //     subtitle: pageDictionary.company,
  //   },
  // ];

  const [results, setResults] = React.useState([]);

  const theme = useTheme();

  const renderListItem = (title, type, id) => (
    <React.Fragment key={id}>
      <ListItem sx={{ padding: 0, margin: 0, lineHeight: 0 }}>
        <ListItemButton
          onClick={() => {
            // add recent search locally
            oldResults = [...oldResults, { name: title, type, _id: id }];
            // add recent search to server
            addRecentSearch({ type, id });
          }}
        >
          <ListItemIcon>
            {type === "phone" ? (
              <SmartphoneRoundedIcon sx={{ fontSize: 40 }} />
            ) : (
              <BusinessOutlinedIcon sx={{ fontSize: 40 }} />
            )}
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ ...theme.typography.S20W700C050505 }}
            primary={title}
            secondaryTypographyProps={{ ...theme.typography.S18W400C65676B }}
            secondary={
              type === "phone"
                ? pageDictionary.smartphone
                : pageDictionary.company
            }
          />
        </ListItemButton>
        <IconButton onClick={removeItem}>
          <CloseOutlinedIcon
            sx={{ fontSize: "20px", color: theme.palette.cancel }}
          />
        </IconButton>
      </ListItem>
      {/* <div style={{ border: "0.2px solid #050505" }}></div> */}
      <Divider sx={{ padding: 0, color: theme.palette.divider }} />
    </React.Fragment>
  );

  React.useEffect(() => {
    if (searchQuery === "" && oldResults) setResults(oldResults);
  }, [searchQuery, oldResults]);

  return (
    <CustomAppBar showLabel label={pageDictionary.search} showBackBtn>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Box
          sx={{
            margin: "0px 13px",
          }}
        >
          <TextField
            onChange={async (e) => {
              setSearchQuery(e.target.value);
              try {
                setTimeout(async () => {
                  if (e.target.value.trim() !== "") {
                    const { phones, companies } = await search(
                      e.target.value.trim()
                    ).unwrap();
                    setResults([...phones, ...companies]);
                  }
                }, SEARCH_INPUT_DELAY);
              } catch (e) {
                console.log(e);
              }
            }}
            // value={searchQuery}
            sx={{
              input: {
                "&::placeholder": {
                  opacity: 1,
                  fontWeight: 300,
                  fontSize: 16,
                },
              },
            }}
            placeholder={textContainer.searchForAProductOrACompany}
            InputProps={{
              type: "search",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => {}}>
                    <SearchIcon
                      htmlColor={theme.palette.searchBar.searchIcon}
                    />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                height: "50px",
                fontWeight: 500,
                fontSize: 18,
                alignContent: "center",
                color: theme.palette.textField.inputFieldText,
                background: theme.palette.textField.inputFieldBackground,
                borderRadius: 90,
                border: `0.8px solid ${theme.palette.textField.borderColor} `,
                //
                // borderRadius: TEXT_FIELD_BORDER_RADIUS,
                // border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
              },
            }}
          />{" "}
          <Box sx={{ margin: "16px 12px" }}>
            <Typography variant="S16W500C65676b">
              {pageDictionary.oldResults}
            </Typography>
            <List>
              {results.map((item) =>
                renderListItem(item.name, item.type, item._id)
              )}
            </List>
          </Box>
        </Box>
      )}
    </CustomAppBar>
  );
};
