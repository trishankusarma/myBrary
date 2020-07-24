if(process.env.NODE_ENV !== 'production'){
    require('dotenv').parse();
}
//mongodb+srv://myBrary:4vdJwo32OjILnIb9@cluster0.2ljsy.mongodb.net/myBrary?retryWrites=true&w=majority
const express=require("express");
const app=express(); 
const hbs=require("hbs");
const mongoose= require("mongoose");
const bookRouter=require("./routes/book/index");
const authorRouter=require("./routes/author/index");
const path=require("path");
const templateDirectory=path.join(__dirname,"views","templates");
const partialDirectory=path.join(__dirname,"views","partials");
const PORT=process.env.PORT|| 8000;

//ufKDRz4wWnn3sCM
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set("view engine","hbs");
app.set("views",templateDirectory);
hbs.registerPartials(partialDirectory);
app.use("/book",bookRouter);
app.use("/author",authorRouter);

const db=mongoose.connection;

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

db.on("error",error=>console.error(error));
db.once("open",()=>console.log("Connected to mongoose"));

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen((PORT),()=>{
   console.log("succssfully  running on port "+PORT);
});