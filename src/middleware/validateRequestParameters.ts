import Ajv, { SchemaObject } from 'ajv';
import addFormats from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';

import { HTTP400Error } from '@/utils/httpErrors';

export default (paramSchema: SchemaObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const ajv = new Ajv({ $data: true, coerceTypes: true, strict: false });
        addFormats(ajv);
        const paramSchemaKeys = Object.keys(paramSchema.properties);
        const requestParamObj = {} as any;
        for (const key of paramSchemaKeys) {
            if (req.method === 'GET') {
                requestParamObj[key] = get(req.query, key);
            } else {
                requestParamObj[key] = get(req.body, key);
            }
            const keyInRequestParams = get(req.params, key);
            if (keyInRequestParams) {
                requestParamObj[key] = keyInRequestParams;
            }
        }
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
