import React, { ChangeEvent } from "react";

import MakeButton from "./makeButton";
import AdvancedSettings from "./advancedSettings";
import ImageModifiers from "./imageModifiers";

import ModifierTag from "./modierTag";

import { useImageCreate } from "../../store/imageCreateStore";

import './creationPanel.css';

export default function CreationPanel() {

  const promptText = useImageCreate((state) => state.getValueForRequestKey("prompt"));
  const setRequestOption = useImageCreate((state) => state.setRequestOptions);
  const selectedtags = useImageCreate((state) => state.selectedTags());

  const handlePromptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRequestOption("prompt", event.target.value);
  };

  const _handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("file select", event);
    const file = event.target.files[0];

    console.log("file", file);

    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     if (e.target) {
    //       setRequestOption("file", e.target.result);
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  return (
    <div className="create-panel">
      <div className="basic-create">
        <div className="prompt">
          <p>Prompt </p>
          <textarea value={promptText} onChange={handlePromptChange}></textarea>
        </div>

        {/* <div className="seed-image">
          <p>Seed Image</p>
          <input type="file" accept="image/*" />
        </div> */}


        <div id="editor-inputs-init-image" class="row">
          <label for="init_image"><b>Initial Image:</b> (optional) </label> 
            <input id="init_image" name="init_image" type="file"  onChange={_handleFileSelect}/><br/>
          <div id="init_image_preview_container" class="image_preview_container">
            <img id="init_image_preview" src="" width="100" height="100" />
            <button id="init_image_clear" class="image_clear_btn">X</button>
          </div>
        </div>

        <MakeButton></MakeButton>
        <div className="selected-tags">
          <p>Active Tags</p>
          <ul>
            {selectedtags.map((tag) => (
              <li key={tag}>
                <ModifierTag name={tag}></ModifierTag>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="advanced-create">
        <AdvancedSettings></AdvancedSettings>
        <ImageModifiers></ImageModifiers>
      </div>
    </div>
  );
}
