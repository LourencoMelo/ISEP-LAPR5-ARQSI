import { Router } from "express";
import config from "../../../config";
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import ITruckController from "../../controllers/IControllers/ITruckController";

const route = Router();

export default (app : Router) => { 
    app.use('/trucks', route);

    const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

    route.post('', 
        celebrate({
            body : Joi.object({
                designation: Joi.string().required(),
                tara: Joi.number().required(),
                cargoCapacity: Joi.number().required(),
                maxBattery: Joi.number().required(),
                autonomy: Joi.number().required(),
                chargingTime: Joi.number().required(),
            })
        }),
        (req,res,next) => ctrl.createTruck(req,res,next)
    );


    route.get('/getAll',
    celebrate({
      body: Joi.object()
    }),
    (req, res, next) => ctrl.getAllTrucks( req, res, next));

    route.get('/getAllActive',
    celebrate({
      body: Joi.object()
    }),
    (req, res, next) => ctrl.getAllActiveTrucks( req, res, next));

    route.get('/getTruckById/:id',
    celebrate({
        body: Joi.object({
        })
      }),
      (req, res, next) => ctrl.getTruckById(req, res, next));

    route.put('/:id',
    celebrate({
        body : Joi.object({
            designation: Joi.string().required(),
            tara: Joi.number().required(),
            cargoCapacity: Joi.number().required(),
            maxBattery: Joi.number().required(),
            autonomy: Joi.number().required(),
            chargingTime: Joi.number().required(),}),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next));

    route.put('/inactivateTruck/:id',
    celebrate({
        body: Joi.object({
        })
    }),
    (req, res, next) => ctrl.inactivateTruck(req, res, next));

    route.put('/activateTruck/:id',
    celebrate({
        body: Joi.object({
        })
    }),
    (req, res, next) => ctrl.activateTruck(req, res, next));


    

}