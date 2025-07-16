import { createContext } from "react";
import { CalculatorContextType } from "../types/calculator";

export const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);
