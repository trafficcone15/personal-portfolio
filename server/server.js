const express = require("express");
const connectDB = require("./config/db");
const particleRoutes = require("./routes/api/particles");
const contactRoutes = require("./routes/api/contact");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

var whitelist = ['http://localhost:5173', 'https://personal-portfolio-client.onrender.com'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/particles", particleRoutes);
app.use("/api/contact", contactRoutes);

connectDB();

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));