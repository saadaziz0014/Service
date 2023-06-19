import cron from "node-cron";
import { checkIP } from "../controller/attendance.controller";

cron.schedule("*/1 * * * *", async () => {
  try {
    const req = {};
    const res = {
      status: function (code) {
        return {
          send: function (message) {
            console.log(`Status: ${code}, Message: ${message}`);
          },
        };
      },
    };
    await checkIP(req, res);
  } catch (error) {
    console.log(error);
  }
});
