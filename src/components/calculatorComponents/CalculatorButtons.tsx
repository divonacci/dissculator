import { AiFillDelete } from "react-icons/ai";
import { FaBackspace, FaCopy } from "react-icons/fa";
import useCalculator from "../../features/calculator/hooks/useCalculator";
const CalculatorButtons = () => {
  const {
    currInput,
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
  } = useCalculator();
  return (
    <section className="calculator__buttons">
      <button className="backspace" onClick={handleBackspaceClick}>
        <FaBackspace />
      </button>
      <button className="C" onClick={handleClearButtonClick}>
        <AiFillDelete />
      </button>
      <button className="copy" onClick={handleCopyButtonClick}>
        <FaCopy />
      </button>
      <button className="percent" onClick={handlePercentButtonClick}>
        %
      </button>
      <button className="abs" onClick={handleChangeSignButtonClick}>
        +/-
      </button>
      <button className="nine" onClick={handleNumberButtonClick}>
        9
      </button>
      <button className="eight" onClick={handleNumberButtonClick}>
        8
      </button>
      <button className="seven" onClick={handleNumberButtonClick}>
        7
      </button>
      <button className="six" onClick={handleNumberButtonClick}>
        6
      </button>
      <button className="five" onClick={handleNumberButtonClick}>
        5
      </button>
      <button className="four" onClick={handleNumberButtonClick}>
        4
      </button>
      <button className="three" onClick={handleNumberButtonClick}>
        3
      </button>
      <button className="two" onClick={handleNumberButtonClick}>
        2
      </button>
      <button className="one" onClick={handleNumberButtonClick}>
        1
      </button>
      <button className="zero" onClick={handleZeroButtonClick}>
        0
      </button>
      <button className="double_zero" onClick={handleDoubleZeroButtonClick}>
        00
      </button>
      <button className="dot" onClick={handleDotButtonClick}>
        .
      </button>
      <button className="divide" onClick={() => handleOperatorButtonClick("/")}>
        /
      </button>
      <button className="plus" onClick={() => handleOperatorButtonClick("+")}>
        +
      </button>
      <button className="minus" onClick={() => handleOperatorButtonClick("-")}>
        -
      </button>
      <button className="times" onClick={() => handleOperatorButtonClick("*")}>
        *
      </button>
      <button
        className="equal"
        onClick={handleEqualButtonClick}
        disabled={!currInput.length ? true : false}>
        =
      </button>
    </section>
  );
};

export default CalculatorButtons;
