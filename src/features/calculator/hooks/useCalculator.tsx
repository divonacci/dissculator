import { useContext } from "react";
import { CalculatorContext } from "../contexts/CalculatorContext";
const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) throw new Error("No Calculator Values or Functions");
  return context;
};
export default useCalculator;
