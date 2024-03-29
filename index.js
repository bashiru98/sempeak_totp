const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const cors = require('cors')
require('./models/User');
require('./models/Blog');
require('./services/passport');
require('./services/cache');
const connectDB = require("./config/db")

const app = express();
app.use(cors())
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['123123123']
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);
require('./routes/uploadRoutes')(app);

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}
connectDB()
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on Port `, PORT);
});
