import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alexm', email: 'alex.morgan@example.com', profile: { displayName: 'Alex Morgan' } },
      { username: 'jamielee', email: 'jamie.lee@example.com', profile: { displayName: 'Jamie Lee' } },
      { username: 'caseywright', email: 'casey.wright@example.com', profile: { displayName: 'Casey Wright' } },
      { username: 'rileychen', email: 'riley.chen@example.com', profile: { displayName: 'Riley Chen' } },
    ]);

    const teams = await Team.create([
      {
        name: 'Trail Blazers',
        description: 'Consistent progress, one workout at a time.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Pulse Crew',
        description: 'A friendly team focused on building healthy habits.',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { teamId: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { teamId: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { teamId: teams[1]._id } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { teamId: teams[1]._id } } },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 32, points: 320, date: new Date('2026-08-30'), notes: 'Easy neighborhood run' },
      { userId: users[1]._id, type: 'strength', durationMinutes: 45, points: 410, date: new Date('2026-08-29'), notes: 'Full-body strength session' },
      { userId: users[2]._id, type: 'cycling', durationMinutes: 60, points: 540, date: new Date('2026-08-28'), notes: 'Steady outdoor ride' },
      { userId: users[3]._id, type: 'walking', durationMinutes: 40, points: 240, date: new Date('2026-08-27'), notes: 'Lunchtime walk' },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, teamId: teams[0]._id, points: 1280 },
      { userId: users[1]._id, teamId: teams[0]._id, points: 1140 },
      { userId: users[2]._id, teamId: teams[1]._id, points: 1080 },
      { userId: users[3]._id, teamId: teams[1]._id, points: 860 },
    ]);

    await Workout.create([
      { title: 'Foundation Run', description: 'Build aerobic capacity with a relaxed, conversational pace.', difficulty: 'beginner', durationMinutes: 25, activityType: 'running' },
      { title: 'Core and Control', description: 'A balanced bodyweight circuit for core stability and control.', difficulty: 'intermediate', durationMinutes: 30, activityType: 'strength' },
      { title: 'Power Intervals', description: 'Short, challenging intervals to improve speed and cardiovascular power.', difficulty: 'advanced', durationMinutes: 35, activityType: 'cycling' },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
