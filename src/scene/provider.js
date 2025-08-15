import React, { useState } from "react";
import SceneStateContext from "./context.js";

export const SceneStateProvider = ({ children }) => {
  const [scene, setScene] = useState(0);

  return (
    <SceneStateContext.Provider value={{scene, setScene}}>
      {children}
    </SceneStateContext.Provider>
  );
};
