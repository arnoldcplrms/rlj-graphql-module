module.exports = (error, res) => {
    console.log(error);
    res.status(500).send({
        err: error.message
    })
}