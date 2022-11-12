import app from "./app";
import "dotenv/config";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize().catch(err => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor executando");
  });
})();
