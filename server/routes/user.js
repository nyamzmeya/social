import express from "express";
import { addToFriend, getUserById, getUserFriends, loginUser, romoveFriend } from "../controllers/UserController";

const router = express.Router();

router.post("/login", loginUser);
router.route("/:id").get(getUserById);
router.route("/:id/add").get(addToFriend);
router.route("/:id/remove").get(romoveFriend);
router.route("/:id/friens").get(getUserFriends);


export default router;
