import { Typography } from "@mui/material";

const BodyCardText = ({ text, title }) => {
  const prosConsTitle = (title) => (
    <div
      style={{
        padding: "12px 0 0px 0",
      }}
    >
      <Typography
        variant="S18W500C050505"
        style={{
          padding: 0,
          paddingTop: "16px",
          margin: "0",
        }}
      >
        {`${title}`}
      </Typography>
    </div>
  );
  return (
    <div>
      {prosConsTitle(title)}
      <Typography variant="S16W400C050505">{text}</Typography>
      {`\n`}
    </div>
  );
};

export default BodyCardText;
