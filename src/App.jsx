import React, { useState } from "react";
import logo from "/logo.svg";
import DollarIcon from "./assets/icons/dollarIcon.svg?react";
import { categories } from "./constants/categories";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userBudget, setUserBudget] = useState(0);

  const handleBudgetChange = (event) => {
    const budget = event.target.value;
    if (budget > 0) {
      setUserBudget(budget);
    }
  };

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
            onChange={handleBudgetChange}
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

        <div className="flex flex-wrap gap-12 mt-12">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={`flex py-5 px-10 gap-3 rounded-xl border-2 border-[#1C344B] font-bold cursor-pointer text-[#1C344B] ${selectedCategory === category.name ? "bg-[#FDBD1D]" : "bg-[#F7F9FA] hover:bg-[#FFEEC4]"}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {React.createElement(category.icon)}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {userBudget && selectedCategory ? (
        <div className="mb-32">
          <h1 className="text-[#010810] font-bold text-4xl mb-2">
            Your AI-Generated Suggestion
          </h1>
          <h2 className="text-[#010810] font-normal text-[28px]">
            With a ${userBudget} budget, here are a few {selectedCategory}{" "}
            options you might like:
          </h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
