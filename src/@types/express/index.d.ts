import { ITeam } from "@entities/Team";

declare module 'express' {
    export interface Request  {
        body: {
            team: ITeam
        };
    }
}
