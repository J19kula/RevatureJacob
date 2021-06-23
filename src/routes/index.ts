import { Router } from 'express';
import { addOneTeam, getTeam, updateTeam, deleteTeam, getAllTeams, getPlayer } from './team';


// User-route
const userRouter = Router();
userRouter.get('/getTeam/:teamName', getTeam)
userRouter.get('/getPlayer/:teamName', getPlayer)
userRouter.post('/add', addOneTeam);
userRouter.get('/getTeam', getAllTeams);
userRouter.put('/:teamName/:id', updateTeam);
userRouter.delete('/delete/:teamName/:id', deleteTeam);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/Team', userRouter);
export default baseRouter;
