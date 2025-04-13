const express = require("express");
const router = express.Router();
const Activity = require("../models/activity");

router.get("/", async (req, res) => {
    try {
        const activities = await Activity.find().sort({ startTime: -1 });
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    const activity = new Activity({
        type: req.body.type,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        duration: req.body.duration,
        date: req.body.date,
        time: req.body.time,
        comment: req.body.comment,
    });

    try {
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: "Cannot find activity" });
        }
        if (req.body.duration != null) {
            activity.duration = req.body.duration;
            const start = new Date(activity.startTime);
            activity.endTime = new Date(start.getTime() + req.body.duration * 1000);
        }
        if (req.body.comment != null) {
            activity.comment = req.body.comment;
        }
        const updatedActivity = await activity.save();
        res.json(updatedActivity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
