import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

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

    await User.insertMany([
      { name: 'Mona Octavius', email: 'mona@example.com', fitnessGoal: 'Run a 10K', team: 'OctoDash' },
      { name: 'Devon Miles', email: 'devon@example.com', fitnessGoal: 'Build strength', team: 'Core Crew' },
    ]);

    await Team.insertMany([
      { name: 'OctoDash', description: 'Runners focused on steady weekly mileage.', memberCount: 8 },
      { name: 'Core Crew', description: 'Strength training and mobility team.', memberCount: 6 },
    ]);

    await Activity.insertMany([
      { user: 'Mona Octavius', type: 'Running', durationMinutes: 42, caloriesBurned: 410, completedAt: new Date() },
      { user: 'Devon Miles', type: 'Strength', durationMinutes: 35, caloriesBurned: 260, completedAt: new Date() },
    ]);

    await Leaderboard.insertMany([
      { user: 'Mona Octavius', team: 'OctoDash', points: 1280, rank: 1 },
      { user: 'Devon Miles', team: 'Core Crew', points: 1125, rank: 2 },
    ]);

    await Workout.insertMany([
      { name: 'Tempo Builder', focus: 'Cardio', difficulty: 'Intermediate', durationMinutes: 40 },
      { name: 'Foundation Strength', focus: 'Strength', difficulty: 'Beginner', durationMinutes: 30 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
