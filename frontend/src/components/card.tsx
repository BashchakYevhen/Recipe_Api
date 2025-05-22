import { IRecipe } from "@/types/recipe";
import Image from "next/image";

const Card = ({ recipe }: { recipe: IRecipe }) => {
  return (
    <>
      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={32}
        height={32}
        className="w-[64px] h-[64px] rounded-lg"
      />
      <a
        href={`/${recipe.idMeal}`}
        className="text-[16px] sm:text-[20px] text-blue-500 hover:underline"
      >
        <span className="text-[16px] sm:text-[20px]">{recipe.strMeal}</span>
      </a>
    </>
  );
};

export default Card;
