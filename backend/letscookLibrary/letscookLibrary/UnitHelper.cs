using System;
using System.Collections.Generic;
using System.Text;

namespace letscookLibrary
{
    public static class UnitHelper
    {
        public static double ConvertTo(double baseQty, Unit baseUnit, Unit targetUnit)
        {
            switch (baseUnit)
            {
                case Unit.Unit:
                    throw new Exception(string.Format("Impossible to convert {0} into {1}", baseUnit, targetUnit));
                case Unit.Cup:
                    switch (targetUnit)
                    {
                        case Unit.ml:
                        case Unit.g:
                            return baseQty * 250;
                        case Unit.cl:
                            return baseQty * 25;
                        case Unit.l:
                        case Unit.kg:
                            return baseQty * 0.25;
                        default:
                            throw new Exception(string.Format("Impossible to convert {0} into {1}", baseUnit, targetUnit));
                    }
                case Unit.TablesSpoon:
                    switch (targetUnit)
                    {
                        case Unit.ml:
                        case Unit.g:
                            return baseQty * 15;
                        case Unit.cl:
                            return baseQty * 1.5;
                        case Unit.l:
                        case Unit.kg:
                            return baseQty * 0.015;
                        default:
                            throw new Exception(string.Format("Impossible to convert {0} into {1}", baseUnit, targetUnit));
                    }
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
                            throw new Exception(string.Format("Impossible to convert {0} into {1}", baseUnit, targetUnit));
                    }
                case Unit.g:
                    switch (targetUnit)
                    {
                        case Unit.ml:
                            return baseQty;
                        case Unit.cl:
                            return baseQty / 10;
                        case Unit.l:
                        case Unit.kg:
                            return baseQty / 1000;
                        default:
                            throw new Exception(string.Format("Impossible to convert {0} into {1}", baseUnit, targetUnit));
                    }
                case Unit.ml:
                    switch (targetUnit)
                    {
                        case Unit.g:
                            return baseQty;
                        case Unit.cl:
                            return baseQty / 10;
                        case Unit.l:
                        case Unit.kg:
                            return baseQty / 1000;
                        default:
                            throw new Exception(string.Format("Impossible to convert {0} into {1}", baseUnit, targetUnit));
                    }
                case Unit.cl:
                    switch (targetUnit)
                    {
                        case Unit.ml:
                        case Unit.g:
                            return baseQty * 10;
                        case Unit.l:
                        case Unit.kg:
                            return baseQty / 100;
                        default:
                            throw new Exception(string.Format("Impossible to convert {0} into {1}", baseUnit, targetUnit));
                    }
                case Unit.kg:
                    switch (targetUnit)
                    {
                        case Unit.ml:
                        case Unit.g:
                            return baseQty * 1000;
                        case Unit.cl:
                            return baseQty * 100;
                        case Unit.l:
                        default:
                            throw new Exception(string.Format("Impossible to convert {0} into {1}", baseUnit, targetUnit));
                    }
                case Unit.l:
                    switch (targetUnit)
                    {
                        case Unit.ml:
                        case Unit.g:
                            return baseQty * 1000;
                        case Unit.cl:
                            return baseQty * 100;
                        case Unit.kg:
                        default:
                            throw new Exception(string.Format("Impossible to convert {0} into {1}", baseUnit, targetUnit));
                    }
                default:
                    throw new Exception(string.Format("Impossible to convert {0} into {1}", baseUnit, targetUnit));
            }
        }
    }
}
