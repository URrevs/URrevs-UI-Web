import { useTheme } from "@emotion/react";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import {
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES_NAMES from "../../../RoutesNames";
import {
  useAddToMyRecentSearchesMutation,
  useDeleteRecentSearchesMutation,
  useGetMyRecentSearchesQuery,
  useSearchAllMutation
} from "../../../services/search";
import { useAppSelector } from "../../../store/hooks";
import LoadingSpinner from "../../Loaders/LoadingSpinner";

export const SearchSuggestion = () => {
  const [searchSuggestion, setSearchSuggestion] = React.useState(false);
  const searchRef = React.useRef();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const user = useAppSelector((state) => state.auth);

  //RTK Autogenerated hooks
  const [recentResults, setRecentResults] = React.useState([]);
  let {
    isLoading,
    error,
    isFetching,
    data: fetchedRecentResults,
  } = useGetMyRecentSearchesQuery(
    {},
    {
      skip: !user.apiToken,
    }
  );

  // update recent search when request is done
  React.useEffect(() => {
    if (fetchedRecentResults) {
      setRecentResults(fetchedRecentResults);
    }
  }, [fetchedRecentResults, user.apiToken]);

  // clear recent search when user logout
  React.useEffect(() => {
    if (user.apiToken === "" || user.apiToken === null) {
      setRecentResults([]);
    }
  }, [user.apiToken]);

  const [search] = useSearchAllMutation();
  const [addRecentSearch] = useAddToMyRecentSearchesMutation();
  const [deleteRecentSearch] = useDeleteRecentSearchesMutation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  /* Dictionary */
  const pageDictionary = {
    search: textContainer.search,
    placeholder: textContainer.searchForAProductOrACompany,
    oldResults:
      recentResults === []
        ? textContainer.noItems // Replace it with new text
        : textContainer.previousSearchResults,
    suggestedResults: textContainer.suggestedResults,
    smartphone: textContainer.smartphone,
    company: textContainer.company,
  };

  const renderSearchItems = (title, type, id, index) => (
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
            setSearchQuery("");
            setSearchSuggestion(false);
            addRecentSearch({ type, id });

            const toBeAdded = recentResults.findIndex(
              (item) => item._id === id
            );

            if (toBeAdded > -1) {
              const newRecents = [...recentResults];
              console.log(toBeAdded);
              newRecents.splice(toBeAdded, 1);

              setRecentResults([
                { name: title, type: type, _id: id },
                ...newRecents,
              ]);
            } else {
              setRecentResults([
                { name: title, type: type, _id: id },
                ...recentResults.slice(0, 4),
              ]);
            }

            type === "phone"
              ? navigate(
                  `/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.SPECS}?pid=${id}`
                )
              : navigate(
                  `/${ROUTES_NAMES.COMPANY_PROFILE}/${ROUTES_NAMES.REVIEWS}?cid=${id}`
                );
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
      {results.length - 1 !== index && (
        <Divider sx={{ padding: 0, color: theme.palette.divider }} />
      )}
    </React.Fragment>
  );

  const renderRecentItems = (title, type, id, index) => (
    <React.Fragment key={id}>
      <ListItem sx={{ padding: 0, margin: 0, lineHeight: 0 }}>
        <ListItemButton
          sx={{
            padding: 0,
          }}
          onClick={() => {
            //Navigate to that phone
            setSearchQuery("");
            setSearchSuggestion(false);

            const toBeAdded = recentResults.findIndex(
              (item) => item._id === id
            );

            if (toBeAdded > -1) {
              const newRecents = [...recentResults];
              console.log(toBeAdded);
              newRecents.splice(toBeAdded, 1);

              setRecentResults([
                { name: title, type: type, _id: id },
                ...newRecents,
              ]);
            }

            type === "phone"
              ? navigate(
                  `/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.SPECS}?pid=${id}`
                )
              : navigate(
                  `/${ROUTES_NAMES.COMPANY_PROFILE}/${ROUTES_NAMES.REVIEWS}?cid=${id}`
                );
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
            let temp = recentResults;
            temp = temp.filter((result) => result._id != id);
            setRecentResults(temp);
            deleteRecentSearch({ id: id });
          }}
        >
          <CloseOutlinedIcon
            sx={{ fontSize: "20px", color: theme.palette.cancel }}
          />
        </IconButton>
      </ListItem>
      {recentResults.length - 1 !== index && (
        <Divider sx={{ padding: 0, color: theme.palette.divider }} />
      )}
    </React.Fragment>
  );

  React.useEffect(() => {
    if (searchQuery === "" && recentResults) setResults(recentResults);
  }, [searchQuery, recentResults]);

  /* Close SearchSuggestion on window resize*/
  React.useEffect(() => {
    function handleResize() {
      setSearchSuggestion(false);
    }
    //On window resize close the suggestion
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const handleClickAway = () => {
    setSearchSuggestion(false);
  };
  const params = {
    variant: "standard",
    autoComplete: "off",
    sx: {
      flex: 1,
      // width: "100",
      input: {
        "&::placeholder": {
          opacity: 1,
          fontWeight: 300,
          fontSize: 16,
        },
      },
    },
    placeholder: pageDictionary.placeholder,
    InputProps: {
      // type: "search",
      disableUnderline: true,
      startAdornment: (
        <InputAdornment position="start">
          <IconButton onClick={() => {}}>
            <SearchIcon htmlColor={theme.palette.deskTopSearchBar.searchIcon} />
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
        // border: `0.1px solid ${theme.palette.textField.borderColor} `,
        //
        // borderRadius: TEXT_FIELD_BORDER_RADIUS,
        // border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
      },
    },
  };
  return (
    <React.Fragment>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <div>
          <TextField
            {...params}
            ref={searchRef}
            sx={{ padding: "0px 15px", width: "100%" }}
            onClick={() => {
              setSearchSuggestion(true);
            }}
            value={searchQuery}
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
          />
          {searchSuggestion ? (
            <Paper
              sx={{
                position: "absolute",
                // top: theme.sideBar.height,
                // left: "150px",
                width: searchRef.current?.offsetWidth
                  ? searchRef.current.offsetWidth
                  : "",
                // height: "20vh",
                zIndex: 1,
              }}
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : error ? (
                <div>{error.data.status}</div>
              ) : searchQuery === "" ? (
                <Box sx={{ margin: "16px 12px 0px 12px" }}>
                  <Typography variant="S16W500C65676b">
                    {pageDictionary.oldResults}
                  </Typography>
                  <List>
                    {recentResults.map((item, index) =>
                      renderRecentItems(item.name, item.type, item._id, index)
                    )}
                  </List>
                </Box>
              ) : (
                <Box sx={{ margin: "16px 12px 0px 12px" }}>
                  <Typography variant="S16W500C65676b">
                    {pageDictionary.suggestedResults}
                  </Typography>
                  <List>
                    {results.map((item, index) =>
                      renderSearchItems(item.name, item.type, item._id, index)
                    )}
                  </List>
                </Box>
              )}
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    </React.Fragment>
  );
};
