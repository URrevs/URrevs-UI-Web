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
import { useNavigate } from "react-router-dom";

const ProductDetailsTable = ({
  // rows = {},
  phoneData = {},
  comparedPhoneData,
  isComparison,
}) => {
  const rows = {
    id: phoneData.companyId,
    price: Math.ceil(phoneData.priceEgp),
    manufacturingCompany: phoneData.companyName,
    releaseDate: phoneData.releaseDate,
    productDimensions: phoneData.dimensions,
    networkType: phoneData.network,
    productWeight: phoneData.weight,
    simCard: phoneData.sim,
    displayType: phoneData.screenType,
    displaySize: phoneData.screenSize,
    displayResolution: phoneData.screenResolution,
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
  let comparedRows = {};
  if (isComparison) {
    comparedRows = {
      id: comparedPhoneData.companyId,
      price: Math.ceil(comparedPhoneData.priceEgp),
      manufacturingCompany: comparedPhoneData.companyName,
      releaseDate: comparedPhoneData.releaseDate,
      productDimensions: comparedPhoneData.dimensions,
      networkType: comparedPhoneData.network,
      productWeight: comparedPhoneData.weight,
      simCard: comparedPhoneData.sim,
      displayType: comparedPhoneData.screenType,
      displaySize: comparedPhoneData.screenSize,
      displayResolution: comparedPhoneData.screenResolution,
      screenProtection: comparedPhoneData.screenProtection,
      operatingSystem: comparedPhoneData.os,
      chipset: comparedPhoneData.chipset,
      CPU: comparedPhoneData.cpu,
      GPU: comparedPhoneData.gpu,
      externalMemory: comparedPhoneData.externalMem,
      internalMemory: comparedPhoneData.internalMem,
      mainCamera: comparedPhoneData.mainCam,
      frontCamera: comparedPhoneData.selfieCam,
      loudSpeakers: comparedPhoneData.loudspeaker,
      jack3_5: comparedPhoneData.slot3p5mm,
      wlan: comparedPhoneData.wlan,
      bluetooth: comparedPhoneData.bluetooth,
      GPS: comparedPhoneData.gps,
      NFC: comparedPhoneData.nfc,
      radio: comparedPhoneData.radio,
      USB: comparedPhoneData.usb,
      sensors: comparedPhoneData.sensors,
      battery: comparedPhoneData.battery,
      charging: comparedPhoneData.charging,
    };
  }

  const theme = useTheme();
  const navigate = useNavigate();

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
      key != "id" && (
        <TableCell
          sx={{
            borderBottom:
              index != productEntries.length - 1 ? borderBottom : "none",
            borderRight: borderRight,
          }}
          align={isComparison ? "center" : "left"}
        >
          <Typography variant="S16W500C050505">
            {textContainer[key]}:
          </Typography>
        </TableCell>
      )
    );
  };

  const dataCell = (index, key, dataRow, compData) => {
    const data =
      key === "price"
        ? dataRow[key] + " " + textContainer.egyptianPound
        : dataRow[key];

    return (
      key != "id" && (
        <TableCell
          sx={{
            borderBottom:
              index !== productEntries.length - 1 ? borderBottom : "none",
            borderRight: compData ? "none" : borderRight,
          }}
          align="center"
        >
          <Button
            variant="text"
            disabled={key != "manufacturingCompany"}
            sx={{
              textTransform: "none",
            }}
            onClick={() => {
              navigate(`/company?cid=${dataRow.id}`);
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
              {data ?? "مجهول"}
            </Typography>
          </Button>
        </TableCell>
      )
    );
  };

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
                  {phoneData.name}
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
                    {comparedPhoneData.name}
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
                style={{
                  maxWidth: "94px",
                }}
                src={phoneData.picture}
                alt={`${phoneData.name}`}
              />,
              <img
                loading="auto"
                style={{
                  maxWidth: "94px",
                }}
                src={comparedPhoneData.picture}
                alt={`${comparedPhoneData.name}`}
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
                {dataCell(index, key, rows, false)}
                {/* compared product details */}
                {isComparison && dataCell(index, key, comparedRows, true)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProductDetailsTable;
