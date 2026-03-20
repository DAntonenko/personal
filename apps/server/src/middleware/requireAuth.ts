import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.session;

  if (!token) {
    return res.status(401).json({ error: "Unauthenticated" });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload & {
      email: string;
      role: string;
    };

    req.user = {
      id: payload.sub!,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch {
    return res.status(401).json({ error: "Unauthenticated" });
  }
}

export {};
