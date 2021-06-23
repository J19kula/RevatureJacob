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
exports.getAllTeams = exports.deleteTeam = exports.updateTeam = exports.getTeam = exports.addOneTeam = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const teamdaos_1 = __importDefault(require("@daos/Team/teamdaos"));
const constants_1 = require("@shared/constants");
const TD = new teamdaos_1.default();
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
/**
 *
 * @param req
 * @param res
 *  return status
 */
function addOneTeam(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { team } = req.body;
        if (!team) {
            return res.status(BAD_REQUEST).json({
                error: constants_1.paramMissingError
            });
        }
        team.id = yield TD.setID();
        yield TD.add(team);
        return res.status(CREATED).end();
    });
}
exports.addOneTeam = addOneTeam;
/**
 *
 * @param req
 * @param res
 * @returns ITeam
 */
function getTeam(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { teamName } = req.body.team;
        if (!teamName) {
            return res.status(BAD_REQUEST).json({
                error: constants_1.paramMissingError,
            });
        }
        let team = yield TD.getOne(teamName);
        return res.status(OK).json(team).end();
    });
}
exports.getTeam = getTeam;
/**
 *
 * @param req
 * @param res
 * @returns status
 */
function updateTeam(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { team } = req.body;
        if (!team) {
            return res.status(BAD_REQUEST).json({
                error: constants_1.paramMissingError
            });
        }
        yield TD.update(team);
        return res.status(http_status_codes_1.default.ACCEPTED).end();
    });
}
exports.updateTeam = updateTeam;
/**
 *
 * @param req
 * @param res
 * @returns
 */
function deleteTeam(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { teamName } = req.body.team;
        if (!teamName) {
            return res.status(BAD_REQUEST).json({
                error: constants_1.paramMissingError
            });
        }
        yield TD.delete(teamName);
        res.status(http_status_codes_1.default.ACCEPTED).end();
    });
}
exports.deleteTeam = deleteTeam;
function getAllTeams(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const teams = yield TD.getAll();
        return res.status(OK).json({ team: teams });
    });
}
exports.getAllTeams = getAllTeams;
