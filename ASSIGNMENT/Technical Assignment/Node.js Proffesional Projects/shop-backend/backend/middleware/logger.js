const logger = (req, res, next) => {
    const timestamp = new Date();
    // Format timestamp as [YYYY-MM-DD HH:mm]
    const formattedTimestamp = `[${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')} ${String(timestamp.getHours()).padStart(2, '0')}:${String(timestamp.getMinutes()).padStart(2, '0')}]`;
    console.log(`${formattedTimestamp} ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = logger;
