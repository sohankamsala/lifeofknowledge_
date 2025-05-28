import React, { useState } from "react";
import CheckDeadOrAlive from "./functions/CheckDeadOrAlive";
import CheckForDisease from "./functions/CheckForDisease";
import EducationProgression from "./functions/EducationProgression";
import Popup from "../components/reusables/Popup";
import JobProgression from "./functions/JobProgression";
import ManipulateTimeline from "./functions/ManipulateTimeline";

export default function Checks() {
  const [whichPopup, setWhichPopup] = useState("");

  function resetWhichPopup() {
    setWhichPopup("");
  }

  return (
    <>
    </>
  );
}
