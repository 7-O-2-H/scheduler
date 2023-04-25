import { useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  let currentHistory = [...history];
  
  const transition = (initial, replace = false) => {
    
    if(replace) {
      currentHistory.splice(-1, 1, initial);
    }

    if(!replace) {  
      currentHistory.push(initial);
    }

    setHistory(currentHistory);
    return setMode(currentHistory.slice(-1)[0]);

  };

  const back = () => {

    if(currentHistory.length > 1) {
      currentHistory.pop();
      setHistory(currentHistory);
      return setMode(currentHistory.slice(-1)[0])
    }
  
  };

  return { mode, transition, back };

}