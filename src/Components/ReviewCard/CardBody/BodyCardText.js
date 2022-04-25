import { Typography } from "@mui/material";

const BodyCardText = ({ text, title }) => {
  const prosConsTitle = (title) => (
    <div>
      <Typography
        variant="S18W500C050505"
        style={{
          padding: 0,
          paddingTop: 10,
          padding: "12px 0 6px 0",
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
