import dbConnect from "../../../utils/dbConnect";
import auth0 from "../../../lib/auth0";
import Set from "../../../models/set";
import { NextApiRequest, NextApiResponse } from "next";

dbConnect();

export default auth0.requireAuthentication(async function sets(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  let sets;
  let set;
  const session = await auth0.getSession(req);
  switch (method) {
    case "GET":
      sets = await Set.find({});
      res.status(200).json({ success: true, data: { sets } });
      break;
    case "POST":
      try {
        const userId = session.user.sub;
        const { exerciseId, reps, exercise } = req.body;
        const newSet = {
          userId,
          reps,
          exercise: {
            _id: exerciseId,
            name: exercise,
          },
        };
        let set = await Set.create(newSet);
        res.status(201).json({ success: true, data: { set } });
      } catch (error) {
        console.log({ error });
        res.status(400).json({ success: false, error });
      }
      break;
    case "DELETE":
      try {
        await Set.findOneAndDelete({ _id: req.body._id });
        res.status(201).json({ success: true, data: { set } });
      } catch (error) {
        res.status(400).json({ success: false, error });
        console.log(error);
      }

      break;
    default:
      res.status(400).json({ success: false });
  }
});
