import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
// import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
// if (process.env.NODE_ENV !== "production") {
//   app.use(
//     cors({
//       origin: "https://mern-thinkboard-eight.vercel.app",
//     })
//   );
// }

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-thinkboard-eight.vercel.app",
  "https://notes-1v2i.onrender.com" // ✅ No trailing slash
];

// ✅ Apply CORS only once and correctly
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



app.use(express.json()); // this middleware will parse JSON bodies: req.body
// app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});




// mongodb+srv://vkugatheesan:8ld54RtdSbpYAGbE@cluster0.3ghphly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0