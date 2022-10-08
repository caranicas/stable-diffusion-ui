import React, { ChangeEvent } from "react";
import { useImageDisplay } from "../../../../stores/imageDisplayStore";

import {
  CreationBasicMain,
  PromptDisplay,
} from "./basicCreation.css";

import Checkbox from "../../../atoms/headlessCheckbox";

import MakeButton from "../../../molecules/makeButton";
import PromptCreator from "./promptCreator";
import SeedImage from "./seedImage";

export default function BasicCreation() {

  const shouldDisplayWhenComplete = useImageDisplay((state) => state.shouldDisplayWhenComplete);
  const toggleDisplayComplete = useImageDisplay((state) => state.toggleDisplayComplete);


  return (
    <div className={CreationBasicMain}>
      <MakeButton></MakeButton>
      <PromptCreator></PromptCreator>
      <SeedImage></SeedImage>

      <Checkbox
        isChecked={shouldDisplayWhenComplete}
        label="Display Completed"
        toggleCheck={toggleDisplayComplete}
      ></Checkbox>
    </div>
  );
}
