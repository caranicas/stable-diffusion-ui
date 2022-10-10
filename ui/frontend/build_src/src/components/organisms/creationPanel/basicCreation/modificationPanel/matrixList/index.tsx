/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useRef } from "react";

import {
  card
} from "../../../../../_recipes/card.css";

import { useImageCreate } from "../../../../../../stores/imageCreateStore";

import {
  buttonStyle
} from "../../../../../_recipes/button.css";

interface Props {
  className?: string;
}

export default function MatrixList({ className }: Props) {

  return (
    <div className={card({
      level: 'down'
    })}>
    </div>);
}