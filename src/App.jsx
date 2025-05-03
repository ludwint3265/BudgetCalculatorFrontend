import logo from "/logo.svg";
import DollarIcon from "./assets/icons/dollarIcon.svg?react";

function App() {
  return (
    <div className="pt-10 px-32 flex flex-col">
      <div className="flex justify-center items-center gap-2 mb-16">
        <img src={logo} alt="PennyPath Logo" />
        <span className="text-[#1C344B] font-bold text-5xl">PennyPath</span>
      </div>

      <div className="mb-32 flex flex-col">
        <h1 className="text-[#010810] font-bold text-4xl mb-2">
          Turn your budget into a plan
        </h1>
        <h2 className="text-[#010810] font-normal text-[28px]">
          Tell us your budget — we’ll show you smart, personalized ideas powered
          by AI
        </h2>
        <div className="flex items-center gap-2 self-center mt-12">
          <DollarIcon />
          <input
            type="number"
            placeholder="1,500"
            className="font-bold text-[28px] border-2 border-[#1C344B] rounded-lg px-6 py-3 text-center w-[200px]"
            required
          />
        </div>
      </div>

      <div className="mb-32">
        <h1 className="text-[#010810] font-bold text-4xl mb-2">
          Let’s explore your possibilities
        </h1>
        <h2 className="text-[#010810] font-normal text-[28px]">
          Choose how you want to make the most of your money
        </h2>
      </div>

      <div className="mb-32">
        <h1 className="text-[#010810] font-bold text-4xl mb-2">
          Your AI-Generated Suggestion
        </h1>
        <h2 className="text-[#010810] font-normal text-[28px]">
          With a $${1500} budget, here are a few ${"category"} experiences you
          might enjoy:
        </h2>
      </div>
    </div>
  );
}

export default App;
