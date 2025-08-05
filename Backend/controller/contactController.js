import { Message } from "../models/messageModel.js";

// POST API - Add a new message
const addMessage = async (req, res) => {
  const { name, email, phone, subject, inquiryType, message } = req.body;

  if (!name || !email || !phone || !subject || !inquiryType || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newMessage = new Message({
      name,
      email,
      phone,
      subject,
      inquiryType,
      message,
    });
    const savedData = await newMessage.save();

    res.status(201).json({ message: "Message received", data: savedData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to save message", details: error.message });
  }
};

// GET API - Retrieve all messages
const getMessage = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch messages", details: error.message });
  }
};

// GET API - Get message by ID
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch message", details: error.message });
  }
};

// PUT API - Update a message by ID
const updateMessage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  const { name, email, phone, subject, inquiryType, message } = req.body;
  if (!name || !email || !phone || !subject || !inquiryType || !message) {
    return res
      .status(400)
      .json({ message: "All fields are required to update" });
  }

  try {
    const modifiedContact = await Message.findByIdAndUpdate(
      id,
      { name, email, phone, subject, inquiryType, message },
      { new: true }
    );

    if (!modifiedContact) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      message: "Message updated successfully",
      data: modifiedContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE API - Delete a message by ID
const deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  try {
    const removedMessage = await Message.findByIdAndDelete(id);

    if (!removedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      message: "Message deleted successfully",
      data: removedMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addMessage, getMessage, getMessageById, updateMessage, deleteMessage };
