import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN || 'http://localhost:5173');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: 'available' });
});

app.get('/api/users', async (_request, response) => {
  response.json(await User.find().sort({ createdAt: -1 }).lean());
});

app.post('/api/users', async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json(user);
});

app.get('/api/teams', async (_request, response) => {
  response.json(await Team.find().sort({ name: 1 }).lean());
});

app.post('/api/teams', async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json(team);
});

app.get('/api/activities', async (request, response) => {
  const filter = request.query.userId ? { userId: request.query.userId } : {};
  response.json(await Activity.find(filter).sort({ date: -1 }).lean());
});

app.post('/api/activities', async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(activity);
});

app.get('/api/workouts', async (_request, response) => {
  response.json(await Workout.find().sort({ difficulty: 1, title: 1 }).lean());
});

app.get('/api/leaderboard', async (request, response) => {
  const period = typeof request.query.period === 'string' ? request.query.period : 'all-time';
  response.json(await Leaderboard.find({ period }).populate('userId', 'username profile').populate('teamId', 'name').sort({ points: -1 }).lean());
});

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(400).json({ error: error.message });
});

await connectDatabase();

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});

export default app;