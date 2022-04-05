import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ILife } from "../../../interfaces/IUser";
import ErrorApp from "../../../errors";
import CreateCardService from "../../../services/CreateCardForLife";

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
}).post(postHandler);

async function postHandler(request: NextApiRequest, response: NextApiResponse) {
  const { life }: { life: ILife } = (await getSession({ req: request })) as any;

  if (!life) {
    throw new ErrorApp({
      status: 401,
      message: "You must be logged in to create a card",
    });
  }

  const cardData = request.body;

  const card = await CreateCardService.execute(life._id, cardData);

  response.status(201).json({
    message: "Card created",
    status: 201,
    data: card,
  });
}
