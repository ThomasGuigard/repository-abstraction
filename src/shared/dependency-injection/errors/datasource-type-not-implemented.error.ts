import {DatasourceTypeEnum} from "../enums/datasource-type.enum";

export class DatasourceTypeNotImplemented extends Error {

  constructor(datasourceType: DatasourceTypeEnum) {
    super(`Datasource type ${datasourceType} is not implemented`);
  }
}