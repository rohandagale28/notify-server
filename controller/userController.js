const userModel = require("../model/User")

const addUser = async (req, res) => {
    try {
        const account = req.body
        const userExist = await userModel.findOne({ sub: req.body.sub })
        if (userExist) {
            return res.status(200).send(userExist)
        }
        const newUser = new userModel({ ...account, request_list: [], user_list: [] })
        await newUser.save()
        res.status(201).send(newUser)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }NavigationPreloadManager
}

const getUser = async (req, res) => {
    console.log(req.params.id)
    try {
        const users = await userModel.find({ name: req.params.id })
        console.log(users)
        return res.status(200).send(users)
    } catch (err) {
        res.status(500).json({ message: "Couldn't retrieve user" })
    }
}

module.exports = { addUser, getUser }