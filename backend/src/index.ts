import app from "./app";
import { UpdateContests } from "./store";
const PORT = 3000;
const RefreshIntervalMs = 12 * 60 * 60 * 1000; // refresh data every 12 hours

app.listen(PORT, () => {
    console.log(`Server is running.`);
    UpdateContests();

    setTimeout(UpdateContests,RefreshIntervalMs);
})