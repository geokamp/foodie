"use client"


import Card from "@/components/cardRecipe/Card";
import Link from "next/link";
import { useEffect, useState } from "react";



async function getAllRecipes(){
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const datas = await res.json();

    return datas;
}

async function getRecipes(food){
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
  const data = await res.json();

  return data;
}

export default  function Recipes() {

    const [text, setText] = useState("");
    const [recipes, setRecipes] = useState();
    const [filteredRecipes, setFilteredRecipes] = useState();

    useEffect(() => {
      const fetchData = async () => {
       
          const data = await getAllRecipes();
          setRecipes(data.meals || []); // Set the fetched recipes, default to empty array if no meals
          setFilteredRecipes(data.meals)
      };
  
      fetchData();
    }, []);

    
     // Handle search input change and update filtered recipes
  useEffect(() => {
    const fetchData = async () => {
      if (text.trim() !== "") {
        const data = await getRecipes(text);
        setFilteredRecipes(data.meals || []); // Update filtered recipes based on search
      } else {
        setFilteredRecipes(recipes); // Show all recipes when the input is empty
      }
    };

    fetchData();
  }, [text, recipes]); 


    const handleSubmit = async () =>{
  

        const data = await getRecipes(text);
        console.log(data);
        setRecipes(data.meals)

    }



  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Find your Best Recipe!</h1>
        <div className="flex rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto mt-10">
          <input
            type="email"
            placeholder="Search Something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
          />{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="fill-white"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </div>
      </div>

      {filteredRecipes && (
        <ul className="flex flex-wrap mt-6 gap-3 justify-center m-5 md:justify-start">
          {filteredRecipes.map((meal) => (
            <li
              key={meal.idMeal}
              className="list-none flex-1 basis-[200px] max-w-[300px]"
            >
              <Card meal={meal} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
