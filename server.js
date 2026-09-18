const express = reuire("express");

const app = express();
app.use(express.jspn());

app.get("/" ,(req,res)=>{
    res.json({
        message: "Blogging API is running";
    });
});

app.listen(3000 ,()=>{
    console.log("Server running on port 3000");
})