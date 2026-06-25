import "dotenv/config";
import { app } from "./src/app.js";
import { dbConnect } from "./src/config/database.js";


dbConnect()
app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
