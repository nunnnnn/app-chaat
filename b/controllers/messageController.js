const Messages = require("../models/messageModel");
// ดึงข้อความ
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ createdAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        id: msg._id.toString(),
        fromSelf: msg.sender.toString() === from,
        isRead: msg.isRead,
        message: msg.message.text,
        date: msg.createdAt,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getMessagesUser = async (req, res, next) => {
  try {
    const sender = req.params.sid;

    const messages = await Messages.find({
      sender: sender,
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (ex) {
    next(ex);
  }
};


module.exports.getLatestMessages = async (req, res, next) => {
  try {
    const messages = await Messages.aggregate([
      { $sort: { createdAt: -1 } },
      { $group: {
        _id: "$studentID",
        latestCreatedAt: { $first: "$createdAt" },
        message: { $first: "$message" },
        users: { $first: "$users" },
        isRead: { $first: "$isRead" },
        updatedAt: { $first: "$updatedAt" }
      }}
    ]);
    res.json(messages);
  } catch (ex) {
    next(ex);
  }
};
// ส่งข้อความ
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, studentID } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      isRead: false,
      sender: from,
      studentID: studentID
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
// เครื่องหมายว่าอ่านแล้ว
module.exports.markAsRead = async (req, res, next) => {
  try {
    const { messageId } = req.body;
    await Messages.updateOne(
      { _id: messageId, fromSelf: false },
      { $set: { isRead: true } }
    );
    res.json("Message marked as read");
  } catch (ex) {
    next(ex);
  }
};