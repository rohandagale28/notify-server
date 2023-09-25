const userModel = require("../model/User")
const requestModel = require("../model/request")

const addUser = async (req, res) => {
    try {
        const account = req.body
        const userExist = await userModel.findOne({ sub: req.body.sub })
        if (userExist) {
            return res.status(200).send({ message: "User Already Exist" })
        }
        const newUser = new userModel(account)
        await newUser.save()
        const newRequest = new requestModel({ sub: account.sub, name: account.name, pending_request: [], user_list: [] })
        await newRequest.save()
        res.status(201).send({ message: "New User Created" })
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

const getUser = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send(users)
    } catch (err) {
        res.send(500).json({ message: "Couldn't retrieve user" })
    }
}

module.exports = { addUser, getUser }