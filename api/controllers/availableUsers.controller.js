import User from "../models/user.models.js"

export const AvailableUsers = async (req, res, next) => {
    try {
        const users = await User.findOne({username, email, mobile});
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}