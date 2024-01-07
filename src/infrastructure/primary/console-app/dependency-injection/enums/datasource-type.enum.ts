import {UnknownDatasourceTypeError} from "../errors/unknown-datasource-type.error";

export enum DatasourceTypeEnum {
  IN_MEMORY="IN_MEMORY",
  PRISMA="PRISMA",
  MIKRO_ORM="MIKRO_ORM"
}

export namespace DatasourceTypeEnum {

  export function fromValue(datasourceType: string): DatasourceTypeEnum {
    if (datasourceType === DatasourceTypeEnum.IN_MEMORY.valueOf()) return DatasourceTypeEnum.IN_MEMORY;
    if (datasourceType === DatasourceTypeEnum.PRISMA) return DatasourceTypeEnum.PRISMA;
    if (datasourceType === DatasourceTypeEnum.MIKRO_ORM) return DatasourceTypeEnum.MIKRO_ORM;

    throw new UnknownDatasourceTypeError(datasourceType);

  }
}