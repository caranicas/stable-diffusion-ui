/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useRef } from "react";

import { useImageCreate } from "../../../../../stores/imageCreateStore";

import {
  buttonStyle
} from "../../../../_recipes/button.css";

interface Props {
  className?: string;
}

export default function ModifyPrompt({ className }: Props) {

  const makeNewPropt = () => {
  };

  return (
    <button
      className={[className, buttonStyle({
        color: 'secondary',
      })].join(" ")}
      onClick={makeNewPropt}
    >
      Modify Prompt
    </button>
  );
}