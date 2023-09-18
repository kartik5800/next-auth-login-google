const { username, password } = process.env;

export const connectionStr = `mongodb+srv://${username}:${password}@cluster0.mnacx1n.mongodb.net/googleKeepDB?retryWrites=true&w=majority`;
