import { RequestHandler } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export const requireAuth: RequestHandler = (req, res, next) => {
  return ClerkExpressRequireAuth()(req, res, next);
};
