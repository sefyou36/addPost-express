const fs = require('fs');
const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`, 'utf-8'),
);

const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    resultats: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getOneTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((item) => item.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  res.status(200).json({
    status: 'succes',
    data: {
      tour: tour,
    },
  });
};

const createTour = (req, res) => {
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
};

const updatedTours = (req, res) => {
  const id = req.params.id;

  const tourIndex = tours.findIndex((tours) => tours.id === parseInt(id));
  const updatedTour = { ...tours[tourIndex], ...req.body };

  tours[tourIndex] = updatedTour;

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        resultats: tours.length,
        data: {
          tours: updatedTour,
        },
      });
    },
  );
};

const deleteTour = (req, res) => {
  const id = +req.params.id;
  // const tourIndex = tours.findIndex((tours) => tours.id === parseInt(id));
  const tour = tours.filter((item) => item.id !== id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tour),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    },
  );
};

const getAllUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    resultats: users.length,
    data: {
      users: users,
    },
  });
};

const getOneUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = users.find((item) => item._id === id);
  console.log(user);

  // if (!user) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'invalid ID',
  //   });
  // }
  res.status(200).json({
    status: 'succes',
    data: {
      user: user,
    },
  });
};

const createUser = (req, res) => {
  const newId = users.length + 1;
  // console.log(typeof users[users.length - 1].id, users[users.length - 1].id);
  // console.log(typeof newId, newId);
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        resultats: users.length,
        data: {
          user: newUser,
        },
      });
    },
  );
};

const updatedUser = (req, res) => {
  const id = req.params.id;

  const tourUser = users.findIndex((users) => users.id === id);
  const updateUser = { ...users[tourUser], ...req.body };

  users[tourUser] = updateUser;

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        resultats: users.length,
        data: {
          users: updateUser,
        },
      });
    },
  );
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  // const tourIndex = tours.findIndex((tours) => tours.id === parseInt(id));
  const user = users.filter((item) => item._id !== id);
  // console.log(typeof id);

  // res.send("delete")

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(user),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    },
  );
};

app.get('/api/v1/tours', getAllTour);
app.get('/api/v1/tours/:id', getOneTour);
app.post('/api/v1/tours', createTour);
app.put('/api/v1/tours/:id', updatedTours);
app.delete('/api/v1/tours/:id', deleteTour);

app.get('/api/v1/users', getAllUser);
app.get('/api/v1/users/:id', getOneUser);
app.post('/api/v1/users', createUser);
app.put('/api/v1/users/:id', updatedUser);
app.delete('/api/v1/users/:id', deleteUser);

app.listen(port, () => {
  console.log(`serveur is listening to ${port}...`);
});
