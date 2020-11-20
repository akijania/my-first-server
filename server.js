const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const formidable = require('formidable');

const app = express();
app.engine(
  'hbs',
  hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' })
);
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { layout: 'dark' });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send-message', (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (
      fields.author &&
      fields.sender &&
      fields.title &&
      fields.message &&
      files.file.name
    ) {
      res.render('contact', { isSent: true, name: files.file.name });
    } else {
      res.render('contact', { isError: true });
    }
  });
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
