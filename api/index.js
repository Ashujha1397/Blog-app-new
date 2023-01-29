const express = require("express");

const app = express();
const dotenv = require("dotenv");
const mongoose = require ("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer  = require("multer")
const path = require("path")


dotenv.config();

app.use(express.json());

app.use("/images",express.static(path.join(__dirname,"/images")))
    
mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("mongo is connected")


        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, "images");
            },
            filename: (req, file, cb) => {
              cb(null, req.body.name);
            },
          });
          
          const upload = multer({ storage: storage });
          app.post("/api/upload", upload.single("file"), (req, res) => {
            res.status(200).json("File has been uploaded");
          });

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories", categoryRoute);


//static file

app.use(express.static(path.join(__dirname,'./client/build')));

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})






    
app.listen(3001,(req,res)=>{
    console.log("Backend is running.")
})
})



    














