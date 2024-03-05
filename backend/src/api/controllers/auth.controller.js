import { UserModel, RoleModel } from '../../data/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from '../../config/index.js';

export const signup = (req, res) => {
    // Save User to Database
    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save()
        .then(user => {
            if (req.body.roles) {
                RoleModel.find({
                        name: {
                            $in: req.body.roles
                        }
                    })
                    .then(roles => {
                        user.roles = roles.map(role => role._id);
                        user.save()
                            .then(() => {
                                res.send({
                                    message: "The user was registered successfully!"
                                });
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                    });
            } else {
                // Default role = 1
                user.roles = [1];
                user.save()
                    .then(() => {
                        res.send({
                            message: "User was registered successfully!"
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

export const signin = (req, res) => {
    UserModel.findOne({
            username: req.body.username
        })
        .populate({
            path: 'roles',
            select: 'name'
        })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User Not found."
                });
            }

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }

            const token = jwt.sign({
                id: user._id
            },
            environment.jwt_key, {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });
            const authorities = user.roles.map(role => {
                return `ROLE_${role.name.toUpperCase()}`
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
            });
        })
        .catch(err => {
            console.log("error" +  err);
            res.status(500).send({
                message: err.message
            });
        });
};