import { style, globalStyle } from "@vanilla-extract/css";

import { vars } from "../../../../styles/theme/index.css";

export const completedImagesMain = style({
  height: "100%",
  width: "100%",
  display: "flex",
  paddingBottom: vars.spacing.medium,
});

export const completedImagesList = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  height: "100%",
  width: "100%",
  overflow: "auto",
  paddingLeft: vars.spacing.none,
});

globalStyle(`${completedImagesMain} li`, {
  position: "relative",
});

globalStyle(`${completedImagesMain} > li:first-of-type`, {
  marginLeft: vars.spacing.medium,
});

globalStyle(`${completedImagesMain} > li:last-of-type`, {
  marginRight: 0,
});

export const imageContain = style({
  width: "206px",
  backgroundColor: "black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  border: "0 none",
  padding: "0",
  marginLeft: vars.spacing.medium,
  cursor: "pointer",
});

globalStyle(`${imageContain} img`, {
  width: "100%",
  objectFit: "contain",
});
