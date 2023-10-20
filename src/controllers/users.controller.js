import { UserService } from "../services/users.service.js"
import { logger } from "../utils.js";


const Service = new UserService();


class UsersController {
    
    async getAll(req, res, next) {
        try {
            const users = await Service.getAllUser()
            return res.status(200).json({
                payload: users.map((user) => ({
                    name: user.firstName,
                    mail: user.email,
                    rol: user.role
            })),
        })
        } catch (error) {
            res.status(500).json({ error: 'could not get users' })
            next(error);
        }
    }


    async deleteById(req, res, next) {
        try {
            const idToDelete = req.params.id;
            await Service.deleteUser(idToDelete);
            logger.info("User " + idToDelete + " deleted")
            return res.status(200).send({
                status: "success",
                msg: "User deleted",
            })
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        
        try {
            const deletedCount = await Service.deleteInactiveUsers();

            res.json({ message: `${deletedCount} users deleted` });
        } catch (error) {
            res.status(500).json({ error: error.message });
            next(error);
        }
    };

    async updateUserRole(req, res, next) {
        try {
            const userId = req.params.id;
            const newRole = req.body.role;
            const userUpdated = await Service.updateRole(userId, { role: newRole })
            res.status(200).json({
                status: 'success',
                message: `user updated`,
            });
        } catch (error) {
            next(error)
        }
    }
}


export const usersController = new UsersController