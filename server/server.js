const path = require('path');
const express = require('express');

// path starts in server folder
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

// Serve static file
app.use(express.static(publicPath));

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});