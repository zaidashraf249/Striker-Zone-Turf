import { Router } from "express";
import { addMessage, deleteMessage, getMessage, getMessageById, updateMessage } from "../controller/contactController.js";


const messageRouter = Router();

//Get API
messageRouter.get("/getmessage", getMessage);

//Get API by id
messageRouter.get("/getmessage/:id", getMessageById);

//post API
messageRouter.post("/addmessage", addMessage);

//PUT API
messageRouter.put("/updatemessage/:id", updateMessage);

//DELETE API
messageRouter.delete("/removemessage/:id", deleteMessage);


export default messageRouter;