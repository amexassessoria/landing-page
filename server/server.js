const express = require('express');
const { join } = require('path');
const app = express();

app.use(express.static(join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.use((req, res, next) => {
  res.sendFile(join(__dirname, '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000, err => {
  if (err) {
    return console.log(err);
  }

  console.log('Rodando');
});
