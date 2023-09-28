// import 'reflect-metadata';

// import * as sinon from 'sinon';
// import {Container} from 'typedi';
// import {Result} from "../../../src/core/logic/Result";

// import IPathDTO from "../../../src/dto/IPathDTO";
// import pathSchemaInstance from "../../../src/persistence/schemas/PathSchema";
// import pathRepoClass from "../../../src/repos/PathRepo";
// import pathServiceClass from "../../../src/services/PathService";
// import PathService from '../../../src/services/PathService';
// import PathRepo from '../../../src/repos/PathRepo';
// import IPathRepo from '../../../src/services/IRepos/IPathRepo';
// import {Path} from "../../../src/domain/path/Path";
// import { Console } from 'console';

// describe('Path service', function () {
//     beforeEach(function(){});

//     it('returns json with all params when creating Path', async function(){


//         const dto =  {

//             //Extracting primitive type values of the value objects
//             id : "123",
//             id_warehouse1 : "W01",
//             id_warehouse2 : "W01",
//             distance : 100,
//             path_time : 100,
//             energy : 100,
//             extra_time : 100

//         } as IPathDTO;


//         Container.set("PathSchema", pathSchemaInstance);

//         let pathServiceInstance = Container.get(pathServiceClass);
//         Container.set("PathService", pathServiceInstance);

//         let pathRepoInstance = Container.get(pathRepoClass);
//         Container.set("PathRepo", pathRepoInstance);


//         pathServiceInstance = Container.get("PathService");

//         console.log("Chegou aqui!");

//         sinon.stub(pathRepoInstance, "save").returns(({
//             "id" : "123",
//             "id_warehouse1" : "W01",
//             "id_warehouse2" : "W01",
//             "distance" : 100,
//             "path_time" : 100,
//             "energy" : 100,
//             "extra_time" : 100
//         }));

//         const ctrl = new PathService(pathRepoInstance as IPathRepo);

//         const dtoResult = await ctrl.createPath(dto);

//         console.log("\nDto result :" + dtoResult.getValue());

//         sinon.assert.calledWith(dtoResult,
//             sinon.match({
//                 "id" : "123",
//                 "id_warehouse1" : "W01",
//                 "id_warehouse2" : "W01",
//                 "distance" : 100,
//                 "path_time" : 100,
//                 "energy" : 100,
//                 "extra_time" : 100
//             }));
//     });



// });