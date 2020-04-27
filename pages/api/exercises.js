import dbConnect from "../../utils/dbConnect";
import Exercise from "../../models/exercise";

dbConnect();

export default async function exercises(req, res) {
  const exercises = await Exercise.find({});

  res.json({ success: true, data: { exercises } });
}
