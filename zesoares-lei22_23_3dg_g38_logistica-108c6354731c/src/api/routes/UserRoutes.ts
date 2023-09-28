import { Router } from "express";
import { celebrate, Joi } from 'celebrate';
import config from "../../../config";
import { Container } from 'typedi';
import IUserController from '../../controllers/IControllers/IUserController';

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    const ctrl = Container.get(config.controllers.user.name) as IUserController;

    route.post('',
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                userName: Joi.string().required(),
                phoneNumber: Joi.number().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                role: Joi.string().required(),
            })
        }),
        (req, res, next) => ctrl.createUser(req, res, next));

    route.put('/:id',
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                userName: Joi.string().required(),
                phoneNumber: Joi.number().required(),
                email: Joi.string().required(),
                role: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.updateUser(req, res, next));

    route.put('/deactivate/:id',
        celebrate({
            body: Joi.object({
                // userName: Joi.string().required(),
                // role: Joi.string().required(),
            })
        }),
        (req, res, next) => ctrl.deactivateUser(req, res, next));

    route.get('/getUserByEmail/:email', celebrate({
        body: Joi.object({
        })
    }),
        (req, res, next) => ctrl.getUserByEmail(req, res, next));

    route.get('/getAll',
        celebrate({
            body: Joi.object()
        }),
        (req, res, next) => ctrl.getAllUsers(req, res, next));
}