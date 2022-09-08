import React, { useEffect, useState } from "react";
import { useImageQueue } from "../../../store/imageQueueStore";

import { doMakeImage } from "../../../api";

import { useQuery } from "@tanstack/react-query";
import GeneratedImage from "../generatedImage";

export default function CurrentImage() {
  const [imageData, setImageData] = useState(null);
  const { id, options } = useImageQueue((state) => state.firstInQueue()) as any;
  const { status, data } = useQuery(["makeImage", id], async () => {
    // debugger;
    // let cleanOptions = { ...options };
    // // turn all the tags into a string
    // cleanOptions.prompt += cleanOptions.tags.join(" ");
    // delete cleanOptions.tags;
    // debugger;
    return await doMakeImage(options);
  });

  useEffect(() => {
    // query is done
    if (status === "success") {
      console.log("success");

      // check to make sure that the image was created
      if (data.status === "succeeded") {
        console.log("succeeded");
        setImageData(data.output[0].data);
      }
    }
  }, [status, data]);

  return (
    <div className="display-panel">
      <h1>Current Image</h1>
      {imageData && <GeneratedImage imageData={imageData} />}
    </div>
  );
}
