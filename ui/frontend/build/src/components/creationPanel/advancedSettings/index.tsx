import React from "react";
import { useImageCreate } from "../../../store/imageCreateStore";
import "./advancedSettings.css";

// todo: move this someplace more global
const IMAGE_DIMENSIONS = [
  { value: 128, label: "128 (*)" },
  { value: 192, label: "192" },
  { value: 256, label: "256 (*)" },
  { value: 320, label: "320" },
  { value: 384, label: "384" },
  { value: 448, label: "448" },
  { value: 512, label: "512 (*)" },
  { value: 576, label: "576" },
  { value: 640, label: "640" },
  { value: 704, label: "704" },
  { value: 768, label: "768 (*)" },
  { value: 832, label: "832" },
  { value: 896, label: "896" },
  { value: 960, label: "960" },
  { value: 1024, label: "1024 (*)" },
];

function SettingsList() {

  // const setImageOptions = useImageCreate((state) => state.setImageOptions);
  
  const requestCount = useImageCreate((state) => state.requestCount);
  const setRequestCount = useImageCreate((state) => state.setRequestCount);
  
  const getValueForRequestKey = useImageCreate((state) => state.getValueForRequestKey);
  const setRequestOption = useImageCreate((state) => state.setRequestOptions);



  const toggleUseUpscaling = useImageCreate((state) => state.toggleUseUpscaling);
  const toggleUseFaceCorrection = useImageCreate((state) => state.toggleUseFaceCorrection);
  const toggleUseRandomSeed = useImageCreate((state) => state.toggleUseRandomSeed);
  const isRandomSeed = useImageCreate((state) => state.isRandomSeed());
  const toggleUseAutoSave = useImageCreate((state) => state.toggleUseAutoSave);
  const isUseAutoSave = useImageCreate((state) => state.isUseAutoSave());
  const toggleSoundEnabled = useImageCreate((state) => state.toggleSoundEnabled);
  const isSoundEnabled = useImageCreate((state) => state.isSoundEnabled());
  // const imageOptions = useImageCreate((state) => state.imageOptions);

  return (
    <ul id="editor-settings-entries">
    <li>
      <label>
        Seed:
        <input
          size={10}
          value={getValueForRequestKey("seed")}
          onChange={(e) =>
            setRequestOption("seed", e.target.value)
          }
          disabled={isRandomSeed}
          placeholder="random"
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={isRandomSeed}
          onChange={(e) =>
            toggleUseRandomSeed()
          }
        />{" "}
        Random Image
      </label>
    </li>
    <li>
      <label>
        Number of images to make:{" "}
        <input
          type="number"
          value={requestCount}
          onChange={(e) =>
            setRequestCount(parseInt(e.target.value, 10))
          }
          size={4}
        />
      </label>
      <label>
        Generate in parallel:
        <input
          type="number"
          value={getValueForRequestKey("num_outputs")}
          onChange={(e) =>
            setRequestOption("num_outputs", parseInt(e.target.value, 10))
          }
          size={4}
        />
        </label>
    </li>
    <li>
      <label>
        Width:
        <select
          value={getValueForRequestKey("width")}
          onChange={(e) =>
            setRequestOption("width", e.target.value)
          }
        >
          {IMAGE_DIMENSIONS.map((dimension) => (
            <option
              key={"width-option_" + dimension.value}
              value={dimension.value}
            >
              {dimension.label}
            </option>
          ))}
        </select>
      </label>
    </li>
    <li>
      <label>
        Height:
        <select
          value={getValueForRequestKey("height")}
          onChange={(e) =>
            setRequestOption("height", e.target.value)
          }
        >
          {IMAGE_DIMENSIONS.map((dimension) => (
            <option
              key={"height-option_" + dimension.value}
              value={dimension.value}
            >
              {dimension.label}
            </option>
          ))}
        </select>
      </label>
    </li>
    <li>
      <label>
        Number of inference steps:{" "}
        <input
          value={getValueForRequestKey("num_inference_steps")}
          onChange={(e) =>
            setRequestOption("num_inference_steps", e.target.value)
          }
          size={4}
        />
      </label>
    </li>
    <li>
      <label>
        Guidance Scale:
        <input
          value={getValueForRequestKey("guidance_scale")}
          onChange={(e) =>
            setRequestOption("guidance_scale", e.target.value)
          }
          type="range"
          min="10"
          max="200"
        />
      </label>
      <span>{getValueForRequestKey("guidance_scale") / 10}</span>
    </li>
    <li className="mb-4">
      <label>
        Prompt Strength:{" "}
        <input
          value={getValueForRequestKey("prompt_strength")}
          onChange={(e) =>
            // setImageOptions({ promptStrength: Number(e.target.value) })
            setRequestOption("prompt_strength", e.target.value)
          }
          type="range"
          min="0"
          max="10"
        />
      </label>
      <span>{getValueForRequestKey("prompt_strength") / 10}</span>
    </li>
    <li>
      <label>
        <input
          checked={isUseAutoSave}
          onChange={(e) =>
            toggleUseAutoSave()
          }
          type="checkbox"
        />
        Automatically save to{" "}
      </label>
      <label>
        <input
          value={getValueForRequestKey("save_to_disk_path")}
          onChange={(e) => 
            setRequestOption("save_to_disk_path", e.target.value)
          }
          size={40}
          disabled={!isUseAutoSave}
        />
        <span className="visually-hidden">
          Path on disk where images will be saved
        </span>
      </label>
    </li>
    <li>
      <label>
        <input
          checked={isSoundEnabled}
          onChange={(e) =>
            toggleSoundEnabled()
          }
          type="checkbox"
        />
        Play sound on task completion
      </label>
    </li>
    <li>
      <label>
        <input
          checked={getValueForRequestKey("turbo")}
          onChange={(e) =>
            setRequestOption("turbo", e.target.checked)
          }
          type="checkbox"
        />
        Turbo mode (generates images faster, but uses an additional 1 GB
        of GPU memory)
      </label>
    </li>
    <li>
      <label>
        <input
          type="checkbox"
          checked={getValueForRequestKey("use_cpu")}
          onChange={(e) =>
            setRequestOption("use_cpu", e.target.checked)
          }
        />
        Use CPU instead of GPU (warning: this will be *very* slow)
      </label>
    </li>
    <li>
      <label>
        <input
          checked={getValueForRequestKey("use_full_precision")}
          onChange={(e) =>
            setRequestOption("use_full_precision", e.target.checked)
          }
          type="checkbox"
        />
        Use full precision (for GPU-only. warning: this will consume more
        VRAM)
      </label>
    </li>
    {/* <!-- <li><input id="allow_nsfw" name="allow_nsfw" type="checkbox"/> <label htmlFor="allow_nsfw">Allow NSFW Content (You confirm you are above 18 years of age)</label></li> --> */}
  </ul>
  )
}

export default function AdvancedSettings() {

  const advancedSettingsIsOpen = useImageCreate(
    (state) => state.uiOptions.advancedSettingsIsOpen
  );

  const toggleAdvancedSettingsIsOpen = useImageCreate(
    (state) => state.toggleAdvancedSettingsIsOpen
  );

  return (
    <div className="panel-box">
      <button
        type="button"
        onClick={toggleAdvancedSettingsIsOpen}
        className="panel-box-toggle-btn"
      >
        {/* TODO: swap this manual collapse stuff out for some UI component? */}
        <h4>Advanced Settings</h4>
      </button>
      {advancedSettingsIsOpen && <SettingsList/>}
    </div>
  );
}
