import * as usersDao from "./users-dao.js";

const AuthController = (app) => {

  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };

  const profile = async (req, res) => {
    // working on local server (ig not anymore??)

    // console.log("all the users in profile method", usersDao.findAllUsers());
    // console.log(new Date());
    // console.log("req session id in profile: ", req.session._id);
    // const currentUser = req.session["currentUser"];
    // console.log("profile current user", currentUser);
    // if (!currentUser) {
    //   res.sendStatus(404);
    //   return;
    // }
    // res.json(currentUser);

    // loads up profile correctly but doens't create new users or updates them
    const session = req.session["currentUser"];
    const userId = session._id;
    const currentUser = await usersDao.findUserById(userId);
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };
  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const update = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    console.log("user id hopefully: ", usersDao.findUserById(userId));
    const updatedUser = await usersDao.updateUser(userId, req.body);
    if (!updatedUser) {
      console.log("couldn't update user")
      res.sendStatus(404);
      return;
    }
    // console.log("updated user info hopefully: ", updatedUser);
    req.session["currentUser"] = updatedUser;
    console.log("req session update: ", updatedUser);
    console.log(userId);
    res.json(updatedUser);
  };


  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users", update);
};
export default AuthController;
