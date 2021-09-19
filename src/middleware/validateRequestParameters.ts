import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '@/utils/httpErrors';
import Ajv, { SchemaObject } from 'ajv';

export default (paramSchema: SchemaObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ajv = new Ajv({ $data: true, coerceTypes: true, strict: false });
    const paramSchemaKeys = Object.keys(paramSchema.properties);
    const requestParamObj = {} as any;
    if (req.method === 'GET') {
      for (const key of paramSchemaKeys) {
        requestParamObj[key] = get(req.query, key);
      }
    } else {
      for (const key of paramSchemaKeys) {
        requestParamObj[key] = get(req.body, key);
      }
    }
    //TODO: handle req.params validation
    const validated = ajv.validate(paramSchema, requestParamObj);
    if (!validated) {
      const errorMessage = ajv.errors ? ajv.errors[0].message : 'Bad request.';
      throw new HTTP400Error(errorMessage);
    } else {
      next();
    }
  };
};

// Native implementation of lodash _.get
const get = (obj: any, path: any, defaultValue = undefined) => {
  const travel = (regexp: any) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};
