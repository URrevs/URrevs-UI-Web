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

const rows = {
  price: 3400,
  manufacturingCompany: "Nokia",
  releaseDate: "2018/3",
  productDimensions: "158 x 75 x 8 mm",
  networkType: "GSM / HSPA / LTE",
  productWeight: "181 gram",
  simCard: "hybrid dual sim (nano-sim)",
  displayType: "Super AMOLED, 120Hz, HDR10, 700 nits, 1200 nits (peak)",
  displaySize: "6.67 inches, 107.4 cm2 (~86.0% screen-to-body ratio)",
  displayResolution: "1080 x 2400 pixels, 20:9 ratio (~395 ppi density)",
  screenProtection: "Corning Gorilla Glass 3",
  operatingSystem: "Android 11, MIUI 12.5",
  chipset: "MediaTek Helio G88 (12nm)",
  CPU: "Octa-core (2x2.0 GHz Cortex-A75 & 6x1.8 GHz Cortex-A55)",
  GPU: "Mali-G52 MC2",
  externalMemory: "microSDXC (dedicated slot)",
  internalMemory: "64GB 4GB RAM, 128GB 4GB RAM, 128GB 6GB RAM",
  mainCamera:
    "Quad 50 MP, f/1.8, (wide), PDAF 8 MP, f/2.2, 120˚ (ultrawide) 2 MP, f/2.4, (macro) 2 MP, f/2.4 (depth)",
  frontCamera: "Single 8 MP, f/2.0, (wide), 1/4.0”, 1.12µm",
  loudSpeakers: "Yes, with stereo speakers",
  jack3_5: "Yes",
  wlan: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot",
  bluetooth: "5.1, A2DP, LE",
  GPS: "Yes, with A-GPS, GLONASS, GALILEO, BDS",
  NFC: "Yes (market/region dependent)",
  radio: "FM radio",
  USB: "USB Type-C 2.0",
  sensors: "Fingerprint (side-mounted), accelerometer, proximity, compass",
  battery: "Li-Po 5000 mAh, non-removable",
  charging: "Fast charging 18W Reverse charging 9W",
};

const ProductDetailsTable = ({
  isComparison,
  comparedRows,
  comparedBrand = "Oppo",
  brand = "Oppo",
  comparedProduct = "Reno",
  product = "Reno",
}) => {
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
  comparedRows = rows;
  return (
    <div style={{ overflowX: "auto", margin: "10px", padding: "10px" }}>
      <Paper
        sx={{
          borderRadius: "15px",
          padding: "0 10px",
          boxShadow: 3,
        }}
      >
        <Table>
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
                  src={`https://d3tygoy974vfbk.cloudfront.net/images/phones/${encodeURIComponent(
                    `${brand} ${product}`
                  )}.jpg`}
                  alt={`${brand} ${product}`}
                />,
                <img
                  loading="auto"
                  src={`https://d3tygoy974vfbk.cloudfront.net/images/phones/${encodeURIComponent(
                    `${comparedBrand} ${comparedProduct}`
                  )}.jpg`}
                  alt={`${comparedBrand} ${comparedProduct}`}
                />
              )}
          </TableHead>
          <TableBody>
            {productEntries.map((key, index) => {
              return (
                <TableRow key={key}>
                  <TableCell
                    sx={{
                      borderBottom:
                        index != productEntries.length - 1
                          ? borderBottom
                          : "none",
                      borderRight: borderRight,
                    }}
                    align={isComparison ? "center" : "left"}
                  >
                    <Typography variant="S16W500C050505">
                      {textContainer[key]}:
                    </Typography>
                  </TableCell>
                  {/* main product details */}
                  <TableCell
                    sx={{
                      borderBottom:
                        index != productEntries.length - 1
                          ? borderBottom
                          : "none",
                      borderRight: borderRight,
                    }}
                    align="center"
                  >
                    <Button variant="text">
                      <Typography
                        dir="ltr"
                        variant={
                          key === "manufacturingCompany"
                            ? "S16W900C050505"
                            : "S16W400C050505"
                        }
                        style={{
                          textDecoration:
                            key === "manufacturingCompany"
                              ? "underline"
                              : "none",
                        }}
                      >
                        {rows[key]}
                      </Typography>
                    </Button>
                  </TableCell>
                  {/* compared product details */}
                  {isComparison && (
                    <TableCell
                      sx={{
                        borderBottom:
                          index != productEntries.length - 1
                            ? borderBottom
                            : "none",
                      }}
                      align="center"
                    >
                      <Button variant="text">
                        <Typography
                          dir="ltr"
                          variant={
                            key === "manufacturingCompany"
                              ? "S16W900C050505"
                              : "S16W400C050505"
                          }
                          style={{
                            textDecoration:
                              key === "manufacturingCompany"
                                ? "underline"
                                : "none",
                          }}
                        >
                          {comparedRows[key]}
                        </Typography>
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default ProductDetailsTable;
