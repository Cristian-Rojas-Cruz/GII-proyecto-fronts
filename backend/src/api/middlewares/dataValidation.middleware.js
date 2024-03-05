import { UserModel, RoleModel } from "../../data/index.js";

export const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    UserModel.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                res.status(400).send({
                message: "Failed! Username is already in use!",
        });
        return;
    }

    // Email
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!",
                });
                return;
            }
            next();
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while checking email duplication.",
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while checking username duplication.",
        });
    });
};

const availableRoles = ["admin", "moderator", "user"]

export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!availableRoles.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i],
                });
                return;
            }
        }
    }
    next();
};


