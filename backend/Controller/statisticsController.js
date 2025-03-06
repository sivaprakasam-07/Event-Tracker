const Statistics = require('../Models/statistics');

const getStatistics = async (req, res) => {
    try {
        const statistics = await Statistics.find();
        res.json(statistics);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching statistics' });
    }
};

const updateStatistics = async (req, res) => {
    const { eventId, views, likes } = req.body;
    try {
        const statistics = await Statistics.findOneAndUpdate(
            { eventId },
            { views, likes },
            { new: true, upsert: true }
        );
        res.json(statistics);
    } catch (error) {
        res.status(500).json({ error: 'Error updating statistics' });
    }
};

const deleteStatistics = async (req, res) => {
    const { id } = req.params;
    try {
        await Statistics.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting statistics' });
    }
};

module.exports = { getStatistics, updateStatistics, deleteStatistics };
