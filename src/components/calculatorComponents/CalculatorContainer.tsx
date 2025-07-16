import CalculatorButtons from "./CalculatorButtons";
import CalculatorDisplay from "./CalculatorDisplay";
import "./calculator.css";
const CalculatorContainer = () => {
  return (
    <section className="calculator__container">
      <CalculatorDisplay />
      <CalculatorButtons />
    </section>
  );
};

export default CalculatorContainer;
