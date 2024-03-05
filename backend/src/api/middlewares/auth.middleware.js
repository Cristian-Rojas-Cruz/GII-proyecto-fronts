import jwt from 'jsonwebtoken';
import { environment } from '../../config/index.js';
import { UserModel } from '../../data/index.js';

export const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, environment.jwt_key, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }

        req.userId = decoded.id;
        next();
    });
};

export const isAdmin = (req, res, next) => {
    UserModel.findById(req.userId).then(user => {
        if (user && user.roles.includes(3)) {
            next();
        } else {
            res.status(403).send({
                message: "Require Admin Role!"
            });
        }
    });
};

export const isModerator = (req, res, next) => {
    UserModel.findById(req.userId).then(user => {
        if (user && user.roles.includes(2)) {
            next();
        } else {
            res.status(403).send({
                message: "Require Moderator Role!"
            });
        }
    });
};

export const isModeratorOrAdmin = (req, res, next) => {
    UserModel.findById(req.userId).then(user => {
        if (user && (user.roles.includes(2) || user.roles.includes(3))) {
            next();
        } else {
            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        }
    });
};