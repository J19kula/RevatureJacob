import { QueryCommand, DeleteCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import Team, {ITeam} from "@entities/Team";
import {ddbDoc} from "@daos/db/dynamo";
import { String } from "aws-sdk/clients/appstream";

export interface ITeamsDaos{
    getOneTeam: (name: string) => Promise<ITeam[]|null>;
    getOne: (name:string) => Promise<ITeam|null>;
    getAll: () => Promise<ITeam[]>;
    add: (iTeam: ITeam) => Promise<void>;
    update: (iTeam: ITeam) => Promise<void>;
    delete: (name: String) => Promise<void>;
    setID: () => Promise<number>;
    getID: (name: string) => Promise<number>;
}


class TeamDao implements ITeamsDaos {
    private TableName = 'FifaTeamList';

    public async getOneTeam(name: string): Promise<ITeam[]|null>{
        const params = {
            TableName: this.TableName,
            FilterExpression: "teamName = :teamName",
            ExpressionAttributeValues: {
                ':teamName': name,
            }, 
        };

        const data = await ddbDoc.send(new ScanCommand(params));
        let TeamData:Team[] = [];

        if(data.Items !== undefined){
            for(let i of data.Items){
                TeamData.push(new Team(i.teamName, i.price, i.firstName, i.lastName, i.id));
                };
                return Promise.resolve(TeamData)
            }
            return Promise.resolve(null);
    }

    public async getOne(name: string): Promise<ITeam|null>{
        const params = {
            TableName: this.TableName,
            FilterExpression: "teamName = :teamName",
            ExpressionAttributeValues: {
                ':teamName': name,
            }, 
        };

        const data = await ddbDoc.send(new ScanCommand(params));
        let TeamData:Team;

        if(data.Items !== undefined){
            for(let i of data.Items){
                TeamData = (new Team(i.teamName, i.price, i.firstName, i.lastName, i.id));
                return Promise.resolve(TeamData)
                };
            }
            return Promise.resolve(null);
    }

    public async add(iteam: ITeam): Promise<void>{
        const params = {
            TableName: this.TableName,
            Item: {
                id: iteam.id,
                teamName: iteam.teamName,
                price: iteam.price,
                firstName: iteam.firstName,
                lastName: iteam.lastName,
            }
        };
        console.log(params.Item);
        console.log("here");
        try {
            console.log("there1");
            const data = await ddbDoc.send(new PutCommand(params));
            console.log(data);
            console.log("there");
        } catch(error){
            console.error(error);
        }
    }
    public async update(iteam: ITeam): Promise<void>{
        const params = {
            TableName: this.TableName,
            Item: {
                ":teamName": iteam.teamName
            }
        };
        try {  
            const data = await ddbDoc.send(new ScanCommand(params));
            if(data.Items){
                console.log("It works! :D", data.Items);
            let iTeam:Team;
            for(let i of data.Items){
                iTeam = new Team(i.teamName, i.firstName, i.lastName, i.price, i.id);
                if(iTeam){
                    Object.entries(iteam).forEach(([key, item])=> {
                        iTeam[`${key}`] = item;
                    })
                await this.add(iTeam)
                console.log("Something worked", iTeam);
                    }
                }
            }

        } catch (error){
            console.error(error);
        }
    }

    public async delete(name: string): Promise<void>{
        let iTeam = await this.getOne(name);
        if(iTeam){
            const params = {
                TableName: this.TableName,
                Key: {
                    id: iTeam.id,
                }
            };
            try{
                const data = await ddbDoc.send(new DeleteCommand(params));
                console.log(data);

            } catch(error){
                console.error(error);

            }
        } else{
            console.log("Team is lost in time");
        }
    }
    public async getAll(): Promise<ITeam[]>{
        let team:ITeam[] = [];

        const params = {
            TableName: this.TableName,
            Items: {
                ":id": 0
            },

            Expression: "ID >= :id",
        };
        try {
            let Tdata:ITeam;
            const data = await ddbDoc.send(new ScanCommand(params));
            if(data.Items){
                console.log("It worked! :D", data.Items);

            for(let i of data.Items){
                Tdata = new Team(i.teamName, i.firstName, i.lastName, i.price, i.id);
                team.push(Tdata); 
            }
            }

        } catch (error){
            console.error(error);
        }
        return team;
    }
    public async setID(): Promise<number> {
        let id = 0;
        let all:ITeam[] = await this.getAll();
        id = all.length;
        return id;
    }

    public async getID(name: string): Promise<number>{
        const params = {
            TableName: this.TableName,
            Item: {
                ":teamName": name,
            },
            Expression: "teamName = :teamName",
        };
        try{
            const data = await ddbDoc.send(new ScanCommand(params));
            if(data.Items){
                console.log("It Worked, ", data.Items);
            for(let i of data.Items){
                let id  = i.id;
                if(id){
                    return id;
                }
            }
            }

        } catch(error){
            console.error(error);
        }
        return this.setID();
    }
}
export default TeamDao

