import React, { useState, useEffect } from "react";
import { format } from "date-fns";

function ActivityList() {
    const [activities, setActivities] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editDuration, setEditDuration] = useState(0);
    const [editComment, setEditComment] = useState("");

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await fetch("http://localhost:3001/activities");
            const data = await response.json();
            setActivities(data);
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };

    const handleEdit = (activity) => {
        setEditingId(activity._id);
        setEditDuration(activity.duration);
        setEditComment(activity.comment);
    };

    const handleSave = async (id) => {
        try {
            await fetch(`http://localhost:3001/activities/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ duration: parseInt(editDuration), comment: editComment }),
            });
            fetchActivities();
            setEditingId(null);
        } catch (error) {
            console.error("Error updating activity:", error);
        }
    };

    const handleDownloadCsv = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Type,Date,Time,Duration (seconds),Comment\r\n";
        activities.forEach((activity) => {
            const row = `${activity.type},${activity.date},${activity.time},${activity.duration},"${activity.comment}"\r\n`;
            csvContent += row;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "activities.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2>Activity Log</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        {activity.type} - {activity.date} {activity.time} - {activity.duration} seconds
                        {editingId === activity._id ? (
                            <div>
                                <input type="number" value={editDuration} onChange={(e) => setEditDuration(e.target.value)} /> seconds
                                <input type="text" value={editComment} onChange={(e) => setEditComment(e.target.value)} />
                                <button onClick={() => handleSave(activity._id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                Comment: {activity.comment}
                                <button onClick={() => handleEdit(activity)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={handleDownloadCsv}>Download as CSV</button>
        </div>
    );
}

export default ActivityList;
