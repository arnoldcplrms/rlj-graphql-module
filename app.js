const app = require('express')(),
    bodyParser = require('body-parser'),
    { PORT, MONGO_URL } = require('./src/config/config'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    db = mongoose.connection,
    graphqlHttp = require('express-graphql'),
    schema = require('./schema');

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
    return this.toString();
};


app.use([
    cors(),
    bodyParser.json()
]).listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}))

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true
});

db.once('open', () => {
    console.log("Connected to Server");
}).on('error', (err) => {
    console.log("CONNECTION FAILED!");
    console.log(err);
});

//require('./src/routes_index')(app);