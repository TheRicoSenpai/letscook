import { Unit } from '../../../../model/unit.enum';
export class QuantityConverter{
    static ConvertTo(baseQty: number, baseUnit: Unit, targetUnit: Unit): number {
        switch (baseUnit) {
            case Unit.Unit:
                break;
            case Unit.Cup:
                break;
            case Unit.TablesSpoon:
                break;
            case Unit.TeaSpoon:
                switch (targetUnit)
                {
                    case Unit.ml:
                    case Unit.g:
                        return baseQty * 5;
                    case Unit.cl:
                        return baseQty * 0.5;
                    case Unit.l:
                    case Unit.kg:
                        return baseQty * 0.005;
                    default:
                        return baseQty;
                }
            case Unit.g:
                switch (targetUnit) {
                    case Unit.ml:
                        return baseQty;
                    case Unit.cl:
                        return baseQty / 10;
                    case Unit.l:
                    case Unit.kg:
                        return baseQty / 1000;
                    default:
                        return baseQty;
                    }
            case Unit.ml:
                switch (targetUnit) {
                    case Unit.g:
                        return baseQty;
                    case Unit.cl:
                        return baseQty / 10;
                    case Unit.l:
                    case Unit.kg:
                        return baseQty / 1000;
                    default:
                        return baseQty;
                    }
            case Unit.cl:
                switch (targetUnit) {
                    case Unit.ml:
                    case Unit.g:
                        return baseQty * 10;
                    case Unit.l:
                    case Unit.kg:
                        return baseQty / 100;
                    default:
                        return baseQty;
                }
            case Unit.kg:
                switch (targetUnit) {
                    case Unit.ml:
                    case Unit.g:
                        return baseQty * 1000;
                    case Unit.cl:
                        return baseQty * 100;
                    case Unit.l:
                    default:
                        return baseQty;
                    }
            case Unit.l:
                switch (targetUnit) {
                    case Unit.ml:
                    case Unit.g:
                        return baseQty * 1000;
                    case Unit.cl:
                        return baseQty * 100;
                    case Unit.kg:
                    default:
                        return baseQty;
                    }
            default:
                return baseQty;
        }
    }
}
