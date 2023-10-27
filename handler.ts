import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { TodoistApi } from '@doist/todoist-api-typescript'

const token = process.env.TODOIST_SECRET_TOKEN as string;
const api = new TodoistApi(token);

interface Task {
  id: string;
  content: string;
  description: string;
}

export const hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  const tasks = await getTasks();

  return {
    statusCode: 200,
    body: JSON.stringify(
      getRandom(tasks),
      null,
      2
    ),
  };
};

const getRandom = (tasks: Array<Task>): Task => {
  return tasks[
    Math.floor(Math.random() * tasks.length)
  ]
}

const getTasks = async (): Promise<Task[]> => {
  const tasks = await api.getTasks({"label": "random"});
  return tasks;
}

