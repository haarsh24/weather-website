const path = require("path")
const express= require("express")
const hbs=require("hbs")

const geocode=require("./utlis/geocode")
const forecast=require("./utlis/forecast")

const app= express()
const port=process.env.PORT || 3000
// Define paths for express configuration
const publicDirectoryPath=path.join(__dirname,"../public/")
const viewsPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,"../templates/partials")

//setup handlebars engine and views location
app.set("views",viewsPath)
app.set("view engine","hbs")
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>
{
    res.render("index",
    {
        title:"Weather-APP",
        name:"harsh"
    })
})

app.get("/about",(req,res)=>
{
    res.render("about",
    {
        title:"ABout me !",
        name:"Harsh narayan"
    })
})

app.get("/help",(req,res)=>
{
    res.render("help",
    {
        title:"HElp PaGE !",
        name:"Harsh",
       
    })
})

app.get("/products",(req,res)=>
{
    if(! req.query.search)
    {
       return res.send({
            error:"You must provide a search term !"
        })
    }
    
    res.send({
        products:[]
    })
})

app.get("/weather",(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error:"Please provide the address"
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={})=>
    {
        if(error)
        {
        return res.send({  error })
        }

        forecast(latitude,longitude,(error,forecastData)=>
        {
             if(error)
             {
                 return res.send({error})
             }
             res.send({
                 forecast:forecastData,
                 location,
                 address:req.query.address
             })

        })
    }
   
)
})

app.get("/help/*",(req,res)=>
{
    res.render("404",{
        errorMessage:"Help page not found !",
        title:"404 not found",
        name:"Harsh"
    })
})
app.get("*",(req,res)=>
{
    res.render("404",{
       errorMessage:"Page not found !",
       title:"404 not found",
       name:"Harsh"
    })
})

app.listen(port,()=>
{
    console.log("Server is up and running on port "+port)
})