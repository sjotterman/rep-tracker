import dbConnect from "../../../utils/dbConnect";
import Set from "../../../models/set";

dbConnect();

export default async function sets(req, res) {
  const { method } = req;
  let sets;
  let set;
  //TODO: limit to only sets for logged in user
  switch (method) {
    case "GET":
      sets = await Set.find({});
      res.status(200).json({ success: true, data: { sets } });
      break;
    case "POST":
      try {
        set = await Set.create(req.body);
        res.status(201).json({ success: true, data: { set } });
      } catch (error) {
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
}
