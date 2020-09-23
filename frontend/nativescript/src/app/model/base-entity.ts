import { Guid } from "guid-typescript";
export class BaseEntity {
     id: string = Guid.createEmpty().toString();
}
