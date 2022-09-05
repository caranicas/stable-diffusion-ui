import React from "react";

import './FooterDisplay.css';

export default function FooterDisplay() {
  return (
    <div className="footer-display">
        <p>Please feel free to <a href="https://github.com/cmdr2/stable-diffusion-ui/issues" target="_blank">file an issue</a> if you have any problems or suggestions in using this interface.</p>
        <div id="footer-legal">
            <p><b>Disclaimer:</b> The authors of this project are not responsible for any content generated using this interface.</p>
            <p>This license of this software forbids you from sharing any content that violates any laws, produce any harm to a person, disseminate any personal information that would be meant for harm, <br/>spread misinformation and target vulnerable groups. For the full list of restrictions please read <a href="https://github.com/cmdr2/stable-diffusion-ui/blob/main/LICENSE" target="_blank">the license</a>.</p>
            <p>By using this software, you consent to the terms and conditions of the license.</p>
        </div>
    </div>
  );
}

