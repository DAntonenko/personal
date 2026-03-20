import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { postsRouter } from "./routes/posts";

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// Auth
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin@test.com" || password !== "admin") {
    return res.redirect(303, "/login?error=1");
  }

  const token = jwt.sign(
    {
      sub: "admin@test.com",
      role: "admin",
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res.redirect(303, "/admin");
});


app.get("/api/auth/me", (req, res) => {
  const token = req.cookies.session;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    return res.json({
      authenticated: true,
      user: {
        id: (payload as any).sub,
        role: (payload as any).role,
        email: (payload as any).email,
      },
    });

  } catch {
    return res.status(401).json({ authenticated: false });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("session", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res.redirect(303, "/login");
});
