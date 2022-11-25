import md5 from "md5";
import ConnectMongoDB from "../../../database/conn";
import Users from "../../../model/Schema";

export default async function handler(req, res) {
  ConnectMongoDB().catch((error) =>
    res.json({ error: `Connection failed with ${error}` })
  );

  //checking if user is using post method
  if (req.method == "POST") {
    // check is form has data
    if (!req.body) {
      return res.status(404).json({ error: "Dont have form data..." });
    }
    const { username, email, password } = req.body;

    //check duplicate users
    const checkDuplicateUsers = await Users.findOne({ email });

    if (checkDuplicateUsers) {
      return res.status(422).json({ error: "User already exists" });
    }

    //then create a new user
    Users.create(
      { username, email, password: md5(password) },
      function (err, data) {
        if (err)
          return res
            .status(404)
            .json({ err: `There was an error ${err.message}` });
        res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    res.status(500).json({ error: "Not the right http method" });
  }
}
