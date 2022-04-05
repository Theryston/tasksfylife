import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import CreateTagService from "../../../services/CreateTagService";
import GetTagsServices from "../../../services/GetTagsServices";

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
  .get(getHandler);

async function postHandler(request: NextApiRequest, response: NextApiResponse) {
  const { label } = request.body;

  const tag = await CreateTagService.execute({
    label,
  });

  response.status(201).json({
    message: "Tag created",
    status: 201,
    data: tag,
  });
}

export async function getHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const tags = await GetTagsServices.execute();

  response.status(200).json({
    message: "All tags got",
    status: 200,
    data: tags,
  });
}
