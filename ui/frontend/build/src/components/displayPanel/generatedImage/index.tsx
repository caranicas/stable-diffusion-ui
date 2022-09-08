import React from "react";

export default function GeneratedImage({ imageData }: { imageData: string }) {
  return (
    <div className="generated-image">
      <p>Your image</p>
      <img src={imageData} alt="generated" />
    </div>
  );
}
