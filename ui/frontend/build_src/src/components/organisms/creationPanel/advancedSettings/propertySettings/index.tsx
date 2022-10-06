import React from "react";
import { useImageCreate, SAMPLER_OPTIONS } from "../../../../../stores/imageCreateStore";
import { useCreateUI } from "../../creationPanelUIStore";

import Checkbox from "../../../../atoms/checkbox";

import {
  SettingItem,
} from "../../../../../styles/shared.css";

import {
  buttonStyle,
} from "../../../../_recipes/button.css";



import { useTranslation } from "react-i18next";

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

export default function PropertySettings() {
  const { t } = useTranslation();

  const setRequestOption = useImageCreate((state) => state.setRequestOptions);
  const toggleUseRandomSeed = useImageCreate(
    (state) => state.toggleUseRandomSeed
  );
  const isRandomSeed = useImageCreate((state) => state.isRandomSeed());

  const seed = useImageCreate((state) => state.getValueForRequestKey("seed"));
  const steps = useImageCreate((state) =>
    state.getValueForRequestKey("num_inference_steps")
  );
  const guidanceScale = useImageCreate((state) =>
    state.getValueForRequestKey("guidance_scale")
  );

  const initImage = useImageCreate((state) =>
    state.getValueForRequestKey("init_image")
  );

  const promptStrength = useImageCreate((state) =>
    state.getValueForRequestKey("prompt_strength")
  );

  const width = useImageCreate((state) => state.getValueForRequestKey("width"));
  const height = useImageCreate((state) =>
    state.getValueForRequestKey("height")
  );

  const sampler = useImageCreate((state) =>
    state.getValueForRequestKey("sampler")
  );

  const propertyOpen = useCreateUI((state) => state.isOpenAdvPropertySettings);
  const togglePropertyOpen = useCreateUI(
    (state) => state.toggleAdvPropertySettings
  );

  return (
    <div>
      <button type="button" className={buttonStyle({
        type: 'action',
        color: 'accent',
      })} onClick={togglePropertyOpen}>
        Property Settings
      </button>
      {propertyOpen && (
        <>
          <div className={SettingItem}>

            <Checkbox
              label=" Random Image"
              isChecked={isRandomSeed}
              toggleCheck={toggleUseRandomSeed}
            ></Checkbox>


            <label>
              Seed:
              <input
                size={10}
                value={seed}
                onChange={(e) => setRequestOption("seed", e.target.value)}
                disabled={isRandomSeed}
                placeholder="random"
              />
            </label>

          </div>

          <div className={SettingItem}>
            <label>
              {t("settings.steps")}{" "}
              <input
                value={steps}
                onChange={(e) => {
                  setRequestOption("num_inference_steps", e.target.value);
                }}
                size={4}
              />
            </label>
          </div>

          <div className={SettingItem}>
            <label>
              {t("settings.guide-scale")}
              <input
                value={guidanceScale}
                onChange={(e) =>
                  setRequestOption("guidance_scale", e.target.value)
                }
                type="range"
                min="0"
                max="20"
                step=".1"
              />
            </label>
            <span>{guidanceScale}</span>
          </div>

          {void 0 !== initImage && (
            <div className={SettingItem}>
              <label>
                {t("settings.prompt-str")}{" "}
                <input
                  value={promptStrength}
                  onChange={(e) =>
                    setRequestOption("prompt_strength", e.target.value)
                  }
                  type="range"
                  min="0"
                  max="1"
                  step=".05"
                />
              </label>
              <span>{promptStrength}</span>
            </div>
          )}

          <div className={SettingItem}>
            <label>
              {t("settings.width")}
              <select
                value={width}
                onChange={(e) => setRequestOption("width", e.target.value)}
              >
                {IMAGE_DIMENSIONS.map((dimension) => (
                  <option
                    key={`width-option_${dimension.value}`}
                    value={dimension.value}
                  >
                    {dimension.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t("settings.height")}
              <select
                value={height}
                onChange={(e) => setRequestOption("height", e.target.value)}
              >
                {IMAGE_DIMENSIONS.map((dimension) => (
                  <option
                    key={`height-option_${dimension.value}`}
                    value={dimension.value}
                  >
                    {dimension.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={SettingItem}>
            <label>
              {t("settings.sampler")}
              <select
                value={sampler}
                onChange={(e) => setRequestOption("sampler", e.target.value)}
              >
                {SAMPLER_OPTIONS.map((sampler) => (
                  <option key={`sampler-option_${sampler}`} value={sampler}>
                    {sampler}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </>
      )}
    </div>
  );
}
