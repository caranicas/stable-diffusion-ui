import React, { useEffect, useState } from "react";

import { useImageCreate } from "../../../../../stores/imageCreateStore";

import {
  RequestCountMain
} from "./requestCount.css";

interface Props {
  className?: string;
}


export default function RequestCount({ className }: Props) {

  const [totalRequests, setTotalRequests] = useState(1);
  const [imageText, setImageText] = useState("image");
  const [requestText, setRequestText] = useState("request");

  const parallelCount = useImageCreate((state) => state.parallelCount);
  const outputs = useImageCreate((state) =>
    state.getValueForRequestKey("num_outputs")
  );

  useEffect(() => {
    const total = Math.ceil(outputs / parallelCount);
    setTotalRequests(total);

    if (outputs === 1) {
      setImageText("image");
    } else {
      setImageText("images");
    }

    if (total === 1) {
      setRequestText("request");
    } else {
      setRequestText("requests");
    }

  }, [setTotalRequests, parallelCount, outputs]);

  return (
    <div className={[className, RequestCountMain].join(" ")}>
      <p>Making {outputs} {imageText} in {totalRequests} {requestText}</p>
    </div>
  );
};