import auth0 from "../../lib/auth0";

// TODO: extract this
// var mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://workoutAdmin:wMt5CGdXAel8vqDe@workouts-pzsk1.mongodb.net/test?retryWrites=true&w=majority",
//   { useNewUrlParser: true }
// );
// Can also use the auth0 requireAuthentication handler
// https://github.com/auth0/nextjs-auth0
export default async function userData(req, res) {
  try {
    // console.log(req.cookies);
    // await auth0.handleProfile(req, res);
    const { user } = await auth0.getSession(req);
    console.log(user);
    if (!user) {
      res.send({});
      return;
    }
    const auth_user_id = user.sub;
    console.log(auth_user_id);
    const sets = [
      { exercise: "push-ups", reps: 3 },
      { exercise: "pull-ups", reps: 5 },
    ];
    res.send({ sets });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
