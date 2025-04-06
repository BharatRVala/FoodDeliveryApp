const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

export const connectionStr = `mongodb+srv://${username}:${password}@cluster0.jnfelnh.mongodb.net/resto?retryWrites=true&w=majority&appName=Cluster0`;
