import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { keyframes, useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import Button from "@mui/material/Button";

const ProductDetailsTable = ({
  // rows = {},
  phoneData = {},
  isComparison,
  comparedRows,
  comparedBrand = "Oppo",
  brand = "Oppo",
  comparedProduct = "Reno",
  product = "Reno",
}) => {
  const rows = {
    price: phoneData.priceEgp,
    manufacturingCompany: phoneData.companyName,
    releaseDate: phoneData.releaseDate,
    productDimensions: phoneData.dimensions,
    networkType: phoneData.network,
    productWeight: "مجهول",
    simCard: "مجهول",
    displayType: "مجهول",
    displaySize: "مجهول",
    displayResolution: "مجهول",
    screenProtection: phoneData.screenProtection,
    operatingSystem: phoneData.os,
    chipset: phoneData.chipset,
    CPU: phoneData.cpu,
    GPU: phoneData.gpu,
    externalMemory: phoneData.externalMem,
    internalMemory: phoneData.internalMem,
    mainCamera: phoneData.mainCam,
    frontCamera: phoneData.selfieCam,
    loudSpeakers: phoneData.loudspeaker,
    jack3_5: phoneData.slot3p5mm,
    wlan: phoneData.wlan,
    bluetooth: phoneData.bluetooth,
    GPS: phoneData.gps,
    NFC: phoneData.nfc,
    radio: phoneData.radio,
    USB: phoneData.usb,
    sensors: phoneData.sensors,
    battery: phoneData.battery,
    charging: phoneData.charging,
  };
  const theme = useTheme();

  const productEntries = Object.keys(rows);

  const textContainer = useAppSelector((state) => state.language.textContainer);

  const borderBottom = `1px solid ${theme.palette.divider}`;
  const borderRight = isComparison
    ? `1px solid ${theme.palette.divider}`
    : "none";

  const tableRow = (firstCell, secondCell, thirdCell) => {
    return (
      <TableRow key={firstCell}>
        <TableCell
          sx={{
            borderBottom: borderBottom,
            borderRight: borderRight,
          }}
          align={isComparison ? "center" : "left"}
        >
          <Typography variant="S16W500C050505">{firstCell}:</Typography>
        </TableCell>
        {/* main product details */}
        <TableCell
          sx={{
            borderBottom: borderBottom,
            borderRight: borderRight,
          }}
          align="center"
        >
          <Typography dir="ltr" variant="S16W400C050505">
            {secondCell}
          </Typography>
        </TableCell>
        {/* compared product details */}
        {isComparison && (
          <TableCell
            sx={{
              borderBottom: borderBottom,
            }}
            align="center"
          >
            <Typography dir="ltr" variant="S16W400C050505">
              {thirdCell}
            </Typography>
          </TableCell>
        )}
      </TableRow>
    );
  };

  const titleCell = (index, key) => {
    return (
      <TableCell
        sx={{
          borderBottom:
            index != productEntries.length - 1 ? borderBottom : "none",
          borderRight: borderRight,
        }}
        align={isComparison ? "center" : "left"}
      >
        <Typography variant="S16W500C050505">{textContainer[key]}:</Typography>
      </TableCell>
    );
  };

  const dataCell = (index, key) => {
    return (
      <TableCell
        sx={{
          borderBottom:
            index != productEntries.length - 1 ? borderBottom : "none",
          borderRight: borderRight,
        }}
        align="center"
      >
        <Button
          variant="text"
          disabled={key != "manufacturingCompany"}
          sx={{
            textTransform: "none",
          }}
        >
          <Typography
            dir={key === "price" && theme.direction === "rtl" ? "rtl" : "ltr"}
            variant={
              key === "manufacturingCompany"
                ? "S16W900C050505"
                : "S16W400C050505"
            }
            style={{
              textDecoration:
                key === "manufacturingCompany" ? "underline" : "none",
            }}
          >
            {key === "price"
              ? rows[key] + " " + textContainer.egyptianPound
              : rows[key]}
          </Typography>
        </Button>
      </TableCell>
    );
  };

  comparedRows = rows;
  return (
    <Paper
      sx={{
        borderRadius: "15px",
        padding: "0 10px",
        boxShadow: 3,
        overflow: "auto",
      }}
    >
      <Table style={{ overflow: "auto", maxWidth: "100%" }}>
        <TableHead>
          {isComparison && (
            <TableRow key={textContainer.productName}>
              <TableCell
                sx={{
                  borderBottom: borderBottom,
                  borderRight: borderRight,
                }}
                align={isComparison ? "center" : "left"}
              >
                <Typography variant="S16W500C050505">
                  {textContainer.productName}:
                </Typography>
              </TableCell>
              {/* main product details */}
              <TableCell
                sx={{
                  borderBottom: borderBottom,
                  borderRight: borderRight,
                }}
                align="center"
              >
                <Typography dir="ltr" variant="S20W500C050505">
                  {product}
                </Typography>
              </TableCell>
              {/* compared product details */}
              {isComparison && (
                <TableCell
                  sx={{
                    borderBottom: borderBottom,
                  }}
                  align="center"
                >
                  <Typography dir="ltr" variant="S20W500C050505">
                    {comparedProduct}
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          )}
          {isComparison &&
            tableRow(
              textContainer.productImage,
              <img
                loading="auto"
                width="40px"
                height="40px"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Acer_Logo.svg"
                alt={`${brand} ${product}`}
              />,
              <img
                loading="auto"
                width="40px"
                height="40px"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Acer_Logo.svg"
                alt={`${comparedBrand} ${comparedProduct}`}
              />
            )}
        </TableHead>
        <TableBody>
          {productEntries.map((key, index) => {
            return (
              <TableRow key={key}>
                {/* title */}
                {titleCell(index, key)}
                {/* main product details */}
                {dataCell(index, key)}
                {/* compared product details */}
                {isComparison && dataCell(index, key)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProductDetailsTable;
