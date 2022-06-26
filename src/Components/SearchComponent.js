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
  const [searchQuery, setSearchQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [lock, setLock] = React.useState(false);
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
              input: {
                "&::placeholder": {
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
                  {lock ? (
                    <IconButton
                      onClick={() => {
                        setSearchQuery("");
                        if (searchQuery !== "")
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
          />
        )}
      />
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: "The Shawshank Redemption", year: 1994 },
//   { title: "The Godfather", year: 1972 },
//   { title: "The Godfather: Part II", year: 1974 },
//   { title: "The Dark Knight", year: 2008 },
//   { title: "12 Angry Men", year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: "Pulp Fiction", year: 1994 },
//   {
//     title: "The Lord of the Rings: The Return of the King",
//     year: 2003,
//   },
//   { title: "The Good, the Bad and the Ugly", year: 1966 },
//   { title: "Fight Club", year: 1999 },
//   {
//     title: "The Lord of the Rings: The Fellowship of the Ring",
//     year: 2001,
//   },
//   {
//     title: "Star Wars: Episode V - The Empire Strikes Back",
//     year: 1980,
//   },
//   { title: "Forrest Gump", year: 1994 },
//   { title: "Inception", year: 2010 },
//   {
//     title: "The Lord of the Rings: The Two Towers",
//     year: 2002,
//   },
//   { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   { title: "Goodfellas", year: 1990 },
//   { title: "The Matrix", year: 1999 },
//   { title: "Seven Samurai", year: 1954 },
//   {
//     title: "Star Wars: Episode IV - A New Hope",
//     year: 1977,
//   },
//   { title: "City of God", year: 2002 },
//   { title: "Se7en", year: 1995 },
//   { title: "The Silence of the Lambs", year: 1991 },
//   { title: "It's a Wonderful Life", year: 1946 },
//   { title: "Life Is Beautiful", year: 1997 },
//   { title: "The Usual Suspects", year: 1995 },
//   { title: "Léon: The Professional", year: 1994 },
//   { title: "Spirited Away", year: 2001 },
//   { title: "Saving Private Ryan", year: 1998 },
//   { title: "Once Upon a Time in the West", year: 1968 },
//   { title: "American History X", year: 1998 },
//   { title: "Interstellar", year: 2014 },
//   { title: "Casablanca", year: 1942 },
//   { title: "City Lights", year: 1931 },
//   { title: "Psycho", year: 1960 },
//   { title: "The Green Mile", year: 1999 },
//   { title: "The Intouchables", year: 2011 },
//   { title: "Modern Times", year: 1936 },
//   { title: "Raiders of the Lost Ark", year: 1981 },
//   { title: "Rear Window", year: 1954 },
//   { title: "The Pianist", year: 2002 },
//   { title: "The Departed", year: 2006 },
//   { title: "Terminator 2: Judgment Day", year: 1991 },
//   { title: "Back to the Future", year: 1985 },
//   { title: "Whiplash", year: 2014 },
//   { title: "Gladiator", year: 2000 },
//   { title: "Memento", year: 2000 },
//   { title: "The Prestige", year: 2006 },
//   { title: "The Lion King", year: 1994 },
//   { title: "Apocalypse Now", year: 1979 },
//   { title: "Alien", year: 1979 },
//   { title: "Sunset Boulevard", year: 1950 },
//   {
//     title:
//       "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
//     year: 1964,
//   },
//   { title: "The Great Dictator", year: 1940 },
//   { title: "Cinema Paradiso", year: 1988 },
//   { title: "The Lives of Others", year: 2006 },
//   { title: "Grave of the Fireflies", year: 1988 },
//   { title: "Paths of Glory", year: 1957 },
//   { title: "Django Unchained", year: 2012 },
//   { title: "The Shining", year: 1980 },
//   { title: "WALL·E", year: 2008 },
//   { title: "American Beauty", year: 1999 },
//   { title: "The Dark Knight Rises", year: 2012 },
//   { title: "Princess Mononoke", year: 1997 },
//   { title: "Aliens", year: 1986 },
//   { title: "Oldboy", year: 2003 },
//   { title: "Once Upon a Time in America", year: 1984 },
//   { title: "Witness for the Prosecution", year: 1957 },
//   { title: "Das Boot", year: 1981 },
//   { title: "Citizen Kane", year: 1941 },
//   { title: "North by Northwest", year: 1959 },
//   { title: "Vertigo", year: 1958 },
//   {
//     title: "Star Wars: Episode VI - Return of the Jedi",
//     year: 1983,
//   },
//   { title: "Reservoir Dogs", year: 1992 },
//   { title: "Braveheart", year: 1995 },
//   { title: "M", year: 1931 },
//   { title: "Requiem for a Dream", year: 2000 },
//   { title: "Amélie", year: 2001 },
//   { title: "A Clockwork Orange", year: 1971 },
//   { title: "Like Stars on Earth", year: 2007 },
//   { title: "Taxi Driver", year: 1976 },
//   { title: "Lawrence of Arabia", year: 1962 },
//   { title: "Double Indemnity", year: 1944 },
//   {
//     title: "Eternal Sunshine of the Spotless Mind",
//     year: 2004,
//   },
//   { title: "Amadeus", year: 1984 },
//   { title: "To Kill a Mockingbird", year: 1962 },
//   { title: "Toy Story 3", year: 2010 },
//   { title: "Logan", year: 2017 },
//   { title: "Full Metal Jacket", year: 1987 },
//   { title: "Dangal", year: 2016 },
//   { title: "The Sting", year: 1973 },
//   { title: "2001: A Space Odyssey", year: 1968 },
//   { title: "Singin' in the Rain", year: 1952 },
//   { title: "Toy Story", year: 1995 },
//   { title: "Bicycle Thieves", year: 1948 },
//   { title: "The Kid", year: 1921 },
//   { title: "Inglourious Basterds", year: 2009 },
//   { title: "Snatch", year: 2000 },
//   { title: "3 Idiots", year: 2009 },
//   { title: "Monty Python and the Holy Grail", year: 1975 },
// ];
