// src/components/DatabaseTest.js
import { onValue, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import { realtimeDB } from "../firebaseConfig";

const DatabaseTest = () => {
    const [data, setData] = useState(null);

    const writeData = () => {
        const testRef = ref(realtimeDB, "test/");
        const newEntry = push(testRef);
        set(newEntry, { message: "Hello, Realtime Database!" });
    };

    const readData = () => {
        const testRef = ref(realtimeDB, "test/");
        onValue(testRef, (snapshot) => {
            const data = snapshot.val();
            setData(data);
        });
    };

    return (
        <div>
            <h2>Realtime Database Test</h2>
            <button onClick={writeData}>Write to Database</button>
            <button onClick={readData}>Read from Database</button>
            <div>
                <h3>Data from Database:</h3>
                <pre>{data ? JSON.stringify(data, null, 2) : "No data yet"}</pre>
            </div>
        </div>
    );
};

export default DatabaseTest;
