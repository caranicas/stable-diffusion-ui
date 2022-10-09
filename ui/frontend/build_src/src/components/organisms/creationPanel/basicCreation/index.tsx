import React from "react";

import {
  CreationBasicMain,
} from "./basicCreation.css";


import MakeButton from "./makeButton";
import ModifyPrompt from "./modifyPrompt";
import RequestCount from "./requestCount";
import PromptCreator from "./promptCreator";
import SeedImage from "./seedImage";
import ModificationPanel from "./modificationPanel";

export default function BasicCreation() {
  return (
    <div className={CreationBasicMain}>

      <PromptCreator></PromptCreator>
      <SeedImage></SeedImage>
      {/* just an example of tailwinds */}
      <div className="flex flex-wrap justify-between">
        <MakeButton className="basis-1/2"></MakeButton>
        <ModifyPrompt className="basis-3/8"></ModifyPrompt>
        <RequestCount className="basis-1/1"></RequestCount>
      </div>



      <ModificationPanel></ModificationPanel>



    </div>
  );
}
