import { createContext, useContext, useState } from "react";
import RecipeContext from "./recipeContext";

const RecipeProvider = ({children}) => {
    const [search , setSearch] = useState('');
    const [recipes , setRecipes] = useState([]);



    return (
        <RecipeContext.Provider value={{search , recipes, setSearch , setRecipes}}>
            {children}
        </RecipeContext.Provider>
    )
}


export default RecipeProvider