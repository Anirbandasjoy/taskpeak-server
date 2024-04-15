const app = require("./app");
const { PORT } = require("./helper/secret");
require("./config/db");
app.listen(PORT, () => {
  console.log(`Server is running at http://locahostL:${PORT}`);
});
