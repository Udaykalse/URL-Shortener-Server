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
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Ensure CONNECTION_STRING is defined
const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) {
    throw new Error("MongoDB connection string is not defined in environment variables");
}
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB using the connection string
        const connection = yield mongoose_1.default.connect(connectionString);
        // Connection success message
        console.log(`MongoDB connected successfully: ${connection.connection.host}, DB Name: ${connection.connection.name}`);
        console.log("Database connection successful");
    }
    catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
});
exports.default = connectDb;
