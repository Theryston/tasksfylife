import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import CreateTaskService from "../../../services/CreateTaskService";

export default nextConnect<NextApiRequest, NextApiResponse>({
  attachParams: true,
  onNoMatch: (request, response) => {
    response.status(404).json({
      error: {
        message: "Router not found",
      },
    });
  },
  onError: (error, request, response) => {
    response.status(error.status).json({
      ...error,
    });
  },
}).post(postHandler);

async function postHandler(request: NextApiRequest, response: NextApiResponse) {
  const { label } = request.body;

  const task = await CreateTaskService.execute({
    label,
  });

  response.status(201).json({
    message: "Task created",
    status: 201,
    data: task,
  });
}
