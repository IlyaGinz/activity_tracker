import React from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import ManualAddForm from "../components/ManualAddForm";

function DashboardPage() {
    return (
        <div>
            <h1>Activity Tracker</h1>
            <ActivityForm />
            <ManualAddForm />
            <ActivityList />
        </div>
    );
}

export default DashboardPage;
