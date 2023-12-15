const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hospital',
  port: '3307'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      res.send(err);
    } else {
      const query = 'INSERT INTO admin (admin_ID, password) VALUES (?, ?)';

      db.query(query, [username, hash], (err, result) => {
        if (err) {
          res.send(err);
        } else {
          console.log('Admin inserted successfully');
          res.send({message: "Admin added"});
        }
      });
    }
  });
});

app.listen(3003, () => {
  console.log("Connected to backend!");
});


app.post('/login', (req, res) => {
  const { loginusername, loginpassword } = req.body;
  const query = 'SELECT password FROM admin WHERE admin_ID = ?';

  db.query(query, [loginusername], (err, result) => {
    if (err) {
      console.log(err); 
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(loginpassword, result[0].password, (error, response) => {
        if (error) {
          console.log(error); 
        }
        if (response) {
          res.send({ message: "Login Successful" });
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.get('/getdoctor', (req, res) => {
  const query = 'SELECT * FROM doctor';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send(result);
    }
  });
});

app.get('/getpatients', (req, res) => {
  const query = 'SELECT * FROM patients';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send(result);
    }
  });
});

app.delete('/doctor/:doctor_ID', (req, res) => {
  const query = "DELETE FROM doctor WHERE doctor_ID = ?";
  const doctor_ID = req.params.doctor_ID;

  db.query(query, doctor_ID, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ message: 'doctor deleted successfully' });
    }
  });
});

app.delete('/patients/:patient_ID', (req, res) => {
  const query = "DELETE FROM patients WHERE patient_ID = ?";
  const patient_ID = req.params.patient_ID;

  db.query(query, patient_ID, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ message: 'patient deleted successfully' });
    }
  });
});

app.post('/exam', (req, res) => {
  const { patient, doctor} = req.body; 
  db.query('INSERT INTO examination (patient, doctor VALUES (?, ? )', [patient, doctor], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data into the table');
    } else {
      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    }
  });
});

app.delete('/examination/:examination_ID', (req, res) => {
  const query = "DELETE FROM examination WHERE examination_ID = ?";
  const examination_ID = req.params.examination_ID;

  db.query(query, examination_ID, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ message: 'patient deleted successfully' });
    }
  });
});

app.get('/getexamination', (req, res) => {
  const query = 'SELECT * FROM examination';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send(result);
    }
  });
});