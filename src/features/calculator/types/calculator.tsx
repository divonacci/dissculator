import { ReactNode } from "react";

export type operatorType = "+" | "-" | "*" | "/";

export interface CalculatorContextType {
  currInput: string;
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setCurrInput: React.Dispatch<React.SetStateAction<string>>;
  handleNumberButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleBackspaceClick: () => void;
  handleZeroButtonClick: () => void;
  handleDoubleZeroButtonClick: () => void;
  handleDotButtonClick: () => void;
  handleClearButtonClick: () => void;
  handleCopyButtonClick: () => Promise<void>;
  handleEqualButtonClick: () => void;
  handleOperatorButtonClick: (operator: operatorType) => void;
  handleChangeSignButtonClick: () => void;
  handlePercentButtonClick: () => void;
}

export interface CalculatorProviderProps {
  children: ReactNode;
}
