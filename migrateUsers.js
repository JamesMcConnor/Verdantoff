const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(require("./serviceAccountKey.json")),
    databaseURL: "https://vuetest-b2bcc-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();
const auth = admin.auth();

async function migrateUsers() {
    try {
        // Fetch all users from Firebase Authentication
        const users = [];
        let nextPageToken;

        do {
            const listUsersResult = await auth.listUsers(1000, nextPageToken);
            users.push(...listUsersResult.users);
            nextPageToken = listUsersResult.pageToken;
        } while (nextPageToken);

        console.log(`Fetched ${users.length} users from Firebase Authentication.`);

        // Prepare and upload data to Realtime Database
        const updates = {};
        users.forEach(user => {
            const userId = user.uid;
            const email = user.email || "no-email@example.com";
            const name = user.displayName || "Anonymous User";

            // Add placeholder contacts for each user
            updates[`contacts/${userId}`] = {
                placeholder1: { name: "Sample Contact 1", email: "sample1@example.com" },
                placeholder2: { name: "Sample Contact 2", email: "sample2@example.com" },
                userInfo: { name, email }
            };
        });

        await db.ref().update(updates);
        console.log("User migration completed successfully.");
    } catch (error) {
        console.error("Error during migration:", error);
    }
}

migrateUsers();
