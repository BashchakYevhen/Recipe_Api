"use client";
import { useEffect, useState } from "react";

const Filters = ({
  ingredients,
  country,
  category,
  setCategory,
  setCountry,
  setIngredients,
}: {
  ingredients: string;
  country: string;
  category: string;
  setCategory: (category: string) => void;
  setCountry: (country: string) => void;
  setIngredients: (ingredients: string) => void;
}) => {
  type FilterType = "ingredients" | "country" | "category";
  const types = [
    { value: "ingredients", label: "Ingredients" },
    { value: "country", label: "Country" },
    { value: "category", label: "Category" },
  ];
  const [type, setType] = useState<FilterType>(types[0].value as FilterType);
  const [input, setInput] = useState("");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as FilterType);
    setInput("");
    setIngredients("");
    setCountry("");
    setCategory("");
  };

  useEffect(() => {
    if (ingredients) {
      setInput(ingredients);
      setType("ingredients");
    } else if (country) {
      setInput(country);
      setType("country");
    } else if (category) {
      setInput(category);
      setType("category");
    }
  }, [type, ingredients, country, category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
    if (type === "ingredients") setIngredients(value);
    else if (type === "country") setCountry(value);
    else if (type === "category") setCategory(value);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-4">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="flex items-center justify-center gap-2">
          <select
            value={type}
            onChange={(e) => handleTypeChange(e)}
            className="border border-gray-300 rounded p-2 mb-4 "
          >
            {types.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search by ingredients, country or category"
            value={input}
            onChange={(e) => handleInputChange(e)}
            className="border border-gray-300 rounded p-2 mb-4 w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
