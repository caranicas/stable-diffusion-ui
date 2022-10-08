import React, { ChangeEvent } from "react";

import BasicCreation from "./basicCreation";
import AdvancedSettings from "./advancedSettings";
import ImageModifiers from "./imageModifiers";
import InpaintingPanel from "./inpaintingPanel";

import QueueDisplay from "../queueDisplay";

// this works but causes type errors so its not worth it for now
// import { useImageCreate } from "@stores/imageCreateStore.ts";

import { useImageCreate } from "../../../stores/imageCreateStore";
import { useRequestQueue } from "../../../stores/requestQueueStore";


import {
  CreationPaneMain,
  InpaintingSlider,
} from "./creationPanel.css";


export default function CreationPanel() {
  const isInPaintingMode = useImageCreate((state) => state.isInpainting);

  const hasQueue = useRequestQueue((state) => state.hasAnyQueue());

  return (
    <>
      <div className={CreationPaneMain}>
        <BasicCreation></BasicCreation>
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
