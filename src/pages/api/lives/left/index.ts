import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

export default nextConnect<NextApiRequest, NextApiResponse>({
  attachParams: true,
  onNoMatch: (request, response) => {
    response.status(404).json({
      error: {
        message: "Route not found",
      },
    });
  },
  onError: (error, request, response) => {
    response.status(error.status).json({
      ...error,
    });
  },
})
  .post(postHandler)
  .delete(deleteHandler);

async function postHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {}

async function deleteHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {}
