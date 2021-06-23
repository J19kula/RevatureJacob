"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("./team");
// User-route
const userRouter = express_1.Router();
userRouter.get('/:Team', team_1.getAllTeams);
userRouter.post('/add', team_1.addOneTeam);
userRouter.get('/getTeam', team_1.getTeam);
userRouter.put('/:Teams/:id', team_1.updateTeam);
userRouter.delete('/delete/:Teams/:id', team_1.deleteTeam);
// Export the base-router
const baseRouter = express_1.Router();
baseRouter.use('/Team', userRouter);
exports.default = baseRouter;
