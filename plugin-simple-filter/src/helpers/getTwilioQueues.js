import axios from 'axios';

async function getTwilioQueues() {
  //get all Queues of Flex Workspace
  const { data: twilioQueues } = await axios.get(
    `https://taskrouter.twilio.com/v1/Workspaces/${process.env.REACT_APP_WORKSPACE_SID}/TaskQueues`,
    {
      auth: {
        username: process.env.REACT_APP_ACCOUNT_SID,
        password: process.env.REACT_APP_AUTH_TOKEN,
      },
    },
  );

  //filtering just queues that has routing.skills property
  const taskQueuesFiltered = twilioQueues.task_queues.filter(taskQueue =>
    taskQueue.target_workers.includes('routing.skills'),
  );

  if (taskQueuesFiltered.length > 0) {
    //formatting the array of taskQueues to filter format default
    const taskQueuesFormatted = taskQueuesFiltered.map(taskQueue => {
      let targetWorkerFormatted = taskQueue.target_workers.replace(
        /[\(")]/g,
        '',
      );
      targetWorkerFormatted = targetWorkerFormatted.replace(
        'routing.skills has ',
        '',
      );

      return {
        value: targetWorkerFormatted,
        label: taskQueue.friendly_name,
        default: false,
      };
    });

    return taskQueuesFormatted;
  }

  return [];
}

export { getTwilioQueues };
