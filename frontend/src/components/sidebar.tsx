import { IRecipe } from "@/types/recipe";
import Image from "next/image";

const Sidebar = async ({ category }: { category: string }) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes?category=${category}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch recipes");
  }
  const recipes = await data.json();
  return (
    <div className=" top-0 right-16 w-1/5 p-4 h-dvh overflow-y-scroll">
      <a
        href={`/?category=${category.toLowerCase()}`}
        className="text-[20px] sm:text-[24px] text-blue-500 hover:underline"
      >
        <h2 className="text-3xl font-bold mt-4">{category}</h2>
      </a>
      <div className="grid grid-cols-1 gap-4 p-6 ">
        {recipes.meals.map((recipe: IRecipe) => (
          <div key={recipe.idMeal} className="mt-2">
            <Image
              width={600}
              height={600}
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-6 h-auto rounded-lg shadow-lg"
            />
            <a
              href={`/${recipe.idMeal}`}
              className="text-[16px] sm:text-[20px] text-blue-500 hover:underline"
            >
              <h3 className="text-xl font-bold mt-2">{recipe.strMeal}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
