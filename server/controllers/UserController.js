import User from "../models/User";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      });
    }
  } catch (err) {
    res.status(404).json({ message: "Invalid email or password" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(404).json({ message: "User already exists" });
    } else {
      const user = new User({
        username,
        email,
        password,
      });

      const savedUser = await user.save();

      res.json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
      res.json(user);
    }
  } catch (err) {
    res.status(404).json({ message: "User not found" });
  }
};

const addToFriend = async (req, res) => {
  try {
    if (req.params.id === req.user._id) {
      res.status(404).json({ message: "You cannot follow yourself" });
    } else {
      let friend = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.user._id } }
      );
    }
    return res.status(200).send({ message: "User followed successfully" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error while tried to follow a user" });
  }
};
const romoveFriend = async (req, res) => {
  try {
    let unfollowingUser = await User.findByIdAndUpdate(req.params.id, {
      $pull: { friends: req.user._id },
    });
    return res.status(200).send({ message: "User unfollowed successfully" });
  } catch (err) {
    return res.status(500).send({ message: "User UnFollow Failed" });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const friends = await User.find({ _id: { $in: currentUser.friends } });

    if (friends) {
      res.json({ data: friends, message: "Friends found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error while trying to get friends" });
  }
};

export {
  loginUser,
  registerUser,
  getUserById,
  addToFriend,
  romoveFriend,
  getUserFriends,
};
