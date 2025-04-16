import  endpointsJson  from '../endpoints.json';
import { Request, Response, NextFunction } from 'express';

 const getEndpoints = (req:Request, res:Response, next:NextFunction)=> {
       res.status(200).send({ endpoints: endpointsJson })
 }

 export default getEndpoints