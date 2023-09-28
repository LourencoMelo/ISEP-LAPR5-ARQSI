import { Router } from "express";
import config from "../../../config";
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import IPlanningController from "../../controllers/IControllers/IPlanningController";


const route = Router();

export default (app : Router) => { 

    app.use('/planning/frota', route);

    const ctrl = Container.get(config.controllers.planning.name) as IPlanningController;

    route.get('',
    celebrate({
        body : Joi.object()
    }),
        (req,res,next) => ctrl.getPlanning(req,res,next)    
     );

     route.get('/getAll',
     celebrate({
       body: Joi.object()
     }),
     (req, res, next) => ctrl.getAllViagens( req, res, next));


}
