import * as usersDao from "./users-dao.js";

const AuthController = (app) => {

  // ORIGINAL REGISTER
  // const register = async (req, res) => {
  //   const username = req.body.username;
  //   console.log("registration begins")
  //   console.log(new Date())
  //   console.log("username: ", username);
  //   const user = usersDao.findUserByUsername(username);
  //   if (user) {
  //     res.sendStatus(409);
  //     return;
  //   }
  //   const newUser = usersDao.createUser(req.body);
  //   console.log("all the users after registratoin: ", usersDao.findAllUsers());
  //   req.session["currentUser"] = newUser;
  //   console.log("registration current user", req.session["currentUser"]);
  //   res.json(newUser);
  // };

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

  // ORIGINAL LOGIN
  // const login = async (req, res) => {
  //   const username = req.body.username;
  //   const password = req.body.password;
  //   const user = await usersDao.findUserByCredentials(username, password);
  //   if (user) {
  //     console.log("login worked")
  //     req.session["currentUser"] = user;
  //     res.json(user);
  //   } else {
  //     console.log("login error");
  //     res.sendStatus(404);
  //   }
  // };

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
    console.log("all the users in profile method", usersDao.findAllUsers());
    console.log(new Date());
    console.log("req session id in profile: ", req.session._id);
    const currentUser = req.session["currentUser"];
    console.log("profile current user", currentUser);
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
  const update = (req, res) => {

    const userId = req.session["currentUser"];
    console.log("user id update", userId[0])
    const updatedUser = usersDao.updateUser(userId, req.body);
    if (!updatedUser) {
      console.log("couldn't update user")
      res.sendStatus(404);
      return;
    }
    console.log("updated user info hopefully: ", updatedUser);
    req.session["currentUser"] = updatedUser;
    console.log("req session update: ", updatedUser);
    res.json(updatedUser);
  };


  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users", update);
};
export default AuthController;
