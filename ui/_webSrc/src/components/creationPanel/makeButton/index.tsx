import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useImageCreate } from "../../../store/imageCreateStore";
import { doMakeImage } from "../../../api"; 

export default function MakeButton() {
 
  const imageOptions = useImageCreate((state) => state.imageOptions);

  console.log('MakeButton: imageOptions', imageOptions);

  // const { data, refetch } = useQuery(['makeImage', imageOptions], doMakeImage(imageOptions), {
  //   refetchOnWindowFocus: false,
  //   enabled: false // disable this query from automatically running
  // });

  const makeImage = () => {
    // console.log("makeImage");
    // debugger;
    // refetch();
  };

  return (
     <button onClick={makeImage}>Make</button>
  );
}