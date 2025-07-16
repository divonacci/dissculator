import React, { useCallback, useEffect, useMemo, useState } from "react";
import type {
  CalculatorContextType,
  CalculatorProviderProps,
  operatorType
} from "../types/calculator";
import { CalculatorContext } from "../contexts/CalculatorContext";
import toast from "react-hot-toast";
import { evaluate } from "mathjs";
import { generateSarcasticResponse } from "../utils/sarcasmGenerator";

const CalculatorProvider = ({ children }: CalculatorProviderProps): JSX.Element => {
  const [currInput, setCurrInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  useEffect(() => {
    if (currInput.toLowerCase().includes("infinity")) {
      setCurrInput("");
    }
  }, [currInput, result]);
  // const [sarcasticResponse, setSarcasticResponse] = useState<string>("");
  const MAXDISPLAYLENGTH = 150;
  const operators = useMemo(() => ["+", "-", "*", "/"], []);
  const isLastCharBinaryOperator = useCallback((input: string): boolean => {
    if (["+", "*", "/"].includes(input[input.length - 1])) return true;
    return false;
  }, []);
  const isLastCharArithmeticOperator = useCallback((input: string): boolean => {
    if (["+", "*", "/", "-"].includes(input[input.length - 1])) return true;
    return false;
  }, []);

  const getLastNumberSegment = useCallback((input: string): [string, number] => {
    const numberRegex = /(-?\d+\.?\d*)$/;
    const match = input.match(numberRegex);

    if (match) {
      return [match[0], match.index!];
    }
    return ["", -1];
  }, []);

  const handleNumberButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.target as HTMLButtonElement;
      setCurrInput((val) => {
        if (val.length >= MAXDISPLAYLENGTH) return val;
        if (result) {
          setResult("");
          return target.innerText;
        }
        return val + target.innerText;
      });
    },
    [result]
  );
  const handleBackspaceClick = useCallback(() => {
    setCurrInput((val) => {
      if (result) setResult("");

      return val.length ? val.slice(0, -1) : val;
    });
  }, [result]);
  const handleZeroButtonClick = useCallback(() => {
    setCurrInput((val) => {
      if (val.length >= MAXDISPLAYLENGTH) return val;
      if (isLastCharArithmeticOperator(val)) return val + "0";

      return val.length ? val + "0" : "";
    });
  }, [isLastCharArithmeticOperator]);

  const handleDoubleZeroButtonClick = useCallback(() => {
    setCurrInput((val) => {
      if (val.length >= MAXDISPLAYLENGTH - 2) return val;
      if (isLastCharArithmeticOperator(val)) return val + "0";

      return val.length ? val + "00" : "";
    });
  }, [isLastCharArithmeticOperator]);

  const handleDotButtonClick = useCallback(() => {
    setCurrInput((val) => {
      if (val.length >= MAXDISPLAYLENGTH - 1) return val;
      if (!val.length) return "0.";
      if (isLastCharArithmeticOperator(val)) return val + "0.";
      if (getLastNumberSegment(val)[0].includes(".")) return val;
      return val + ".";
    });
  }, [getLastNumberSegment, isLastCharArithmeticOperator]);

  const handleClearButtonClick = useCallback(() => {
    setCurrInput("");
    setResult("");
  }, []);
  const handleCopyButtonClick = useCallback(async () => {
    try {
      if (!result.length) throw new Error("Nothing to copy");
      if (!navigator.clipboard) {
        try {
          const textArea = document.createElement("textarea");
          textArea.value = result;
          textArea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge
          textArea.style.top = "0";
          textArea.style.width = "1px";
          textArea.style.height = "1px";
          textArea.style.opacity = "0";

          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand("copy");
          document.body.removeChild(textArea);
          if (successful) {
            toast.success("Copied!");
            return;
          } else {
            throw new Error("Failed to copy text.");
          }
        } catch (e) {
          if (!(e instanceof Error)) console.error(e);
          throw new Error("Clipboard API is not supported in this environment.");
        }
      }
      await navigator.clipboard.writeText(result);
      toast.success("Copied!");
    } catch (e) {
      toast.error(`Failed to copy text: ${(e as Error).message}`);
    }
  }, [result]);

  const handleOperatorButtonClick = useCallback(
    (operator: operatorType) => {
      if (result) {
        setCurrInput(result);
        setResult("");
      }
      if (currInput[currInput.length - 1] === ".") return;
      switch (operator) {
        case "+":
          setCurrInput((val) => {
            if (!val) return val;
            if (val.length >= MAXDISPLAYLENGTH - 1) return val;
            if (operators.includes(val[val.length - 1])) return val;

            return val + "+";
          });
          break;
        case "-":
          setCurrInput((val) => {
            if (val.length >= MAXDISPLAYLENGTH - 1) return val;
            if (isLastCharArithmeticOperator(val)) return val + "-";
            if (operators.includes(val[val.length - 1])) return val;

            return val + "-";
          });
          break;
        case "*":
          setCurrInput((val) => {
            if (!val) return val;
            if (val.length >= MAXDISPLAYLENGTH - 1) return val;
            if (operators.includes(val[val.length - 1])) return val;
            return val + "*";
          });
          break;
        case "/":
          setCurrInput((val) => {
            if (!val) return val;
            if (val.length >= MAXDISPLAYLENGTH - 1) return val;
            if (operators.includes(val[val.length - 1])) return val;

            return val + "/";
          });
          break;
        default:
          console.warn(`Unknown operator: ${operator}`);

          break;
      }
      return operator;
    },
    [/* isLastCharBinaryOperator, */ operators, result, isLastCharArithmeticOperator, currInput]
  );
  const handleEqualButtonClick = useCallback(() => {
    if (!currInput) return;
    if (isLastCharBinaryOperator(currInput)) {
      toast.error("Please complete the operation before pressing equals.");
      return;
    }
    try {
      const res = evaluate(currInput).toString();
      setResult(res);
      // sac represents sarcastic comment
      const sac = generateSarcasticResponse({
        input: currInput,
        result: res
      });
      if (sac)
        toast(sac, {
          duration: 5000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontFamily: "monospace, arial, sans-serif",
            lineHeight: "1em",
            fontSize: ".8em",
            textAlign: "center"
          }
        });
    } catch (e) {
      toast(`Error: ${(e as Error).message}`);
    }
  }, [currInput, isLastCharBinaryOperator]);

  const handleChangeSignButtonClick = useCallback(() => {
    setCurrInput((val) => {
      if (!val) return "-";
      const [lastNumber, lastIndex] = getLastNumberSegment(val);
      if (lastIndex !== -1) {
        return val.slice(0, lastIndex) + String(-parseFloat(lastNumber));
      }
      return val;
    });
  }, [getLastNumberSegment]);

  const handlePercentButtonClick = useCallback(() => {
    setCurrInput((val) => {
      if (!val) return val;
      if (isLastCharArithmeticOperator(val) || isNaN(Number(val[val.length - 1]))) return val;
      return val + "%";
    });
  }, [isLastCharArithmeticOperator]);

  const calculatorContextValue: CalculatorContextType = {
    currInput,
    setCurrInput,
    result,
    setResult,
    handleNumberButtonClick,
    handleBackspaceClick,
    handleZeroButtonClick,
    handleDoubleZeroButtonClick,
    handleDotButtonClick,
    handleClearButtonClick,
    handleCopyButtonClick,
    handleOperatorButtonClick,
    handleEqualButtonClick,
    handleChangeSignButtonClick,
    handlePercentButtonClick
  };

  return (
    <CalculatorContext.Provider value={calculatorContextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};
export default CalculatorProvider;
