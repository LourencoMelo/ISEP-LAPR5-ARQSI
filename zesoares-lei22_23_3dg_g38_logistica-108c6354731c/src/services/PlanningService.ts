import { Result } from "../core/logic/Result";
import { Planning } from '../domain/planning/Planning';
import IPlanningDTO from '../dto/IPlanningDTO';
import IPlanningRepo from "./IRepos/IPlanningRepo";
import { PlanningMap } from '../mappers/PlanningMap';
import IPlanningService from './IServices/IPlanningService';
import config from "../../config";
import { Inject, Service } from "typedi";



const fetch = require('node-fetch');

@Service()
export default class PlanningService implements IPlanningService{

    constructor(@Inject(config.repos.planning.name) private planningRepo : IPlanningRepo){}
    /**
     * Calls Planning API in order to obtain a planning specific to a given truck
     * @returns dto object of planning. Contains an array of strings(warehouses ids) and a number corresponding to total route time
     */
    public async getPlanning(): Promise<Result<IPlanningDTO>>{

        

        try {
            // const plan = await request<string>('http://127.0.0.1:8000/api/planning/frota');

            const http = require('http');

            http.get('http://127.0.0.1:8000/api/planning/frota', (res) =>{
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {

                        var lines = data.split('\n');
                        // remove one line, starting at the first position
                        lines.splice(0,3);
                        // join the array back into a single string
                        var newtext = lines.join('\n');

                        const jsonObject = JSON.parse(newtext);

                        console.log("\n\nJson : " + jsonObject);

                        const frota = jsonObject.frota;

                        console.log("\n\n\nFrota : " + frota);

                        console.log(frota[0].idCamiao);

                        frota.forEach(element => {
                            const viagemDTO = element as IPlanningDTO;
                            
                            this.createViagem(viagemDTO);

                        });             

                    } catch (err) {
                      console.error(err.message);
                    }
                  });
                }).on('error', (err) => {
                  console.error(err.message);
            });

            return null;

        }catch(error){
            console.log("\n erro no request ao prolog!\n")

            throw error;
        }
    }


        public async createViagem(planDTO : IPlanningDTO) : Promise<Result<IPlanningDTO>> {

            try {
                const viagemOrError = await Planning.create(planDTO);
    
                if (viagemOrError.isFailure){
                    return Result.fail<IPlanningDTO>(viagemOrError.errorValue());
                }
    
                const viagemResult = viagemOrError.getValue();
    
                await this.planningRepo.save(viagemResult);
    
                const viagemDTOResult = PlanningMap.toDTO(viagemResult) as IPlanningDTO;
    
                return Result.ok<IPlanningDTO>(viagemDTOResult);
    
            } catch (error){
                throw error;   
            }
    
        }


        public async getAllViagens(): Promise<Result<IPlanningDTO[]>> {
            try {
              const viagens = await this.planningRepo.findAll();
        
              if (viagens === null) {
                return Result.fail<IPlanningDTO[]>("Plan not found");
              } else {
                let viagensDTOResult: IPlanningDTO[] = [];
                viagens.forEach(truck => {
                    viagensDTOResult.push(PlanningMap.toDTO(truck) as IPlanningDTO);
                });
                return Result.ok<IPlanningDTO[]>(viagensDTOResult);
              }
            } catch (e) {
              throw e;
            }
        }



}



/**
 * Generic function to build a request
 * @param url url of the request
 * @param config empty by default
 * @returns response from request
 */
function request<RequestResponse>(url : string, config = {}) : Promise<RequestResponse> {

    return fetch(url, config)
            .then((response) => response.json())
            .then((data) => data as RequestResponse);

}

