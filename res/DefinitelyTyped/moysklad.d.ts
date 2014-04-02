declare module Moysklad {

    class Entity {
        A:string;
    }

    class InfoEntity extends Entity {
        B:Date;
    }

    class LegendEntity extends InfoEntity {
        C:string;
    }

    class Employee extends LegendEntity {
        D:Array<any>;
    }

    class Client {

        load<T> (T, uuid:string):T;

        /*load(type:'entity', uuid:string):Entity;

         load(type:'infoEntity', uuid:string):InfoEntity;

         load(type:'legendEntity', uuid:string):LegendEntity;

         load(type:'employee', uuid:string):Employee;*/

        // + 100 more
    }

    function createClient():Client;

}

declare module "moysklad" {
    export = Moysklad;
}