const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();
app.use(express.json());
app.set('view engine','pug');
app.use('/api/courses', courses);
app.use('/', home);
const port = process.env.PORT || 3800; // if we are in production environment so use the port in the server other wise use port 3800
app.listen(port, () => console.log(`Liisten to port number ${port}`));

