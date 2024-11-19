import express from "express";
import axios from "axios";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();
    
const APIKey = process.env.API_KEY;
const config = {
    headers: {
        'X-CMC_PRO_API_KEY': APIKey
    }
};

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const api_url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
        const result = await axios.get(api_url, config);

        let countData = [];
        for (let i = 1; i < 100; i++) {
            countData.push(i);
        }

        res.render("index.ejs", { content: JSON.stringify(result.data), countData });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});