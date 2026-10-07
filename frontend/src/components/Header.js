import React from "react";

import { MuteIcon, SpeakerIcon } from "./Icons";

// Top bar: the Shabd wordmark, plus sound and black & white toggles.
function Header({ soundOn, onToggleSound, bwMode, onToggleBw, onHome }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <button className="logo" onClick={onHome} aria-label="Shabd, back to topics">
          <span className="logo-hindi" lang="hi">
            शब्द
          </span>
          <span className="logo-latin">Shabd</span>
        </button>
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={onToggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute sounds" : "Turn sounds on"}
            title={soundOn ? "Mute sounds" : "Turn sounds on"}
          >
            {soundOn ? <SpeakerIcon /> : <MuteIcon />}
          </button>
          <button className="text-button" onClick={onToggleBw} aria-pressed={bwMode}>
            {bwMode ? "Colour" : "B&W"}
          </button>
        </div>
      </div>
      <div className="toran" aria-hidden="true" />
    </header>
  );
}

export default Header;
