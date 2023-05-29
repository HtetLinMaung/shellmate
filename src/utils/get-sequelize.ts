import { Sequelize } from "sequelize";

export default function getSequelize(options: any) {
  const {
    DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_CONNECTION_STRING,
    DB_HOST,
    DB_DIALECT,
    DB_DIALECT_OPTIONS,
    DB_PORT,
  } = options;
  if (DB_CONNECTION_STRING) {
    return new Sequelize(DB_CONNECTION_STRING);
  } else if (DATABASE && DB_USERNAME && DB_PASSWORD) {
    let port = 0;
    if (DB_PORT) {
      port = parseInt(DB_PORT);
    } else {
      switch (DB_DIALECT) {
        case "mssql":
          port = 1433;
          break;
        case "postgres":
          port = 5432;
          break;
        case "mysql":
        case "mariadb":
          port = 3306;
          break;
      }
    }

    return new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, {
      host: DB_HOST || "localhost",
      dialect: DB_DIALECT as any,
      dialectOptions: DB_DIALECT_OPTIONS || {},
      port,
    });
  }
}
