import React, { useRef, useState } from "react";
import logo from "/logo.svg";
import DollarIcon from "./assets/icons/dollarIcon.svg?react";
import LocationIcon from "./assets/icons/locationIcon.svg?react";
import SparkIcon from "./assets/icons/sparkIcon.svg?react";
import AddIcon from "./assets/icons/addIcon.svg?react";
import SparksIcon from "./assets/icons/sparkIcon.svg?react";
import ErrorIcon from "./assets/icons/errorIcon.svg?react";
import { categories } from "./constants/categories";
import { API_URL, API_DEV } from "./constants/API";

import "./App.css";

function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userBudget, setUserBudget] = useState(-1);
  const [userLocation, setUserLocation] = useState("");
  const [shake, setShake] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [customCategory, setCustomCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [missingFields, setMissingFields] = useState(null);
  const targetRef = useRef(null);

  const handleBudgetChange = (event) => {
    const budget = event.target.value;
    if (budget >= 0) {
      setUserBudget(budget);
    }
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;

    setUserLocation(location.trim());
  };

  const generateSuggestions = async () => {
    setErrorMessage("");
    setAiSuggestions([]);

    if (
      userBudget >= 0 &&
      userLocation &&
      selectedCategories.length > 0 &&
      selectedCategories.length <= 3
    ) {
      setMissingFields(false);
      setLoading(true);

      try {
        const res = await fetch(`${API_DEV}/get-suggestions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            budget: userBudget,
            location: userLocation,
            category: selectedCategories.join(","),
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch suggestions");

        const data = await res.json();

        if (data.error) {
          setErrorMessage(data.error);
          console.log(data.error);
          setAiSuggestions([]);
        } else {
          setAiSuggestions(data.suggestions);
        }
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
        targetRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setMissingFields(true);
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
      return;
    }

    if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAddCustomCategory = () => {
    if (
      customCategory.trim() &&
      !categories.includes(
        (category) =>
          category.name.toLowerCase() === customCategory.trim().toLowerCase(),
      )
    ) {
      const newCategory = {
        id: categories.length + 1,
        name: customCategory,
        icon: SparksIcon,
      };
      categories.push(newCategory);
      setCustomCategory("");

      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, customCategory]);
      }
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
        <div className="flex items-center gap-12 self-center mt-12 flex-col lg:flex-row">
          <div className="flex items-center gap-2">
            <DollarIcon />
            <input
              type="number"
              placeholder="1,500"
              min="0"
              className="font-bold text-[28px] border-2 border-[#1C344B] rounded-lg px-6 py-3 text-center w-[200px]"
              onChange={handleBudgetChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <LocationIcon />
            <input
              type="text"
              placeholder="New York City"
              className="font-bold text-[28px] border-2 border-[#1C344B] rounded-lg px-6 py-3 text-center w-[300px] sm:w-[400px]"
              onChange={handleLocationChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-32">
        <h1 className="text-[#010810] font-bold text-4xl mb-2">
          Let’s explore your possibilities
        </h1>
        <div className="flex flex-col gap-6 mt-12 text-[#D95759] font-bold text-[28px]">
          <h2 className="text-[#010810] font-normal text-[28px]">
            Choose how you want to make the most of your money
          </h2>
          <div className="flex flex-wrap gap-12 mt-12">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={`flex py-5 px-10 gap-3 rounded-xl border-2 border-[#1C344B] font-bold items-center text-xl text-[#1C344B] ${selectedCategories.includes(category.name) ? "bg-[#FDBD1D]" : "bg-[#F7F9FA] hover:bg-[#FFEEC4]"} ${selectedCategories.length >= 3 && !selectedCategories.includes(category.name) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => handleCategoryChange(category.name)}
                disabled={
                  selectedCategories.length >= 3 &&
                  !selectedCategories.includes(category.name)
                }
              >
                {React.createElement(category.icon)}
                {category.name}
              </button>
            ))}
            <div className="flex text-xl text-[#1C344B] border-2 border-[#1C344B] rounded-xl font-bold items-center">
              <input
                type="text"
                placeholder="Custom Category"
                className="py-5 px-10 border-e-2 w-[248px] h-full rounded-l-xl"
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
          <button
            type="button"
            className={`bg-[#1C344B] rounded-xl py-3 px-8 text-xl text-white font-bold mt-12 self-center ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={generateSuggestions}
            disabled={loading}
          >
            Generate Suggestions
          </button>
        </div>
      </div>

      <div className="mb-32 flex flex-col">
        {loading ? (
          <div className="flex items-center gap-2 justify-center mt-12 mb-12">
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
          ""
        )}

        {aiSuggestions.length > 0 && !errorMessage && !missingFields ? (
          <>
            <h1
              className="text-[#010810] font-bold text-4xl mb-2"
              ref={targetRef}
            >
              Your AI-Generated Suggestions
            </h1>
            <h2 className="text-[#010810] font-normal text-[28px]">
              With a{" "}
              <b className="underline decoration-[#FDBD1D] decoration-4 underline-offset-8">
                ${userBudget}
              </b>{" "}
              budget, here are some {userBudget > 0 ? " " : "free "}
              <b className="underline decoration-[#FDBD1D] decoration-4 underline-offset-8">
                {selectedCategories.join(", ")}
              </b>{" "}
              options in{" "}
              <b className="underline decoration-[#FDBD1D] decoration-4 underline-offset-8">
                {userLocation}
              </b>{" "}
              you might like:
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
                onClick={generateSuggestions}
              >
                Show me more options
              </button>
              <button
                type="button"
                className="bg-[#F7F9FA] text-[#1C344B] border-2 border-[#1C344B] rounded-xl py-3 px-8 font-bold cursor-pointer"
                onClick={() => {
                  setSelectedCategories("");
                  setAiSuggestions([]);
                }}
              >
                Choose another category
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-6 mt-12 text-[#D95759] font-bold text-[28px]">
            {missingFields && (!userBudget || userBudget < 0) ? (
              <div className="flex gap-2 items-center">
                <ErrorIcon />
                <span>
                  Please enter your budget first. Budget must be a number
                  greater than or equal to 0.
                </span>
              </div>
            ) : (
              ""
            )}

            {!userLocation && missingFields ? (
              <div className="flex gap-2 items-center">
                <ErrorIcon />
                <span>
                  Please enter your preferred location — it can be a country,
                  city, or any specific place.
                </span>
              </div>
            ) : (
              ""
            )}

            {missingFields &&
            (!selectedCategories.length || selectedCategories.length > 3) ? (
              <div className="flex gap-2 items-center">
                <ErrorIcon />
                <span>
                  Please select at least one category and up to 3, or add your
                  own.
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
