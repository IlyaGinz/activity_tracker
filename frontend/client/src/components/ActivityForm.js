import React, { useState } from "react";
import { format } from "date-fns";

function ActivityForm() {
    const [activityType, setActivityType] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const handleStart = () => {
        setStartTime(new Date());
        setIsRunning(true);
    };

    const handleStop = async () => {
        if (!startTime) return;
        const endTime = new Date();
        const duration = Math.floor((endTime - startTime) / 1000);
        const date = format(startTime, "yyyy/MM/dd");
        const time = format(startTime, "HH:mm:ss");

        const newActivity = {
            type: activityType,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            duration,
            date,
            time,
            comment: "",
        };

        try {
            await fetch("http://localhost:3001/activities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newActivity),
            });
            // Refresh activity list
            window.location.reload();
        } catch (error) {
            console.error("Error saving activity:", error);
        }

        setStartTime(null);
        setIsRunning(false);
        setActivityType("");
    };

    return (
        <div>
            <h2>Track New Activity</h2>
            <input type="text" placeholder="Activity Type" value={activityType} onChange={(e) => setActivityType(e.target.value)} />
            {!isRunning ? (
                <button onClick={handleStart} disabled={!activityType}>
                    Start
                </button>
            ) : (
                <button onClick={handleStop}>Stop</button>
            )}
        </div>
    );
}

export default ActivityForm;
