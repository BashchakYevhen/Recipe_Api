import Link from "next/link";

const Ingredients = ({ data }: { data: any }) => {
  return (
    <div className="mt-8 p-2 max-w-5xl">
      <h3 className="text-xl font-bold">Ingredients</h3>
      <ul className="list-disc list-inside grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 p-6 ">
        {Object.keys(data.meals[0])
          .filter(
            (key) => key.startsWith("strIngredient") && data.meals[0][key]
          )
          .map((key, index) => (
            <li key={index} className="mt-2">
              <Link
                href={`/?ingredients=${data.meals[0][key].toLowerCase()}`}
                className="text-[16px] sm:text-[20px] text-blue-500 hover:underline"
              >
                {data.meals[0][key]}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Ingredients;
