import { useEffect, useRef } from "react";
import useCalculator from "../../features/calculator/hooks/useCalculator";
// import { evaluate } from "mathjs";

const CalculatorDisplay = () => {
  const { currInput, result } = useCalculator();
  const currInputRef = useRef<HTMLInputElement | null>(null);
  const resultInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (currInputRef.current) {
      currInputRef.current.focus();
    }
    if (resultInputRef.current) {
      resultInputRef.current.focus();
    }
  }, [currInput, result]);

  return (
    <section className="calculator__display">
      <section className="calculator__input">
        <input type="text" readOnly ref={currInputRef} value={currInput.length ? currInput : "0"} />
      </section>
      <section className="calculator__result">
        <input
          type="text"
          readOnly
          value={
            result.length
              ? Number(result).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 100
                })
              : "0"
          }
        />
      </section>
    </section>
  );
};

export default CalculatorDisplay;
