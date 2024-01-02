import sendMessage from "./feature/webhook/discordIntegration";
import environment from "./environment";

const app = () => {
    sendMessage(environment.discordWebhook, ["everyone"], "Test", ["https://nootnoot.net"]);
};

app();
export default app;