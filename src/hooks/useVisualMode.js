import { useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const toSet = (history) => {
    setMode(history[(history.length - 1)]);
  };
  
  const transition = (initial, replace = false) => {
    

    if(!replace) {  
      history.push(initial);
      return toSet(history);
    }

    if(replace) {
      history.pop();
      history.push(initial)
      return toSet(history);
    }

  };

  const back = () => {

    if(history.length > 1) {
      history.pop();
    }
    
    return toSet(history);
  }

  return { mode, transition, back };
}