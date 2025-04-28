const express = require("express");
const {MongoClient} = require("mongodb");
const mongourl = "mongodb+srv://new_user:zoo44321@cluster0.d0bwl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
const client = new MongoClient(mongourl); 
app.use(express.json());
app.use(express.static("public"));
const run = async() => {
    try {
        console.log("Connection to mongodb...");
    await client.connect();
        console.log("Connected to mongodb.");
    const db = client.db("Stock");
    const col = db.collection("PublicCompanies");
    
    app.get("/query", async (req,res) => {    
    const {search,choice} = req.query;
    console.log(search,choice);
    const Test = await col.find({});
    const foundcompany = await col.findOne(choice === "name"? {company:search}: {ticker:search});
    console.log("Found company.",foundcompany);
    res.json({data:foundcompany});
});
      app.listen(process.env.PORT || 3000, () => {
        console.log(process.env.PORT);
        console.log("App is listening.");
    });
    } catch(err){
        console.error("Startup error: ",err);
        process.exit(1);
    }
    };
run();

