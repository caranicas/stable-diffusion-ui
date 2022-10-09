import React from "react";


// import { useImageCreate } from "../../../../stores/imageCreateStore";

import {
  PromptMatrixMain,
} from "./promptMatrix.css";

export default function PromptMatrix() {

  // const promptMatrix = useImageCreate((state) => state.promptMatrix);

  return (
    <div className={PromptMatrixMain}>
      <p>Prompt Matrix</p>
    </div>
  );
};
