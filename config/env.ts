export default () => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        dbname: process.env.DATABASE_NAME,
    },
    jwtsecret: process.env.JWT_SECRET,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4000',
    senderEmail: {
        address: process.env.EMAIL_ADDRESS,
        password: process.env.EMAIL_PASSWORD
    },
    appName: process.env.APP_NAME
});