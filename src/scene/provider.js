import React, { useState } from "react";
import SceneStateContext from "./context.js";

export const SceneStateProvider = ({ children }) => {
  const [state, setState] = useState({
    /* ... your initial state ... */
  });

  // The value prop will contain the state and the setState function
  const [scene, setScene] = useState(0);


  return (
    <SceneStateContext.Provider value={{scene, setScene}}>
      {children}
    </SceneStateContext.Provider>
  );
};
