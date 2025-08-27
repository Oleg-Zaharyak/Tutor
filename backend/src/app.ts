// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { clerkMiddleware, requireAuth, getAuth } from "@clerk/express";
dotenv.config();
const app = express();
// CORS спочатку
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// якщо є проксі/cdn — важливо для secure-cookie/схеми
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
// ГОЛОВНЕ: нове Clerk middleware (ставимо перед роутами)
app.use(clerkMiddleware());
// простий діагностичний роут: перевіряє, чи бачимо сесію з cookie
app.get("/api/whoami", (req, res) => {
  const { userId, sessionId } = getAuth(req);
  if (!userId) return res.status(401).json({ ok: false, reason: "no-session" });
  res.json({ ok: true, userId, sessionId });
});
// health (без auth)
app.get("/api/health", (_req, res) => {
  res.json({ message: "Backend is working!" });
});
// ваші бізнес-рути
app.use("/api", routes);
// глобальний обробник помилок (щоб бачити першопричину замість 500)
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err?.statusCode || 500;
  console.error(":fire: Error:", err);
  res.status(status).json({
    error: "ServerError",
    status,
    message: err?.message,
    reason: err?.reason || err?.code || err?.name,
  });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
