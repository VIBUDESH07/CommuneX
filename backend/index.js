const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes'); // Adjust the path accordingly
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);

mongoose.connect('mongodb://localhost:27017/community', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
