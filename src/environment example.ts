const healthCheckWebhook = "https://discord.com/your/server/information";
const discordWebhook = "https://discord.com/your/server/information";
const intervalInMilliseconds = 1000 * 60 * 5;
const maxServiceCallsInARow = 10;
const serviceCallsResetInMilliseconds = 1000;

// Remember, this is a government agency you're calling
const userAgent = "first last, retail investor your-email@domain.com";

export default {
    discordWebhook,
    intervalInMilliseconds, 
    userAgent,
    healthCheckWebhook, 
    maxServiceCallsInARow, 
    serviceCallsResetInMilliseconds
};