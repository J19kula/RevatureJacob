"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const Team_1 = __importDefault(require("@entities/Team"));
const dynamo_1 = require("@daos/db/dynamo");
class TeamDao {
    constructor() {
        this.TableName = 'FifaTeamList';
    }
    getOne(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.TableName,
                TeamName: {
                    ':teamName': name
                },
            };
            const data = yield dynamo_1.ddbDoc.send(new lib_dynamodb_1.QueryCommand(params));
            let TeamData;
            if (data.Items !== undefined) {
                for (let i of data.Items) {
                    TeamData = new Team_1.default(i.teamNAME, i.price, i.firstName, i.lastName, i.id);
                    return Promise.resolve(TeamData);
                }
            }
            return Promise.resolve(null);
        });
    }
    add(iteam) {
        return __awaiter(this, void 0, void 0, function* () {
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
            try {
                const data = yield dynamo_1.ddbDoc.send(new lib_dynamodb_1.PutCommand(params));
                console.log(data);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    update(iteam) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.TableName,
                Item: {
                    ":teamName": iteam.teamName
                }
            };
            try {
                const data = yield dynamo_1.ddbDoc.send(new lib_dynamodb_1.ScanCommand(params));
                if (data.Items) {
                    console.log("It works! :D", data.Items);
                    let iTeam;
                    for (let i of data.Items) {
                        iTeam = new Team_1.default(i.teamName, i.firstName, i.lastName, i.price, i.id);
                        if (iTeam) {
                            Object.entries(iteam).forEach(([key, item]) => {
                                iTeam[`${key}`] = item;
                            });
                            yield this.add(iTeam);
                            console.log("Something worked", iTeam);
                        }
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    delete(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let iTeam = yield this.getOne(name);
            if (iTeam) {
                const params = {
                    TableName: this.TableName,
                    Key: {
                        teamName: iTeam.teamName
                    }
                };
                try {
                    const data = yield dynamo_1.ddbDoc.send(new lib_dynamodb_1.DeleteCommand(params));
                    console.log(data);
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                console.log("Team is lost in time");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let team = [];
            const params = {
                TableName: this.TableName,
                Items: {
                    ":id": 0
                },
                Expression: "ID >= :id",
            };
            try {
                let Tdata;
                const data = yield dynamo_1.ddbDoc.send(new lib_dynamodb_1.ScanCommand(params));
                if (data.Items) {
                    console.log("It worked! :D", data.Items);
                    for (let i of data.Items) {
                        Tdata = new Team_1.default(i.teamName, i.firstName, i.lastName, i.price, i.id);
                        team.push(Tdata);
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
            return team;
        });
    }
    setID() {
        return __awaiter(this, void 0, void 0, function* () {
            let id = 0;
            let all = yield this.getAll();
            id = all.length;
            return id;
        });
    }
    getID(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.TableName,
                Item: {
                    ":teamName": name,
                },
                Expression: "teamName = :teamName",
            };
            try {
                const data = yield dynamo_1.ddbDoc.send(new lib_dynamodb_1.ScanCommand(params));
                if (data.Items) {
                    console.log("It Worked, ", data.Items);
                    for (let i of data.Items) {
                        let id = i.id;
                        if (id) {
                            return id;
                        }
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
            return this.setID();
        });
    }
}
exports.default = TeamDao;
