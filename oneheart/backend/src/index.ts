import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "oneheart-backend",
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "OneHeart OS Backend",
    version: "0.0.1",
    philosophy: "ONE FOR ALL"
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`✨ OneHeart Backend running on port ${PORT}`);
  console.log(`   Philosophy: ONE FOR ALL`);
  console.log(`   Verify your system: http://localhost:${PORT}/health`);
});

// Import route handlers
import proofsRouter from "./routes/proofs";
import impactRouter from "./routes/impact";
import enterpriseRouter from "./routes/enterprise";

// Mount routes
app.use("/api/proof", proofsRouter);
app.use("/api", impactRouter);
app.use("/api/enterprise", enterpriseRouter);

export default app;
import worldwalkerRouter from "./routes/worldwalker";

// Mount routes
app.use("/api/proof", proofsRouter);
app.use("/api", impactRouter);
app.use("/api", worldwalkerRouter);

export default app;
