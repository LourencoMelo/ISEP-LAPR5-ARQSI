import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import IPlanningDTO from "../../dto/IPlanningDTO";
import {Result} from "../../core/logic/Result";

interface PlanningProps {
    idCamiao: string;
    entregas : string[];
    caminho: string[];
    tempo: number;
}

export class Planning extends AggregateRoot<PlanningProps>{

    /**
    * Returns the unique id of the planning route
    */
    get id(): UniqueEntityID {
        return this._id;
    }

    get idCamiao(): string {
        return this.props.idCamiao;
    }

    set idCamiao(idCamiao: string) {
        this.props.idCamiao = idCamiao;
    }

    get entregas(): string[] {
        return this.props.entregas;
    }

    set entregas(entregas: string[]) {
        this.props.entregas = entregas;
    }

    get tempo(): number {
        return this.props.tempo;
    }

    set tempo(tempo: number) {
        this.props.tempo = tempo;
    }

    get caminho() : string[] {
        return this.props.caminho;
    }

    /**
     * Private constructor to create planning route
     * @param props  planning route data
     * @param id unique identifier
     */
    private constructor (props : PlanningProps, id? : UniqueEntityID){
        super(props, id);
    }

    public static create(planningDTO : IPlanningDTO, id? : UniqueEntityID) : Result<Planning> {
        const idCamiao = planningDTO.idCamiao;
        const entregas = planningDTO.entregas;
        const caminho = planningDTO.caminho;
        const tempo = planningDTO.tempo;

        const planning = new Planning({idCamiao : idCamiao, entregas : entregas, caminho : caminho, tempo : tempo}, id);

        return Result.ok<Planning>(planning);
    }
  
}