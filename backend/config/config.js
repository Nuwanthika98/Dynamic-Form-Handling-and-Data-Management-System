const config = {}

config.web_port = process.env.HTTP_PORT

config.testDatabase = process.env.TESTDATABASE_URL

config.isProduction = JSON.parse(process.env.IS_PRODUCTION)

module.exports = config