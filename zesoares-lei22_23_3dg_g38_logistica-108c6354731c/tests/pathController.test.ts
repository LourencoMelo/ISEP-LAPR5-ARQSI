import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import {Container} from 'typedi';
import { Result } from '../src/core/logic/Result';

import pathSchemaInstance from "../src/persistence/schemas/PathSchema";
import pathRepoClass from "../src/repos/PathRepo";
import pathServiceClass from "../src/services/PathService";


import PathController from "../src/controllers/PathController";
import IPathService from "../src/services/PathService";
import IPathDTO from '../src/dto/IPathDTO';

describe('path controller', function() {


    beforeEach(function(){});

    it('returns json with all params when creating Path', async function (){

        let body = {        
            "id_warehouse1" : "W01",
            "id_warehouse2" : "W02",
            "distance" : 100,
            "path_time" : 60,
            "energy" : 100,
            "extra_time" : 10
        }

        let req : Partial<Request> = {};
        req.body = body;

        let res : Partial<Response> = {
            json : sinon.spy()
        };

        let next : Partial<NextFunction> = () => {};

        /**
         * Definiton of Schema
         */
        Container.set("PathSchema", pathSchemaInstance);

        /**
         * Definiton of Repository
         */
        let pathRepoInstance = Container.get(pathRepoClass);
        Container.set("PathRepo", pathRepoInstance);

        /**
         * Definition of Service
         */
        let pathServiceInstance = Container.get(pathServiceClass);
		Container.set("PathService", pathServiceInstance);
        

        /**
         * Test #1
         */
        pathServiceInstance = Container.get("PathService");
        sinon.stub(pathServiceInstance, "createPath").returns(Result.ok<IPathDTO>(
            {
                "id" : "123",
                "id_warehouse1" : req.body.id_warehouse1,
                "id_warehouse2" : req.body.id_warehouse2,
                "distance" : req.body.distance,
                "path_time" : req.body.path_time,
                "energy" : req.body.energy,
                "extra_time" : req.body.extra_time
            }
        ));

        const ctrl = new PathController(pathServiceInstance as IPathService);

        await ctrl.createPath(<Request> req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            {
                "id" : "123",
                "id_warehouse1" : req.body.id_warehouse1,
                "id_warehouse2" : req.body.id_warehouse2,
                "distance" : req.body.distance,
                "path_time" : req.body.path_time,
                "energy" : req.body.energy,
                "extra_time" : req.body.extra_time
            }
        ));
    });


    it('returns empty array with all paths when not existing', async function(){

        let body = {};
        let req : Partial<Request> = {};
        req.body = body;
        
        let res : Partial<Response> = {
            json : sinon.spy()
        };

        let next : Partial<NextFunction> = () => {};

        Container.set("PathSchema", pathSchemaInstance);

        let pathRepoInstance = Container.get(pathRepoClass);
        Container.set("PathRepo", pathRepoInstance);

        let pathServiceInstance = Container.get(pathServiceClass);
        Container.set("PathService", pathServiceInstance);

        pathServiceInstance = Container.get("PathService");

        sinon.stub(pathServiceInstance, "getAllPaths").returns(Result.ok<IPathDTO[]>());

        const ctrl = new PathController(pathServiceInstance as IPathService);

        await ctrl.createPath(<Request> req,<Response> res,<NextFunction> next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            {

            }
        ));
    });

})