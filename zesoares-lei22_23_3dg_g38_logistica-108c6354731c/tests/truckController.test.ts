import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import {Container} from 'typedi';
import { Result } from '../src/core/logic/Result';

import truckSchemaInstance from "../src/persistence/schemas/truckSchema";
import truckRepoClass from "../src/repos/truckRepo";
import truckServiceClass from "../src/services/TruckService";


import TruckController from "../src/controllers/TruckController";
import ITruckService from "../src/services/TruckService";
import {ITruckDTO} from '../src/dto/ITruckDTO';

describe('truck controller', function() {


    beforeEach(function(){});

    it('returns json with all params when creating truck', async function (){

        let body = {        
            "designation" : "truck01",
            "tara" : "10",
            "cargoCapacity" : "20",
            "maxBattery" : "60",
            "autonomy" : "100",
            "chargingTime" : "2"
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
        Container.set("truckSchema", truckSchemaInstance);

        /**
         * Definiton of Repository
         */
        let truckRepoInstance = Container.get(truckRepoClass);
        Container.set("TruckRepo", truckRepoInstance);

        /**
         * Definition of Service
         */
        let truckServiceInstance = Container.get(truckServiceClass);
		Container.set("TruckService", truckServiceInstance);
        

        /**
         * Test #1
         */
        truckServiceInstance = Container.get("TruckService");
        sinon.stub(truckServiceInstance, "createTruck").returns(Result.ok<ITruckDTO>(
            {
                "domainId" : "123",
                "designation" : req.body.designation,
                "tara" : req.body.tara,
                "cargoCapacity" :req.body.cargoCapacity,
                "maxBattery" : req.body.maxBattery,
                "autonomy" : req.body.autonomy,
                "chargingTime" : req.body.chargingTime,
                "active" : true
            }
        ));

        const ctrl = new TruckController(truckServiceInstance as ITruckService);

        await ctrl.createTruck(<Request> req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            {
                "domainId" : "123",
                "designation" : req.body.designation,
                "tara" : req.body.tara,
                "cargoCapacity" :req.body.cargoCapacity,
                "maxBattery" : req.body.maxBattery,
                "autonomy" : req.body.autonomy,
                "chargingTime" : req.body.chargingTime,
                "active" : true
            }
        ));
    });

    it('returns empty array with all trucks when not existing', async function(){

        let body = {};
        let req : Partial<Request> = {};
        req.body = body;
        
        let res : Partial<Response> = {
            json : sinon.spy()
        };

        let next : Partial<NextFunction> = () => {};

        Container.set("truckSchema", truckSchemaInstance);

        let truckRepoInstance = Container.get(truckRepoClass);
        Container.set("TruckRepo", truckRepoInstance);

        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set("TruckService", truckServiceInstance);

        truckServiceInstance = Container.get("TruckService");

        sinon.stub(truckServiceInstance, "getAllTrucks").returns(Result.ok<ITruckDTO[]>());

        const ctrl = new TruckController(truckServiceInstance as ITruckService);

        await ctrl.createTruck(<Request> req,<Response> res,<NextFunction> next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            {

            }
        ));
    });
})