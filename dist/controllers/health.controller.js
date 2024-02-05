"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const healthCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isConnected = (yield mongoose_1.default.connection.readyState) === 1;
        if (isConnected) {
            console.log("Database connection is established.");
        }
        else {
            throw new Error("Database connection is not established.");
        }
        setTimeout(() => {
            res.status(200).json({
                status: "OK",
                message: "Server is running and database connection is established.",
            });
        }, 10000);
    }
    catch (error) {
        res.status(500).json({
            status: "Error",
            message: "An error occurred while checking server health." + error,
        });
    }
});
exports.default = healthCheck;
