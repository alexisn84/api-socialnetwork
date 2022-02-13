const express = require('express');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/api-socialnetwork', {
    useFindandModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));