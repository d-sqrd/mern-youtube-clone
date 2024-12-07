const User = require("../models/User");

const deleteFromWatchHistory = async (req, res) => {
  try {
    console.log(
      `delete-from-watch-history route...req.body = ${JSON.stringify(req.body)}`
    );
    const user = await User.findByIdAndDelete(req.body.objectId);
    if (!user) {
      // throw new Error("Error deleting video from watch history");
      throw new Error();
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(`delete-from-watch-history route...error = ${error}`);
  }
};

module.exports = deleteFromWatchHistory;
