const express = require("express");
const {MongoClient} = require("mongodb")
const mongourl = "mongodb+srv://new_user:zoo44321@cluster0.d0bwl.mongodb.net/%3FretryWrites=true&w=majority&appName=Cluster0";
const app = express();
const client = new MongoClient(mongourl,{
    tls:true
});
const db = client.db("Stock");
const col = db.collection("PublicCompanies");
app.use(express.json());
app.use(express.static("public"));
app.get("/query", async (req,res) => {
    const {search,choice} = req.query;
    console.log(search,choice);
    const Test = await col.find({});
    const foundcompany = await col.findOne(choice === "name"? {company:search}: {ticker:search});
    console.log("Found company.",foundcompany);
    res.json({data:foundcompany});
})
const run = async() => {
  try {
    await client.connect();
    app.listen(process.env.PORT || 3000, () => {
        console.log("App is listening.")
    })
  } catch (error) {
    console.log(error);
  }
}
run();

