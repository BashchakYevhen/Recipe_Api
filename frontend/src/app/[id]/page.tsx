import Ingredients from "@/components/ingredients";
import Sidebar from "@/components/sidebar";
import Image from "next/image";
import Link from "next/link";

const Receipt = async (prop: any) => {
  const { id } = await prop.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${id}`);
  const data = await res.json();
  return (
    <>
      <button>
        <Link
          href="/"
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4 lg:mt-4 lg:mr-4"
        >
          Back to Home
        </Link>
      </button>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center p-2 max-w-5xl">
            <div className="flex items-start justify-items-start w-full p-6">
              <Image
                width={600}
                height={600}
                src={data.meals[0].strMealThumb}
                alt={data.meals[0].strMeal}
                className="w-1/3 h-auto rounded-lg shadow-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mt-4">{data.meals[0].strMeal}</h2>
            <p className="text-gray-400 mt-2">{data.meals[0].strArea}</p>
            <p className="text-gray-400 mt-2">
              {data.meals[0].strInstructions}
            </p>
          </div>
          <Ingredients data={data} />
        </div>
        <Sidebar category={data.meals[0].strCategory} />
      </div>
    </>
  );
};

export default Receipt;
