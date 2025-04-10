import Quote from "./components/Quote"

function App() {

  return (
      <div className="flex items-center justify-center h-screen p-4 bg-gray-500">
        <div className="bg-white rounded-xl p-6">
          <div className="text-center">
            <h2 className="font-bold text-black text-3xl pb-2">Quote Generator</h2>
            <Quote />
          </div>
        </div>
        
      </div>
  )
}

export default App
