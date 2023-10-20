import { UserModel } from "../DAO/mongo/models/users.model.js";

export class UserService {
    async getAllUser() {
        try{
            const users = await UserModel.find()
            return users
        }catch(error) {
            next(error);
        }
    }

    async getById(id) {
        try{
        const user = await UserModel.findById(id);
        return user
    } catch(error){
        CustomError.createError({
            name: "user not found",
            message: `the user with the id: ${id} was not found`,
            code: EErrors.NOT_FOUND,
        });
        next(error)
        }
    }

    async deleteUser(_id) {
        try{
            const deletedUser = await UserModel.deleteOne({
                _id: _id
            });
        return deletedUser;
        } catch(error){
            CustomError.createError({
                name: "user not found",
                message: `the user with the id: ${id} was not found`,
                code: EErrors.NOT_FOUND,
            });
            next(error)
            }
        }

    async deleteInactiveUsers()  {
        try {
            const currentTimeInMilliseconds = Date.now();
            const cutoffTimeInMilliseconds = currentTimeInMilliseconds - 48 * 60 * 60 * 1000; 
            const result = await UserModel.deleteMany({
            lastConnection: { $lt: new Date(cutoffTimeInMilliseconds) },
            });
            return result.deletedCount;
        } catch (error) {
            next(error);
        }
    };


    async updateRole(id, { role }) {
        const user = await UserModel.findById(id);
        if (user) {
            user.role = role;
            await user.save();
            return user;
        }
    }
}