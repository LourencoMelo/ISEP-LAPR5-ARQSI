import { Planning } from "../domain/planning/Planning";
import IPlanningDTO from "../dto/IPlanningDTO";
import { Mapper } from "../core/infra/Mapper";
import { IPlanningPersistence } from "../dataschema/IPlanningPersistence";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PlanningMap extends Mapper<Planning> {

    public static toDTO( planning: Planning): IPlanningDTO {
        return {
            //extracting primitive type values
            domainId: planning.id.toString(),
            idCamiao: planning.idCamiao,
            entregas: planning.entregas,
            caminho: planning.caminho,
            tempo: planning.tempo
        } as IPlanningDTO;
    }

    public static toDomain (planning: any | Model<IPlanningPersistence & Document> ): Planning {
        const planningOrError = Planning.create(
          planning,
          new UniqueEntityID(planning.domainId),
        );

        planningOrError.isFailure ? console.log(planningOrError.error) : '';
            
        return planningOrError.isSuccess ? planningOrError.getValue() : null;
    }


    public static toPersistence (planning: Planning): any {
        return {
            domainId: planning.id.toString(),
            idCamiao: planning.idCamiao,
            entregas: planning.entregas,
            caminho: planning.caminho,
            tempo: planning.tempo
        }
    }
}