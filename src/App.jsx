import React, { useState } from "react";
import logo from "/logo.svg";
import DollarIcon from "./assets/icons/dollarIcon.svg?react";
import SparkIcon from "./assets/icons/sparkIcon.svg?react";
import { categories } from "./constants/categories";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userBudget, setUserBudget] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const handleBudgetChange = (event) => {
    const budget = event.target.value;
    if (budget > 0) {
      setUserBudget(budget);
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory !== category) {
      setSelectedCategory(category);
      //TODO: Call api here, this is just mock data
      setAiSuggestions([
        "3–4 Day City Escape: Explore Lisbon, Portugal or Mexico City. Enjoy affordable flights, boutique hotels, and authentic local food — all within budget.",
        "Nature Getaway: Spend a relaxing long weekend in Colorado or British Columbia, focusing on hiking, local lodges, and scenic views.",
        "Stretch Your Dollar: Use a travel rewards card to offset costs or book during off-season for lower rates.",
      ]);
    }
  };

  const handleMoreOptions = () => {
    //TODO: here we call other endpoint to get more options different from the first ones
    setAiSuggestions([
      "5–7 Day Road Trip: Drive through the Pacific Coast Highway or Route 66. Enjoy scenic views, local diners, and budget-friendly motels.",
      "Weekend Beach Retreat: Visit the Florida Keys or the Amalfi Coast. Enjoy affordable beachside accommodations and local seafood.",
      "Cultural Immersion: Explore local festivals or events in your chosen destination. Engage with locals and enjoy authentic experiences.",
    ]);
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
              onClick={() => handleCategoryChange(category.name)}
            >
              {React.createElement(category.icon)}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {userBudget && selectedCategory ? (
        <div className="mb-32 flex flex-col">
          <h1 className="text-[#010810] font-bold text-4xl mb-2">
            Your AI-Generated Suggestions
          </h1>
          <h2 className="text-[#010810] font-normal text-[28px]">
            With a{" "}
            <b className="underline decoration-[#FDBD1D] decoration-4 underline-offset-8">
              ${userBudget}
            </b>{" "}
            budget, here are a few{" "}
            <b className="underline decoration-[#FDBD1D] decoration-4 underline-offset-8">
              {selectedCategory}
            </b>{" "}
            options you might like:
          </h2>

          <div className="flex flex-col gap-8 mt-12">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="relative text-[#F7F9FA] w-full rounded-xl p-12 bg-[linear-gradient(to_bottom_right,_#F26A50_0%,_#D95778_20%,_#A9578F_40%,_#71598F_60%,_#425479_80%,_#2F4858_100%)] font-normal text-xl"
              >
                <SparkIcon className="absolute top-4 right-4" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-8 mt-12 self-center">
            <button
              type="button"
              className="bg-[#1C344B] rounded-xl py-3 px-8 text-white font-bold cursor-pointer"
              onClick={handleMoreOptions}
            >
              Show me more options
            </button>
            <button
              type="button"
              className="bg-[#F7F9FA] text-[#1C344B] border-2 border-[#1C344B] rounded-xl py-3 px-8 font-bold cursor-pointer"
              onClick={() => setSelectedCategory("")}
            >
              Choose another category
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
