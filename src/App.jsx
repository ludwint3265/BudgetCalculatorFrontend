import React, { useState } from "react";
import logo from "/logo.svg";
import DollarIcon from "./assets/icons/dollarIcon.svg?react";
import SparkIcon from "./assets/icons/sparkIcon.svg?react";
import AddIcon from "./assets/icons/addIcon.svg?react";
import SparksIcon from "./assets/icons/sparkIcon.svg?react";
import ErrorIcon from "./assets/icons/errorIcon.svg?react";
import { categories } from "./constants/categories";
import { API_URL } from "./constants/API";

import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userBudget, setUserBudget] = useState(-1);
  const [shake, setShake] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [customCategory, setCustomCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBudgetChange = (event) => {
    const budget = event.target.value;
    if (budget >= 0) {
      setUserBudget(budget);
    }
  };

  const handleCategoryChange = async (category) => {
    if (selectedCategory !== category) {
      setLoading(true);
      setSelectedCategory(category);

      try {
        const res = await fetch(`${API_URL}/get-suggestions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            budget: userBudget,
            category: category,
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch suggestions");

        const data = await res.json();
        setAiSuggestions(data.suggestions);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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

  const handleAddCustomCategory = () => {
    if (
      customCategory &&
      !categories.some((category) => category.name === customCategory)
    ) {
      const newCategory = {
        id: categories.length + 1,
        name: customCategory,
        icon: SparksIcon,
      };
      categories.push(newCategory);
      setCustomCategory("");
      setSelectedCategory(customCategory);
      handleCategoryChange(customCategory);
    } else {
      setCustomCategory("");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div className="pt-10 px-8 md:px-16 xl:px-32 2xl:px-64 flex flex-col">
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
            min="0"
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
              className={`flex py-5 px-10 gap-3 rounded-xl border-2 border-[#1C344B] font-bold cursor-pointer items-center text-[#1C344B] ${selectedCategory === category.name ? "bg-[#FDBD1D]" : "bg-[#F7F9FA] hover:bg-[#FFEEC4]"}`}
              onClick={() => handleCategoryChange(category.name)}
            >
              {React.createElement(category.icon)}
              {category.name}
            </button>
          ))}
          <div className="flex text-[#1C344B] border-2 border-[#1C344B] rounded-xl font-bold items-center">
            <input
              type="text"
              placeholder="Custom Category"
              className="py-5 px-10 border-e-2 w-[216px] h-full rounded-l-xl"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
            <button
              className={`flex gap-2 cursor-pointer bg-[#FDBD1D] py-5 px-3 rounded-r-xl h-full items-center ${shake ? "shake-animation" : ""}`}
              onClick={handleAddCustomCategory}
            >
              <span>Add</span>
              <AddIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-32 flex flex-col">
        <h1 className="text-[#010810] font-bold text-4xl mb-2">
          Your AI-Generated Suggestions
        </h1>
        {userBudget >= 0 && selectedCategory && !errorMessage ? (
          loading ? (
            <div className="flex items-center gap-2 justify-center mt-12">
              <img
                src={logo}
                alt="PennyPath Logo"
                className="w-8 h-8 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <span className="font-bold text-2xl text-[#1C344B]">
                Generating your personalized options...
              </span>
            </div>
          ) : (
            <>
              <h2 className="text-[#010810] font-normal text-[28px]">
                With a{" "}
                <b className="underline decoration-[#FDBD1D] decoration-4 underline-offset-8">
                  ${userBudget}
                </b>{" "}
                budget, here are some {userBudget > 0 ? " " : "free "}
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
                  onClick={() => {
                    setSelectedCategory("");
                    setAiSuggestions([]);
                  }}
                >
                  Choose another category
                </button>
              </div>
            </>
          )
        ) : (
          <div className="flex flex-col gap-6 mt-12 text-[#D95759] font-bold text-[28px]">
            {userBudget < 0 || !userBudget ? (
              <div className="flex gap-2 items-center">
                <ErrorIcon />
                <span>
                  Please enter your budget. Budget must be a number greater than
                  or equal to 0.
                </span>
              </div>
            ) : (
              ""
            )}

            {!selectedCategory ? (
              <div className="flex gap-2 items-center">
                <ErrorIcon />
                <span>
                  Please select at least one category or add your own.
                </span>
              </div>
            ) : (
              ""
            )}

            {errorMessage ? (
              <div className="flex gap-2 items-center">
                <ErrorIcon />
                <span>
                  Something went wrong while generating suggestions. Please try
                  again later.
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
