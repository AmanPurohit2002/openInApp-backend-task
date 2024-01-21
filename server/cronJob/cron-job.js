const cron = require('node-cron');
const Task = require('../models/Task');


// Function to get tasks based on priority and due date
const getTasksByPriorityAndDueDate = async (priority) => {
  const now = new Date();

  switch (priority) {
    case 0:
      return Task.find({ due_date: { $lte: now } });
    case 1:
      const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
      return Task.find({ due_date: { $gte: now, $lte: twoDaysFromNow } });
    case 2:
      const fourDaysFromNow = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
      return Task.find({ due_date: { $gte: now, $lte: fourDaysFromNow } });
    case 3:
      const fiveDaysFromNow = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
      return Task.find({ due_date: { $gte: fiveDaysFromNow } });
    default:
      return [];
  }
};


// Cron job for changing priority of tasks based on due date
cron.schedule('0 0 * * *', async () => {
  try {
    // console.log('Cron job for changing priority is running.');

    // Assuming priority field exists in your Task model
    const tasks = await Task.find();

    tasks.forEach(async (task) => {
      // console.log(`Processing task with ID: ${task._id}, Due Date: ${task.due_date}`);

      const daysRemaining = Math.ceil((task.due_date - new Date()) / (1000 * 60 * 60 * 24));
      // console.log(`Days remaining for task ${task._id}: ${daysRemaining}`);

      if (daysRemaining >= 5) {
        // console.log(`Updating priority to 3 for task ${task._id}`);
        task.priority = 3;
      } else if (daysRemaining >= 3) {
        // console.log(`Updating priority to 2 for task ${task._id}`);
        task.priority = 2;
      } else if (daysRemaining >= 1) {
        // console.log(`Updating priority to 1 for task ${task._id}`);
        task.priority = 1;
      } else {
        // console.log(`Updating priority to 0 for task ${task._id}`);
        task.priority = 0;
      }

      await task.save();
      // console.log(`Priority updated successfully for task ${task._id}`);
    });

    console.log('Task priorities updated successfully.');
  } catch (error) {
    console.error('Error updating task priorities:', error);
  }
});

/*
// testing purpose
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});

*/


