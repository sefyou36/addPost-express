const fs = require('fs');
const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    resultats: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, { tours: req.body });
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        resultats: tours.length,
        data: {
          tour: newTour,
        },
      });
    },
  );
});

app.listen(port, () => {
  console.log(`serveur is listening to ${port}...`);
});
