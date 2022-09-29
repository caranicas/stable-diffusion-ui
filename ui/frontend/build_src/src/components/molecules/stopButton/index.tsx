import React from "react";
import { doStopImage } from "../../../api";

import { BrandedButton } from "../../../styles/shared.css";

export default function StopButton() {

  const stopMake = async () => {
    try {
      const res = await doStopImage();
    } catch (e) {
      console.log(e);
    }
  };

  return <button className={BrandedButton} onClick={() => void stopMake()}>Stop</button>;
}