import { Router } from 'express';
import { addOneTeam, getTeam, updateTeam, deleteTeam, getAllTeams } from './team';


// User-route
const userRouter = Router();
userRouter.get('/:Team', getAllTeams)
userRouter.post('/add', addOneTeam);
userRouter.get('/getTeam', getTeam);
userRouter.put('/:Teams/:id', updateTeam);
userRouter.delete('/delete/:Teams/:id', deleteTeam);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/Team', userRouter);
export default baseRouter;
