import * as dotenv from "dotenv";

dotenv.config();

import app from "./app";

const PORT: any = process.env.PORT || 3000;

async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error(error);
  }
}

main();
