const express = require("express");
const connectToDb = require("./config/connectToDb");
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors");
require("dotenv").config();

// Connection To Db
connectToDb();

// Init App
const app = express();

// Middlewares
app.use(express.json());

// Security Headers
app.use(helmet());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Prevent XSS Attacks
app.use(xss());

// Rate Limiting
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200,
  })
);

//////////////////////////////////////////////////////
// CORS CONFIG (FIXED FOR NETLIFY + RENDER)
//////////////////////////////////////////////////////

const allowedOrigins = (process.env.CLIENT_DOMAIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // السماح للطلبات بدون origin (Postman / backend calls)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // لا نكسر الطلب (مهم جدًا في الإنتاج)
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

//////////////////////////////////////////////////////
// ERROR HANDLERS
//////////////////////////////////////////////////////

app.use(notFound);
app.use(errorHandler);

//////////////////////////////////////////////////////
// SERVER START
//////////////////////////////////////////////////////

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);