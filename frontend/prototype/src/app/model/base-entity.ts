import {Guid} from 'guid-typescript';
export class BaseEntity {
    public id: string = Guid.createEmpty().toString();
}
