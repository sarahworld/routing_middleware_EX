const express = require("express")
const ExpressError = require("./expressError")

const routes = require('./routes')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/items', routes)

app.get('/', (request, response) => {
    return response.send("HOMEPAGE")
})

//404 handler
app.use(function (request, response, next){
    return next(new ExpressError("NOt Found", 404));
})

//generic error handler
app.use(function (err, request, response, next) {

    let status = err.status || 500;

    return response.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    })
})

app.listen(3000, function () {
    console.log("Server is listening on port 3000")
})

module.exports = app;