import { Star } from "@mui/icons-material";
import { FacebookButton } from "../Components/Authentication/FacebookButton";
import { GoogleButton } from "../Components/Authentication/GoogleButton";
import LeaderboardEntry from "../Components/Leaderboard/LeaderboardEntry";

const ComponentsTest = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#FFF",
      }}
    >
      <br />
      <GoogleButton />
      <br />
      <FacebookButton />
      <br />
      <LeaderboardEntry />
      <Star />
      <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 841.9 595.3">
        <g fill="#61DAFB">
          <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" />
          <circle cx="420.9" cy="296.5" r="45.7" />
          <path d="M520.5 78.1z" />
        </g>
      </svg>
      {/* <img width={48} height={48} src="./images/google.png" />
      <img width={48} height={48} src="./images/google1.png" /> */}
      <img
        alt="svgImg"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGc+PHBhdGggZD0iTTE1Ni4yNzI3NSw3MS45NjQwOGgtNS43NzI3NXYtMC4yOTc0MmgtNjQuNXYyOC42NjY2N2g0MC41MDI0MmMtNS45MDg5MiwxNi42ODc1OCAtMjEuNzg2NjcsMjguNjY2NjcgLTQwLjUwMjQyLDI4LjY2NjY3Yy0yMy43NDY3NSwwIC00MywtMTkuMjUzMjUgLTQzLC00M2MwLC0yMy43NDY3NSAxOS4yNTMyNSwtNDMgNDMsLTQzYzEwLjk2MTQyLDAgMjAuOTMzODMsNC4xMzUxNyAyOC41MjY5MiwxMC44ODk3NWwyMC4yNzA5MiwtMjAuMjcwOTJjLTEyLjc5OTY3LC0xMS45Mjg5MiAtMjkuOTIwODMsLTE5LjI4NTUgLTQ4Ljc5NzgzLC0xOS4yODU1Yy0zOS41Nzc5MiwwIC03MS42NjY2NywzMi4wODg3NSAtNzEuNjY2NjcsNzEuNjY2NjdjMCwzOS41Nzc5MiAzMi4wODg3NSw3MS42NjY2NyA3MS42NjY2Nyw3MS42NjY2N2MzOS41Nzc5MiwwIDcxLjY2NjY3LC0zMi4wODg3NSA3MS42NjY2NywtNzEuNjY2NjdjMCwtNC44MDUyNSAtMC40OTQ1LC05LjQ5NTgzIC0xLjM5MzkyLC0xNC4wMzU5MnoiIGZpbGw9IiNmZmMxMDciPjwvcGF0aD48cGF0aCBkPSJNMjIuNTk2NSw1Mi42NDI3NWwyMy41NDYwOCwxNy4yNjgwOGM2LjM3MTE3LC0xNS43NzM4MyAyMS44MDEsLTI2LjkxMDgzIDM5Ljg1NzQyLC0yNi45MTA4M2MxMC45NjE0MiwwIDIwLjkzMzgzLDQuMTM1MTcgMjguNTI2OTIsMTAuODg5NzVsMjAuMjcwOTIsLTIwLjI3MDkyYy0xMi43OTk2NywtMTEuOTI4OTIgLTI5LjkyMDgzLC0xOS4yODU1IC00OC43OTc4MywtMTkuMjg1NWMtMjcuNTI3MTcsMCAtNTEuMzk5MzMsMTUuNTQwOTIgLTYzLjQwMzUsMzguMzA5NDJ6IiBmaWxsPSIjZmYzZDAwIj48L3BhdGg+PHBhdGggZD0iTTg2LDE1Ny42NjY2N2MxOC41MTE1LDAgMzUuMzMxNjcsLTcuMDg0MjUgNDguMDQ4OTIsLTE4LjYwNDY3bC0yMi4xODA4MywtMTguNzY5NWMtNy4xOTUzMyw1LjQ1MDI1IC0xNi4xMzkzMyw4LjcwNzUgLTI1Ljg2ODA4LDguNzA3NWMtMTguNjQwNSwwIC0zNC40NjgwOCwtMTEuODg1OTIgLTQwLjQzMDc1LC0yOC40NzMxN2wtMjMuMzcwNSwxOC4wMDYyNWMxMS44NjA4MywyMy4yMDkyNSAzNS45NDgsMzkuMTMzNTggNjMuODAxMjUsMzkuMTMzNTh6IiBmaWxsPSIjNGNhZjUwIj48L3BhdGg+PHBhdGggZD0iTTE1Ni4yNzI3NSw3MS45NjQwOGgtNS43NzI3NXYtMC4yOTc0MmgtNjQuNXYyOC42NjY2N2g0MC41MDI0MmMtMi44MzgsOC4wMTU5MiAtNy45OTQ0MiwxNC45MjgxNyAtMTQuNjQ1MDgsMTkuOTYyNzVjMC4wMDM1OCwtMC4wMDM1OCAwLjAwNzE3LC0wLjAwMzU4IDAuMDEwNzUsLTAuMDA3MTdsMjIuMTgwODMsMTguNzY5NWMtMS41Njk1LDEuNDI2MTcgMjMuNjE3NzUsLTE3LjIyNTA4IDIzLjYxNzc1LC01My4wNTg0MmMwLC00LjgwNTI1IC0wLjQ5NDUsLTkuNDk1ODMgLTEuMzkzOTIsLTE0LjAzNTkyeiIgZmlsbD0iIzE5NzZkMiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
      />
      <div>dasdna </div>
      <div>dasdna </div>
      <div>dasdna </div>
      <div>dasdna </div>
      <div>dasdna </div>
    </div>
  );
};

export default ComponentsTest;
