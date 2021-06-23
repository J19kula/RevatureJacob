export interface ITeam {
    id: number;
    teamName: string;
    price: number;
    firstName: string;
    lastName: string;
}

class Team implements ITeam {
    public id: number;
    public teamName: string;
    public price: number;
    public firstName: string;
    public lastName: string;
    [key:string]: any;

    constructor(teamName:string, firstName: string, lastName: string, price: number, id:number) {
            this.teamName = teamName;
            this.firstName = firstName;
            this.lastName = lastName;
            this.price = price;
            this.id = id;
    }
}

export default Team;
