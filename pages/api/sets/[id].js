import dbConnect from "../../../utils/dbConnect";
import Set from "../../../models/set";

dbConnect();

export default async (req, res) => {
  console.log("[id]");
  const {
    method,
    query: { id },
  } = req;
  //TODO: limit to only sets for logged in user
  let set;
  console.log({ id });
  console.log({ method });
  switch (method) {
    case "GET":
      try {
        set = await Set.findById(id);
        console.log(set);
        if (!set) {
          return res.status(404).json({ success: false, data: {} });
        }
        res.status(200).json({ success: true, data: { set } });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "DELETE":
      try {
        console.log(`attempting to delete ${id}`);
        const deletedNote = await Set.deleteOne({ _id: id });
        console.log({ deletedNote });
        if (!deletedNote) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error });
        console.log(error);
      }

      break;
    default:
      res.status(400).json({ success: false });
  }
};
