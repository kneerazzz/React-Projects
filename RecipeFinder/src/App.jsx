import RecipeFinder from "./components/RecipeFinder"
import RecipeProvider from "./Context/RecipeContext"

function App() {

  return (
    <RecipeProvider>
      <RecipeFinder />
    </RecipeProvider>
  )
}

export default App
