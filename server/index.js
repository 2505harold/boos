const express = require("express");
const path = require("path");
const cors = require("cors");

/** INITIALIZATIONS */
const app = express();

/** SETTINGS */
app.set("port", process.env.PORT || 3000);

/** MIDDLEWARE */

app.use(express.urlencoded({ extended: false })); //urlenconded es para recibir los datos que vienen desde formulario
app.use(express.json({ limit: "50mb" })); //server handle json request format json
app.use(cors());

/** ROUTES SERVER*/
app.use("/api", require("./routes/lote"));
app.use("/api", require("./routes/sevone"));
/** STATIC FILES */
if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

/** STARTING THE SERVER */
app.listen(app.get("port"), () => {
  console.log("Server is ready");
});
