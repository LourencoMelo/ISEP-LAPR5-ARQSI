import { Router } from "express";
import config from "../../../config";
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import IPathController from "../../controllers/IControllers/IPathController";


const route = Router();

export default (app : Router) => { 

    app.use('/paths', route);

    const ctrl = Container.get(config.controllers.path.name) as IPathController;

    route.post('', 
        celebrate({
            body : Joi.object({
                id_warehouse1: Joi.string().required(),
                id_warehouse2: Joi.string().required(),
                distance: Joi.number().required(),
                path_time: Joi.number().required(),
                energy: Joi.number().required(),
                extra_time: Joi.number().required()
            })
        }),
        (req,res,next) => ctrl.createPath(req,res,next)
    );

    route.get('/getAll',
        celebrate({
            body: Joi.object()
        }),
        (req, res, next) => ctrl.getAllPaths( req, res, next)
    );

    route.get('/:id',
        celebrate({
            body : Joi.object()
        }),
        (req,res,next) => ctrl.getPathById(req,res,next)
    );

    route.put('/:id',
        celebrate({
            body: Joi.object({
                id_warehouse1: Joi.string().required(),
                id_warehouse2: Joi.string().required(),
                distance: Joi.number().required(),
                path_time: Joi.number().required(),
                energy: Joi.number().required(),
                extra_time: Joi.number().required()
            }),
        }),
        (req, res, next) => ctrl.updatePath(req, res, next)
    );
};