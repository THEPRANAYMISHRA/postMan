const express=require("express")
const app=express()
const cors=require("cors")
const connection=require("./db")
const userRouter=require("./routes/users.routes")
const postRouter=require("./routes/posts.routes")
const auth=require("./middleware/auth.middleware")

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DataBase")
    } catch (error) {
        console.log(error)
    }
    console.log("Server running at port 8080")
})


// {
//     "name" :"pranay",
//     "email": "pm@gmail.com",
//     "gender":"male",
//     "password":"pranay",
//     "age":45,
//     "city":"lucknow",
//     "is_married":false
// }