import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { IPlanningPersistence } from '../dataschema/IPlanningPersistence';
import { Planning } from '../domain/planning/Planning';
import { PlanningMap } from '../mappers/PlanningMap';
import IPlanningRepo from "../services/IRepos/IPlanningRepo";

@Service()
export default class PlanningRepo implements IPlanningRepo {
    private models: any;

    //Injects dependecy to the defined truck schema
    constructor(
        @Inject('PlanningSchema') private planningSchema: Model<IPlanningPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(planning: Planning): Promise<boolean> {
        const idX = planning.id instanceof UniqueEntityID ? (<UniqueEntityID>planning.id).toValue() : planning.id;
        const query = { domainId: idX };

        const planningDocument = await this.planningSchema.findOne(query as FilterQuery<IPlanningPersistence & Document>);

        return !!planningDocument === true;
    }

    public async save(planning: Planning): Promise<Planning> {
        const query = { domainId: planning.id.toString() };

        const planningDocument = await this.planningSchema.findOne(query);

        try {
            if (planningDocument === null) {
                const rawPlanning: any = PlanningMap.toPersistence(planning);

                const planningCreated = await this.planningSchema.create(rawPlanning);

                return PlanningMap.toDomain(planningCreated);
            } else {
                planningDocument.idCamiao = planning.idCamiao;
                planningDocument.entregas = planning.entregas;
                planningDocument.caminho = planning.caminho;
                planningDocument.tempo = planning.tempo;

                await planningDocument.save();

                return planning;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(planningID: UniqueEntityID | string): Promise<Planning> {
        const query = { domainId: planningID };
        const planningRecord = await this.planningSchema.findOne(query as FilterQuery<IPlanningPersistence & Document>);

        if (planningRecord != null) {
            return PlanningMap.toDomain(planningRecord);
        }
        else
            return null;
    }

    public async findAll(): Promise<Planning[]> {
        try {
            var planningList: Planning[] = [];
            const list = await this.planningSchema.find();
            list.forEach(planning => {
                planningList.push(PlanningMap.toDomain(planning));
            });
            return planningList;
        }
        catch (e) {
            throw e;
        }
    }
}