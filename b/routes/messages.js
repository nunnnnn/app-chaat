const {
  addMessage,
  getMessages,
  markAsRead,
  getLatestMessages,
} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/markread/", markAsRead);
router.get("/getlatestmsg/", getLatestMessages);

module.exports = router;