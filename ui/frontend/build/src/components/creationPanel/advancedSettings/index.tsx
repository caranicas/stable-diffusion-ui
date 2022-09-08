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

  const setImageOptions = useImageCreate((state) => state.setImageOptions);
  const imageOptions = useImageCreate((state) => state.imageOptions);

  return (
    <ul id="editor-settings-entries">
    <li>
      <label>
        Seed:
        <input
          size={10}
          value={imageOptions.seed ? imageOptions.seed : ""}
          onChange={(e) =>
            setImageOptions({ seed: Number(e.target.value) })
          }
          disabled={imageOptions.isSeedRandom}
          placeholder="random"
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={imageOptions.isSeedRandom}
          onChange={(e) =>
            setImageOptions({ isSeedRandom: e.target.checked })
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
          value={imageOptions.numberOfImages}
          onChange={(e) =>
            setImageOptions({ numberOfImages: Number(e.target.value) })
          }
          size={4}
        />
      </label>
      <label>
        Generate in parallel:
        <input
          type="number"
          value={imageOptions.parallelRequests}
          onChange={(e) =>
            setImageOptions({ parallelRequests: Number(e.target.value) })
          }
          size={4}
        />
      </label>{" "}
      (images at once)
    </li>
    <li>
      <label>
        Width:
        <select
          value={imageOptions.width}
          onChange={(e) =>
            setImageOptions({ width: Number(e.target.value) })
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
          value={imageOptions.height}
          onChange={(e) =>
            setImageOptions({ height: Number(e.target.value) })
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
          value={imageOptions.stepCount}
          onChange={(e) =>
            setImageOptions({ stepCount: Number(e.target.value) })
          }
          size={4}
        />
      </label>
    </li>
    <li>
      <label>
        Guidance Scale:
        <input
          value={imageOptions.guidence}
          onChange={(e) =>
            setImageOptions({ guidence: Number(e.target.value) })
          }
          type="range"
          min="10"
          max="200"
        />
      </label>
      <span>{imageOptions.guidence / 10}</span>
    </li>
    <li className="mb-4">
      <label>
        Prompt Strength:{" "}
        <input
          value={imageOptions.promptStrength}
          onChange={(e) =>
            setImageOptions({ promptStrength: Number(e.target.value) })
          }
          type="range"
          min="0"
          max="10"
        />
      </label>
      <span>{imageOptions.promptStrength / 10}</span>
    </li>
    <li>
      <label>
        <input
          checked={imageOptions.autoSave}
          onChange={(e) =>
            setImageOptions({ autoSave: e.target.checked })
          }
          type="checkbox"
        />
        Automatically save to{" "}
      </label>
      <label>
        <input
          value={imageOptions.diskPath}
          onChange={(e) => setImageOptions({ diskPath: e.target.value })}
          size={40}
          disabled={!imageOptions.autoSave}
        />
        <span className="visually-hidden">
          Path on disk where images will be saved
        </span>
      </label>
    </li>
    <li>
      <label>
        <input
          checked={imageOptions.soundOnComplete}
          onChange={(e) =>
            setImageOptions({ soundOnComplete: e.target.checked })
          }
          type="checkbox"
        />
        Play sound on task completion
      </label>
    </li>
    <li>
      <label>
        <input
          checked={imageOptions.useTurboMode}
          onChange={(e) =>
            setImageOptions({ useTurboMode: e.target.checked })
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
          checked={imageOptions.useCPU}
          onChange={(e) => setImageOptions({ useCPU: e.target.checked })}
        />
        Use CPU instead of GPU (warning: this will be *very* slow)
      </label>
    </li>
    <li>
      <label>
        <input
          checked={imageOptions.useFullPrecision}
          onChange={(e) =>
            setImageOptions({ useFullPrecision: e.target.checked })
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
