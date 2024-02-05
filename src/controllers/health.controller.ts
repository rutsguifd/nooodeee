import { Request, Response } from "express";
import mongoose from "mongoose";

const healthCheck = async (req: Request, res: Response): Promise<void> => {
  try {
    const isConnected = (await mongoose.connection.readyState) === 1;
    if (isConnected) {
      console.log("Database connection is established.");
    } else {
      throw new Error("Database connection is not established.");
    }

    res.status(200).json({
      status: "OK",
      message: "Server is running and database connection is established.",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "An error occurred while checking server health." + error,
    });
  }
};

export default healthCheck;
