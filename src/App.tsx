import Footer from "./components/Footer";
import Header from "./components/Header";
import Calculator from "./components/Main";
import { Toaster } from "react-hot-toast";
import CalculatorProvider from "./features/calculator/components/CalculatorProvider";
function App() {
  return (
    <>
      <Toaster />
      <Header />
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
      <Footer />
    </>
  );
}

export default App;
