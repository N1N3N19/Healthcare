
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const jwt = require("jsonwebtoken");
// const session = require("express-session");
const neo4j = require('neo4j-driver');

const uri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = '12345678';

//define loaclstorage in server
const localStorage = require('localStorage');
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hospital',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//@desc INSERT patient in patient table
//@route POST /api/patient
//@access private
const insertPatient = async(req, res) => {
    console.log('insertPatient called');
    const {patient_ID, password, name, DOB,  phone, email, gender, occupation, city} = req.body;
    console.log('1',req.body);
    try {
        console.log('Before query');
        const passwordHash = await bcrypt.hash(password, 10);
        const result = await pool.query("INSERT INTO patients(patient_ID, password, name, DOB, email, phone, gender, occupation, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [patient_ID, passwordHash, name, DOB, email, phone, gender, occupation, city ]
        );
        
        console.log('After query');
        res.status(200).json({message: "Patient has been created successfully"});
    } catch(err) {
        console.log('Catch error', err);
        res.status(500).send();
    }
}

const DocSignup = async(req, res) => {
    const { ID , password, name, department} = req.body;
    console.log(req.body);
    const passwordHash = await bcrypt.hash(password, 10);
    try {
    const result = await pool.query("INSERT INTO doctor(doctor_ID, name, dept, password) SELECT ?, ?, ?, ? FROM dual WHERE NOT EXISTS (SELECT * FROM doctor WHERE doctor_ID = ?)",
        [ID, name, department, passwordHash, ID]
    );

    console.log(result);
    res.status(200).json({message: "Doctor has been created successfully"});
  } catch(err) {
    console.log(err);
    }
}

const DocLogin = async(req, res) => {
  const { Id, password } = req.body;
  console.log(req.body);

  try {
      const result = await pool.query("SELECT * FROM doctor WHERE doctor_ID = ?", [Id]);
      if (result[0].length === 0) {
          return res.status(400).json({message: "Doctor does not exist"});
      }
      const isPasswordCorrect = await bcrypt.compare(password, result[0][0].password);
      if (!isPasswordCorrect) {
          return res.status(400).json({message: "Invalid credentials"});
      }
      else {
        console.log('Doctor logged in');
        req.session.user = { Id }; // This line creates a session
        console.log(req.session.user);

        res.json({message: "Logged in", session: req.session.user});
        
      }

  } catch(err) {
      console.log(err);
      res.status(500).send();
  }
}

const AdminSignup = async(req, res) => {
  const { ID , password,} = req.body;
  console.log(req.body);
  const passwordHash = await bcrypt.hash(password, 10);
  try {
  const result = await pool.query("INSERT INTO doctor(admin_ID,  password) SELECT ?, ? FROM dual WHERE NOT EXISTS (SELECT * FROM admin WHERE admin_ID = ?)",
      [ID, passwordHash, ID]
  );

  console.log(result);
  res.status(200).json({message: "Doctor has been created successfully"});
} catch(err) {
  console.log(err);
  }
}

const AdminLogin = async(req, res) => {
  const { Id, password } = req.body;
  console.log(req.body);

  try {
      const result = await pool.query("SELECT * FROM admin WHERE admin_ID = ?", [Id]);
      if (result[0].length === 0) {
          return res.status(400).json({message: "Admin does not exist"});
      }
      const isPasswordCorrect = await bcrypt.compare(password, result[0][0].password);
      if (!isPasswordCorrect) {
          return res.status(400).json({message: "Invalid credentials"});
      }
      else {
        console.log('Admin logged in');
        req.session.user = { Id }; // This line creates a session
        console.log(req.session.user);

        res.json({message: "Logged in", session: req.session.user});
        
      }

  } catch(err) {
      console.log(err);
      res.status(500).send();
  }
}
const patient_symptom = async(req,res) => {
    try {
      const {patient_ID, symptom_ID} = req.body;
      console.log(req.body);
      
      if (!symptom_ID || !Array.isArray(symptom_ID)) {
        return res.status(400).send("Invalid symptom_ID");
      }

      const symptom_IDs = symptom_ID.map(id => parseInt(id));
      console.log(symptom_IDs); 
        const query = `
        MERGE (p:Patient {patient_ID: ${patient_ID}})
        WITH p
        UNWIND ${JSON.stringify(symptom_IDs)} AS id
        MATCH (s:Symptom {SymptomID: id})
        MERGE (p)-[:HAS_SYMPTOM]->(s)
        `;
        await session.run(query);
      
  
      const aggregateQuery = `
        MATCH (p:Patient {patient_ID: ${patient_ID}})-[:HAS_SYMPTOM]->(s:Symptom)
        WHERE s.SymptomID IN ${JSON.stringify(symptom_IDs)}
        MATCH (s)-[:SYMPTOM_FOR]->(d:Disease)
        RETURN d.DiseaseName, count(s) AS symptomCount
        ORDER BY symptomCount DESC
        `;
      const result = await session.run(aggregateQuery);
      console.log(result.records.map(record => record._fields));
      // Send the result as the response
      possible_disease = result.records.map(record => record._fields);
      res.json(possible_disease);
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).send("An error occurred");
    }
  }

const Dashboard = async(req,res) => {

}
  
module.exports = {insertPatient,patient_symptom, DocSignup,DocLogin, AdminSignup, AdminLogin }

