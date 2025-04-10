const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");


const app = express();

const PORT = 5000;

app.use(cors());

app.get("/quote" , async (req , res) => {
    try{
        const response = await fetch("https://dummyjson.com/quotes/random",{
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });
        const data = await response.json();
        console.log(data);
        res.json(data);
    }catch(error) {
        console.log("error fetch quote: " , error);
        res.status(500).json({error: "failed to fetch quote"});
    }
})
app.listen(PORT , () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
