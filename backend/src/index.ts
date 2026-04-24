import "dotenv/config";
import express, { type Express } from "express";
import { connectToDatabase } from "config/db.config";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  }),
);
app.use(morgan("dev"));
app.use(helmet());

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
