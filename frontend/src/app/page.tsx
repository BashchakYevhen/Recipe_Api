"use client";
import Card from "@/components/card";
import Filters from "@/components/filters";
import Search from "@/components/search";
import { IRecipe } from "@/types/recipe";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const query = useSearchParams();
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState(
    query.get("ingredients") || ""
  );
  const [country, setCountry] = useState(query.get("country") || "");
  const [category, setCategory] = useState(query.get("category") || "");
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes?search=${search
          .toLowerCase()
          .trim()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/filtered-recipes?ingredients=${ingredients.trim()}&country=${country.trim()}&category=${category.trim()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data.meals);
      } catch (error: unknown) {
        if (error && typeof error === "object" && "message" in error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    if (category === "" && country === "" && ingredients === "") {
      fetchRecipes();
    } else {
      handleFilter();
    }
  }, [category, country, ingredients]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-[32px] sm:text-[48px] font-bold text-center">
          Welcome to the Recipe App
        </h1>
        <p className="text-[16px] sm:text-[20px] text-center">
          Discover and share your favorite recipes with the world.
        </p>
        <div className="flex flex-col justify-center items-center gap-[16px]">
          <Search
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
          <Filters
            category={category}
            country={country}
            ingredients={ingredients}
            setCategory={setCategory}
            setCountry={setCountry}
            setIngredients={setIngredients}
          />
        </div>
        <ul className="lg:grid-cols-3 sm:grid-cols-2 grid gap-[16px] list-none w-full  grid-cols-1">
          {recipes?.map((recipe: IRecipe) => (
            <li
              key={recipe.idMeal}
              className="flex gap-[16px] items-center border-gray-300 w-full border-2 rounded-lg p-2"
            >
              <Card recipe={recipe} />
            </li>
          ))}
          {loading && <li className="text-2xl">Loading...</li>}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-[16px] sm:text-[20px] text-center">
          &copy; 2025 Recipe App. All rights reserved ᓚᘏᗢ.
        </p>
      </footer>
    </div>
  );
}
