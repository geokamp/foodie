"use client";

import { useEffect, useState } from "react";

import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { useParams } from "next/navigation";





export default function Recipe() {
    const params = useParams();
    const {recipeId} = params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);



    

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Client fetch error:", err);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [recipeId]);
  console.log(data);
  

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (!data || !data.meals || data.meals.length === 0) {
    return <div>No recipe found.</div>;
  }


  const meal = data.meals[0];

  const videoId = data.meals[0].strYoutube.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;



  const ingredients = [];
  const measures = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal    [`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(ingredient);
      measures.push(measure || "");  // Handle missing measure with an empty string
    }
  }

  
  return (
    <div className="bg-white">
        <div className="flex flex-wrap items-center justify-center space-x-6 mt-6">
            {/* Image Gallery */}
            <div className="w-full sm:w-[560px] sm:h-[315px]">
                <img
                alt="food"
                src={meal.strMealThumb}
                className="w-full h-full rounded-lg object-cover"
                />
            </div>
            
            {/* YouTube Video */}
            <div className="w-full sm:w-[560px] sm:h-[315px]">
                <iframe
                width="100%"
                height="100%"
                src={embedUrl} // Ensure this URL is correct
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            </div>
        </div>
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{meal.strMeal}</h1>
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl font-bold tracking-tight text-gray-900">Ingridients</p>
            <ul className="list-inside">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between">
                <span>{ingredient}</span>
                <span>{measures[index]}</span>
              </li>
            ))}
          </ul>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
            <div className="mt-10">
              <h2 className="text-sm font-bold text-gray-900">Instructions</h2>
              <p className="text-base text-gray-900">{meal.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}


