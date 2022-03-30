const jwt = require("jsonwebtoken");


const authentication = async function (req, res, next) {
    try {
        let token = req.headers["group17"];
        if (!token) {
            return res.send("token is not present")
        }
        else {
            let decodedtoken = jwt.verify(token, "project3group17")
            if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" })
            next();
        }

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

const authorisation = async function (req, res, next) {
    try {

        let token = req.headers['group17'];
        if (!token) {
            return res.status(404).send("token is not correct");
        }
        let validData = req.params.userId
        let userLoggedIn = decodedToken.userId

        if (validData != userLoggedIn) return res.send({ status: false, msg: 'not authorized' })

        let user = async function (req, res, next) {
            await userModel.findById(req.params.userId)

            if (!user)
                return res.send({ status: false, msg: 'No such user exists' })
            else
                res.send({ status: true, data: user })
        }
        next();
    } catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}


module.exports.authentication = authentication;
module.exports.authorisation = authorisation




        // const reviewsData = await reviewModel.find(rating)
