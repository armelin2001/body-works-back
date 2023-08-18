export const Env = {
    database: {
        stringConnection: process.env.STRING_CONNECTION,
        dbName: process.env.DB_NAME,
    },
    server: {
        port: process.env.PORT,
        hashSecret: process.env.HASH_SECRET,
    },
};
