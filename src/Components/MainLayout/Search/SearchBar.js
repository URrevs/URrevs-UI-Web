import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.searchBar.searchBarColor,
  "&:hover": {
    backgroundColor: alpha(theme.palette.searchBar.searchBarColor, 0.8),
  },
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));
export const SearchBar = (props) => {
  const theme = useTheme();

  return false ? (
    <div style={{ width: "100%" }}>{/* <SearchIcon /> */}</div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "0px 0px 0 0",
      }}
    >
      <Search
        sx={{
          borderRadius: 90,
          display: "block",
          width: "100%",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon htmlColor={theme.palette.searchIcon} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={props.searchTitle}
          inputProps={{ "aria-label": "search" }}
          onFocus={props.onSearchBarFocus}
          onBlur={props.onSearchBarBlur}
          sx={{ width: "100%" }}
        />
      </Search>
    </div>
  );
};
