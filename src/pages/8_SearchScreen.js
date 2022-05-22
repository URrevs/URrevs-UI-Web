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
import React from "react";
import { useAppSelector } from "../store/hooks";
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
  useDeleteRecentSearchesMutation,
} from "../services/search";
import { SEARCH_INPUT_DELAY } from "../constants";
import { useNavigate } from "react-router-dom";
import ROUTES_NAMES from "../RoutesNames";

export const SearchScreen = () => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const user = useAppSelector((state) => state.auth);

  const pageDictionary = {
    search: textContainer.search,
    placeholder: textContainer.searchForAProductOrACompany,
    recentResults: textContainer.previousSearchResults,
    suggestedResults: "النتائج المقترحة",
    smartphone: textContainer.smartphone,
    company: textContainer.company,
  };
  //RTK Autogenerated hooks
  const [recentResults, setRecentResults] = React.useState([]);
  let {
    isLoading,
    error,
    isFetching,
    data: fetchedRecentResults = [],
  } = useGetMyRecentSearchesQuery(
    {},
    {
      skip: !user.isLoggedIn,
      refetchOnMountOrArgChange: true,
    }
  );

  React.useEffect(() => {
    setRecentResults(fetchedRecentResults);
  }, [fetchedRecentResults]);

  const [search] = useSearchAllMutation();
  const [addRecentSearch] = useAddToMyRecentSearchesMutation();
  const [deleteRecentSearch] = useDeleteRecentSearchesMutation();

  const [searchQuery, setSearchQuery] = React.useState("");

  const [results, setResults] = React.useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  //TextField styling
  const params = {
    sx: {
      width: "100",
      input: {
        "&::placeholder": {
          opacity: 1,
          fontWeight: 300,
          fontSize: 16,
        },
      },
    },
    placeholder: textContainer.searchForAProductOrACompany,
    InputProps: {
      // type: "search",
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => {}}>
            <SearchIcon htmlColor={theme.palette.searchBar.searchIcon} />
          </IconButton>
        </InputAdornment>
      ),
      style: {
        width: "100%",
        height: "50px",
        ...theme.typography.S16W500C050505,
        alignContent: "center",
        color: theme.palette.textField.inputFieldText,
        background: theme.palette.textField.inputFieldBackground,
        borderRadius: 90,
        border: `0.8px solid ${theme.palette.textField.borderColor} `,
        //
        // borderRadius: TEXT_FIELD_BORDER_RADIUS,
        // border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
      },
    },
  };
  // console.log(results);
  const renderSearchItems = (title, type, id) => (
    <React.Fragment key={id}>
      <ListItem sx={{ padding: 0, margin: 0, lineHeight: 0 }}>
        <ListItemButton
          sx={{
            padding: 0,
          }}
          onClick={() => {
            // add recent search locally
            // setResults([...results, { _id: id, name: title, type }]);

            // add recent search to server
            addRecentSearch({ type, id });
            type === "phone"
              ? navigate(`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${id}`)
              : navigate(`/${ROUTES_NAMES.COMPANY_PROFILE}?cid=${id}`);
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
            primaryTypographyProps={{
              ...theme.typography.S20W700C050505,
              lineHeight: 1,
            }}
            primary={title}
            secondaryTypographyProps={{ ...theme.typography.S18W400C65676B }}
            secondary={
              type === "phone"
                ? pageDictionary.smartphone
                : pageDictionary.company
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider sx={{ padding: 0, color: theme.palette.divider }} />
    </React.Fragment>
  );
  const renderRecentItems = (title, type, id) => (
    <React.Fragment key={id}>
      <ListItem sx={{ padding: 0, margin: 0, lineHeight: 0 }}>
        <ListItemButton
          sx={{
            padding: 0,
          }}
          onClick={() => {
            //Navigate to that phone
            type === "phone"
              ? navigate(`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${id}`)
              : navigate(`/${ROUTES_NAMES.COMPANY_PROFILE}?cid=${id}`);
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
            primaryTypographyProps={{
              ...theme.typography.S20W700C050505,
              lineHeight: 1,
            }}
            primary={title}
            secondaryTypographyProps={{ ...theme.typography.S18W400C65676B }}
            secondary={
              type === "phone"
                ? pageDictionary.smartphone
                : pageDictionary.company
            }
          />
        </ListItemButton>
        <IconButton
          onClick={() => {
            let temp = results;
            temp = temp.filter((result) => result._id !== id);
            setRecentResults(temp);
            deleteRecentSearch({ id: id });
          }}
        >
          <CloseOutlinedIcon
            sx={{ fontSize: "20px", color: theme.palette.cancel }}
          />
        </IconButton>
      </ListItem>
      <Divider sx={{ padding: 0, color: theme.palette.divider }} />
    </React.Fragment>
  );

  React.useEffect(() => {
    if (searchQuery === "" && recentResults) setResults(recentResults);
  }, [searchQuery, recentResults]);

  return (
    <CustomAppBar showLabel label={pageDictionary.search} showBackBtn>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "60px 13px",
        }}
      >
        <TextField
          {...params}
          onChange={async (e) => {
            if (e.target.value.trim() === "") {
              setResults(recentResults);
            }
            setSearchQuery(e.target.value);
            try {
              if (e.target.value.trim() !== "") {
                const results = await search(e.target.value.trim()).unwrap();
                setResults(results);
              }
            } catch (e) {
              console.log(e);
            }
          }}
          // value={searchQuery}
        />
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div>{error.data.status}</div>
        ) : searchQuery === "" ? (
          <Box sx={{ margin: "16px 12px" }}>
            <Typography variant="S16W500C65676b">
              {pageDictionary.recentResults}
            </Typography>
            <List>
              {recentResults.map((item) =>
                renderRecentItems(item.name, item.type, item._id)
              )}
            </List>
          </Box>
        ) : (
          <Box sx={{ margin: "16px 12px" }}>
            <Typography variant="S16W500C65676b">
              {pageDictionary.suggestedResults}
            </Typography>
            <List>
              {results.map((item) =>
                renderSearchItems(item.name, item.type, item._id)
              )}
            </List>
          </Box>
        )}
      </Box>
    </CustomAppBar>
  );
};
