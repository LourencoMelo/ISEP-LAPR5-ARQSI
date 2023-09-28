export default interface IPathDTO{
    id : string;
    id_warehouse1 : string;     //Id of first warehouse
    id_warehouse2 : string;     //Id of second warehouse
    distance : number;          //Distance between warehouses
    path_time : number;         //Time to travel between warehouses
    energy : number;            //Energy consumed while traveling
    extra_time : number        //Extra time spent for extra charging
}