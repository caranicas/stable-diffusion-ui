import React from "react";

export default function GeneratedImage({ imageData }: { imageData: string }) {

  const _handleSave = () => {
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = imageData;
    link.click();
  };

  const _handleUseAsInput = () => {
    console.log(" TODO : use as input");
    // imgUseBtn.addEventListener('click', function() {
    //   initImageSelector.value = null
    //   initImagePreview.src = imgBody

    //   initImagePreviewContainer.style.display = 'block'
    //   promptStrengthContainer.style.display = 'block'

    //   // maskSetting.style.display = 'block'

    //   randomSeedField.checked = false
    //   seedField.value = seed
    //   seedField.disabled = false
    // })
  }

  return (
    <div className="generated-image">
      <p>Your image</p>
      <img src={imageData} alt="generated" />
      <button onClick={_handleSave}>
        Save
      </button>
      <button onClick={_handleUseAsInput}>
        Use as Input
      </button>
    </div>
  );
}


