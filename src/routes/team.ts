import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';

import TeamDao from '@daos/Team/teamdaos';
import {ITeam} from '@entities/Team';
import { paramMissingError } from '@shared/constants';

const TD = new TeamDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * 
 * @param req 
 * @param res 
 *  return status
 */

export async function addOneTeam(req:Request, res:Response) {
    const { team } = req.body;

    if(!team){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError
        });
    }
    team.id = await TD.setID();
    await TD.add(team);
    return res.status(CREATED).end();
}

/**
 * 
 * @param req 
 * @param res 
 * @returns ITeam
 */
export async function getTeam(req:Request, res:Response) {
    const {teamName} = req.body.team;
    if(!teamName){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
            
        });
    }
    let team:ITeam|null = await TD.getOne(teamName);
    return res.status(OK).json(team).end();  
}

/**
 * 
 * @param req 
 * @param res 
 * @returns status
 */
export async function updateTeam(req:Request, res:Response) {
    const {team} = req.body;
    if(!team){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError
        });
    }
    await TD.update(team);
    return res.status(StatusCodes.ACCEPTED).end();
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteTeam(req:Request, res:Response) {
    const {teamName} = req.body.team;
    if(!teamName){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError
        });
    }
    await TD.delete(teamName);
    res.status(StatusCodes.ACCEPTED).end();
}

export async function getAllTeams(req:Request, res: Response) {
    const teams = await TD.getAll();
    return res.status(OK).json({team: teams});
}