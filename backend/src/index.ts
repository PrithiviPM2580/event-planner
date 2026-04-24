import "dotenv/config";
import express, { type Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { connectToDatabase } from "@/config/db.config";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "@/lib/auth";

const app: Express = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  credentials: true,
};

// 1. CORS first (needed for cross-origin auth requests)
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// 3. Better Auth handler - MUST be before body parsers
app.all("/api/auth/*splat", toNodeHandler(auth)); // Express v5 syntax

// 4. Body parsers ONLY for non-auth routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

// Example: Get current user session
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
