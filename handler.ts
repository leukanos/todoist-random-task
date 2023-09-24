import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { TodoistApi } from '@doist/todoist-api-typescript'

const token = process.env.TODOIST_SECRET_TOKEN;
const api = new TodoistApi(token);

interface Task {
  id: string;
  content: string;
  description: string; 
}

const tasks: Task[] = [
  {
    id: "1",
    content: "asdf"
  }
]

export const hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(tasks[0]);

  return {
    statusCode: 200,
    body: JSON.stringify(
{
        message: "Go Serverless v3.0! Your function executed successfully!",
        token: token, 
        input: event,
      },
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
