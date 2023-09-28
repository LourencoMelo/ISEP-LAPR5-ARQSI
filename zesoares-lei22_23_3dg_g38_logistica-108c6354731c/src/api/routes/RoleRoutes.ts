import { Router } from "express";
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRoleController from '../../controllers/IControllers/IRoleController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controllers.role.name) as IRoleController;

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createRole(req, res, next));

  route.put('/:id',
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateRole(req, res, next));

  route.get('/getRoleById/:id',
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.getRole(req, res, next));

  route.get('/getAll',
    celebrate({
      body: Joi.object()
    }),
    (req, res, next) => ctrl.getAll(req, res, next));

  route.get('/getRoleByName/:name', celebrate({
    body: Joi.object({
    })
  }),
    (req, res, next) => ctrl.getByName(req, res, next));


}