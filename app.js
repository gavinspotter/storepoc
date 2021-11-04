const express = require("express")
const app = express();

//const sslRedirect = require("heroku-ssl-redirect");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const httpServer = require("http").createServer(app);
const path = require("path")


const io = require("socket.io")(httpServer, {
    cors: {
         origin: "http://localhost:3000",
        //origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

const adminRoutes = require("./routes/admin-routes")

const HttpError = require("./models/HttpError")





// app.enable('trust proxy');
// app.use(function (req, res, next) {
//   if (req.secure) {
//     next();
//   } else {
//     res.redirect('https://' + req.headers.host + req.url);
//   }
// });



app.use(bodyParser.json())

app.use(express.static(path.join('public')))


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});


app.use("/api/admin", adminRoutes)

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname , 'public', 'index.html'))
})



app.use((req, res, next) => {
    const error = new HttpError("could not find this route", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "an unknown error occured" });
});




//app.listen(process.env.PORT || 5000);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d3tnt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => {
        httpServer.listen(process.env.PORT || 5000)
        console.log("connected")
    })
    .catch((err) => {
        console.log(err);
    });