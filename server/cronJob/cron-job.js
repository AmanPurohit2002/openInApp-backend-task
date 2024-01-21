const cron = require('node-cron');
const Task = require('../models/Task');
const User = require('../models/User');
const twilio = require('twilio');

const client=new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)

// Function to get tasks based on priority and due date
const getTasksByPriorityAndDueDate = async (priority) => {
  try {
    console.log(`Fetching tasks for priority ${priority}`);

    const now = new Date();

    switch (priority) {
      case 0:
        console.log(`Priority 0 - Due date is today (0)`);
        return Task.find({ priority: 0, due_date: { $lte: now } });
      case 1:
        const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
        console.log(`Priority 1 - Due date is between tomorrow and day after tomorrow (1-2)`);
        return Task.find({ priority: 1, due_date: { $gte: now, $lte: twoDaysFromNow } });
      case 2:
        const fourDaysFromNow = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
        console.log(`Priority 2 - Due date is between 3-4 days (3-4)`);
        return Task.find({ priority: 2, due_date: { $gte: now, $lte: fourDaysFromNow } });
      case 3:
        const fiveDaysFromNow = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
        console.log(`Priority 3 - Due date is 5+ days (5+)`);
        return Task.find({ priority: 3, due_date: { $gte: fiveDaysFromNow } });
      default:
        console.log(`Invalid priority: ${priority}`);
        return [];
    }
  } catch (error) {
    console.error('Error fetching tasks by priority and due date:', error);
    return [];
  }
};


// Cron job for changing priority of tasks based on due date
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Cron job for changing priority is running.');

    // Assuming priority field exists in your Task model
    const tasks = await Task.find();

    tasks.forEach(async (task) => {
      console.log(`Processing task with ID: ${task._id}, Due Date: ${task.due_date}`);

      const daysRemaining = Math.ceil((task.due_date - new Date()) / (1000 * 60 * 60 * 24));
      console.log(`Days remaining for task ${task._id}: ${daysRemaining}`);

      if (daysRemaining >= 5) {
        console.log(`Updating priority to 3 for task ${task._id}`);
        task.priority = 3;
      } else if (daysRemaining >= 3) {
        console.log(`Updating priority to 2 for task ${task._id}`);
        task.priority = 2;
      } else if (daysRemaining >= 1) {
        console.log(`Updating priority to 1 for task ${task._id}`);
        task.priority = 1;
      } else {
        console.log(`Updating priority to 0 for task ${task._id}`);
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


// Cron job for voice calling using Twilio
cron.schedule('0 8 * * *', async () => {
  try {
    console.log('Cron job for voice calling is running.');

    const users = await User.find().sort({ priority: 1 });

    for (const user of users) {
      // Check if the user has a phone number
      if (!user.phone_number) {
        console.log(`Skipping user with priority ${user.priority} as they do not have a phone number.`);
        continue;
      }

      const tasks = await getTasksByPriorityAndDueDate(user.priority);

      if (tasks.length >= 0) {
        const task = tasks[0];

        // Make a Twilio voice call
        await client.calls.create({
          url: 'http://demo.twilio.com/docs/voice.xml', // Replace with your TwiML URL
          to: user.phone_number.toString(), // Convert phone number to string
          from: process.env.TWILIO_PHONE_NUMBER,
        });

        console.log(`Voice call made to ${user.phone_number} for task ID ${task._id}`);

        // Break the loop to call the next user only if the call is successful
        break;
      } else {
        console.log(`No tasks found for user with priority ${user.priority}.`);
      }
    }

    console.log('Voice calls made successfully.');
  } catch (error) {
    console.error('Error making voice calls:', error.message);
  }
});



