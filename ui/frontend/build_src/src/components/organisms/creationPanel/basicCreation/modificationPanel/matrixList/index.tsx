/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useRef } from "react";


import { usePromptMatrix } from "../../../../../../stores/promptMatrixStore";
import { useImageCreate } from "../../../../../../stores/imageCreateStore";

import {
  buttonStyle
} from "../../../../../_recipes/button.css";

import {
  matrixListMain
} from "./matrixList.css";

interface Props {
  className?: string;
}

export default function MatrixList({ className }: Props) {

  const promptsList = usePromptMatrix((state) => state.promptsList);
  const positivePrompt = useImageCreate((state) => state.getValueForRequestKey("prompt"));
  const negativePrompt = useImageCreate((state) => state.getValueForRequestKey("negative_prompt"));

  return (
    <div className={matrixListMain}>
      {promptsList.map((prompt) => (
        <div key={prompt.queueId}>
          <p>
            + {positivePrompt}
          </p>
          <p>
            - {negativePrompt}
          </p>
          {prompt.options.map((option) => (
            <div key={option.id}>
              {option.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}