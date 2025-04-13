import React, { useState } from "react";
import { format } from "date-fns";

function ManualAddForm() {
    const [type, setType] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [duration, setDuration] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const startTime = new Date(startDateTime);
        const endTime = new Date(startTime.getTime() + parseInt(duration) * 1000);
        const date = format(startTime, "yyyy/MM/dd");
        const time = format(startTime, "HH:mm:ss");

        const newActivity = {
            type,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            duration: parseInt(duration),
            date,
            time,
            comment,
        };

        try {
            await fetch("http://localhost:3001/activities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newActivity),
            });
            window.location.reload();
        } catch (error) {
            console.error("Error adding activity:", error);
        }

        setType("");
        setStartDateTime("");
        setDuration("");
        setComment("");
    };

    return (
        <div>
            <h2>Add Activity Manually</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Activity Type" value={type} onChange={(e) => setType(e.target.value)} required />
                <input type="datetime-local" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} required />
                <input type="number" placeholder="Duration (seconds)" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                <input type="text" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button type="submit">Add Activity</button>
            </form>
        </div>
    );
}

export default ManualAddForm;
