import Header from "./components/Header";
import Body from "./components/Body";
import "./App.css";
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  return (
    <div>
      <Header step={step} />
      <Body setStep={setStep} step={step} />
    </div>
  );
}

export default App;
