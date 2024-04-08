const Notification = require("../models/notification");

const getAllNotifications = async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
};

/**
 * Retrieves a notification by its ID and sends it as a JSON response.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {Promise<void>} A JSON response containing the retrieved notification
 */
const getNotificationById = async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  res.json(notification);
};

/**
 * Add a notification to the database based on the request body.
 *
 * @param {Object} req - The request object containing userId and content.
 * @param {Object} res - The response object to send back "Notification added!" message.
 * @return {Promise} A promise that resolves when the notification is saved.
 */
const addNotification = async (req, res) => {
  const notification = new Notification({
    userId: req.body.userId,
    content: req.body.content,
  });

  await notification.save();
  res.json("Notification added!");
};

/**
 * Updates a notification based on the request data.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {String} A message indicating the notification update status
 */
const updateNotification = async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  notification.userId = req.body.userId;
  notification.content = req.body.content;
  await notification.save();
  res.json("Notification updated!");
};

/**
 * Deletes a notification by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with a message indicating the notification was deleted.
 */
const deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json("Notification deleted!");
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  updateNotification,
  addNotification,
  deleteNotification,
};
