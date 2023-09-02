import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { addOutput } from "./store/output";
import Terminal from "./components/Terminal";
import "./App.css";

function App() {
  const { output } = useSelector((state) => ({
    output: state.output.history,
  }));


  const dispatch = useDispatch();
  const add = (value) => dispatch(addOutput(value));

  return <Terminal outputState={output} add={add} />;
}

export default App;
