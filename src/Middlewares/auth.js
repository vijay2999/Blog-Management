const jwt = require("jsonwebtoken");
const blogModel = require("../Models/blogModel");
const mongoose = require("mongoose");


// //---------------------authentication--------------------//

const authenticate = function (req, res, next) {

    try {
        const token = req.headers["x-api-key"]
        if (!token) {
            return res.status(400).send({ status: false, msg: "Token must be present" });
        }
        const decodedToken = jwt.verify(token, "project1-room20-key");
        req.decodedToken = decodedToken

        if (decodedToken) {
            next()
        }
        else {
            return res.status(401).send({ status: false, msg: "Token is invalid" });
        }
    } catch (err) {
        console.log("this is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


//-----------------------authorisation------------------------//

const authorise = async function (req, res, next) {

    try {
        const decodedToken = req.decodedToken
        
        let blogId = req.params.blogId;
    
        const blog = await blogModel.findById(blogId);

        if (!blog) {
            return res.status(404).send({ status: false, msg: "Blog is not found" });
        }

        let tokenUser = decodedToken.authorId;
        let loginUser = blog.authorId

        if (tokenUser == loginUser) {
            next()
        } else {
            return res.status(403).send({ status: false, msg: "unauthorized  user info doesn't match" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
};



module.exports = { authenticate, authorise }




