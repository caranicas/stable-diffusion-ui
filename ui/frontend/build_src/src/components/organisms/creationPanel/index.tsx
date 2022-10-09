import React from "react";

import BasicCreation from "./basicCreation";
import PromptMatrix from "./promptMatrix";
import AdvancedSettings from "./advancedSettings";
import ImageModifiers from "./imageModifiers";
import InpaintingPanel from "./inpaintingPanel";

// this works but causes type errors so its not worth it for now
// import { useImageCreate } from "@stores/imageCreateStore.ts";

import { useImageCreate } from "../../../stores/imageCreateStore";

import {
  CreationPaneMain,
  InpaintingSlider,
} from "./creationPanel.css";


export default function CreationPanel() {
  const isInPaintingMode = useImageCreate((state) => state.isInpainting);


  return (
    <>
      <div className={CreationPaneMain}>
        <BasicCreation></BasicCreation>
        <PromptMatrix></PromptMatrix>
        <AdvancedSettings></AdvancedSettings>
        <ImageModifiers></ImageModifiers>
      </div>

      {isInPaintingMode && (
        <div className={InpaintingSlider}>
          <InpaintingPanel></InpaintingPanel>
        </div>
      )}
    </>
  );
}
