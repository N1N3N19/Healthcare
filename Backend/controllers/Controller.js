
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
      const {patient_ID, symptom_ID, pain_ID, cough_ID, painDesID, BloodAppears_ID, painLocated_ID, Problem_ID, preceded_ID, Onset_ID, triggered_ID, relieved_ID, accompanied_ID} = req.body;
      console.log(req.body);
      const q1 = `MERGE (p:Patient {Patient_ID: ${patient_ID}})`;
      const q11 = `MATCH (p:Patient {Patient_ID: ${patient_ID}})
      MATCH (s:Symptom {SymptomID: ${symptom_ID}})
      MERGE (p)-[:HAS_SYMPTOM]->(s)`;
      await session.run(q1);
      await session.run(q11);
      if ( pain_ID && pain_ID.length > 0) {
        const pain_IDs = pain_ID.map(id => parseInt(id));
        const q2 = `UNWIND ${JSON.stringify(pain_IDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:Pain {PainID: id})
        MERGE (p)-[:HAS_PAIN]->(s)`;
        await session.run(q2);

        }
      if (cough_ID && cough_ID.length > 0) {
        const cough_IDs = cough_ID.map(id => parseInt(id));
        const q3 = `UNWIND ${JSON.stringify(cough_IDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:Cough {CoughID: id})
        MERGE (p)-[:HAS_COUGH]->(s)`;
        await session.run(q3);
        }
      if (painDesID && painDesID.length > 0) {
        const painDesIDs = painDesID.map(id => parseInt(id));
        const q4 = `UNWIND ${JSON.stringify(painDesIDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:PainDes {PainDesID: id})
        MERGE (p)-[:HAS_PAINDESCRIPTION]->(s)`;
        await session.run(q4);
        }
      if (BloodAppears_ID && BloodAppears_ID.length > 0) {
        const BloodAppears_IDs = BloodAppears_ID.map(id => parseInt(id));
        const q5 = `UNWIND ${JSON.stringify(BloodAppears_IDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:BloodAppears {AppearsID: id})
        MERGE (p)-[:HAS_BLOODAPPEARS]->(s)`;
        await session.run(q5);
        }
      if (painLocated_ID && painLocated_ID. length > 0 ) {
        const painLocated_IDs = painLocated_ID.map(id => parseInt(id));
        const q6 = `UNWIND ${JSON.stringify(painLocated_IDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:PainLocated {PainLocatedID: id})
        MERGE (p)-[:HAS_PAINLOCATED]->(s)`;
        await session.run(q6);
        }
      if (Problem_ID && Problem_ID.length > 0) {
        const Problem_IDs = Problem_ID.map(id => parseInt(id));
        const q7 = `UNWIND ${JSON.stringify(Problem_IDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:Problem {ProblemID: id})
        MERGE (p)-[:HAS_PROBLEM]->(s)`;
        await session.run(q7);
        }
      if (preceded_ID && preceded_ID.length > 0) {
        const preceded_IDs = preceded_ID.map(id => parseInt(id));
        const q12 = `UNWIND ${JSON.stringify(preceded_IDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:Preceded {PrecededID: id})
        MERGE (p)-[:HAS_PRECEDED]->(s)`;
        await session.run(q12);
        }
      if (Onset_ID && Onset_ID.length > 0) {
        const Onset_IDs = Onset_ID.map(id => parseInt(id));
        const q13 = `UNWIND ${JSON.stringify(Onset_IDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:Onset {OnsetID: id})
        MERGE (p)-[:HAS_ONSET]->(s)`;
        await session.run(q13);
        }
      if (triggered_ID && triggered_ID.length > 0) {
        const triggered_IDs = triggered_ID.map(id => parseInt(id));
        const q8 = `UNWIND ${JSON.stringify(triggered_IDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:TriggeredBy {TriggeredID: id})
        MERGE (p)-[:HAS_TRIGGERED_BY]->(s)`;
        await session.run(q8);
        }
      if (relieved_ID && relieved_ID.length > 0) {
        const relieved_IDs = relieved_ID.map(id => parseInt(id));
        const q9 = `UNWIND ${JSON.stringify(relieved_IDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:RelievedBy {RelievedID: id})
        MERGE (p)-[:HAS_RELIEVED_BY]->(s)`;
        await session.run(q9);
        }
      if (accompanied_ID && accompanied_ID.length > 0) {      
        const accompanied_IDs = accompanied_ID.map(id => parseInt(id));
        const q10 = `UNWIND ${JSON.stringify(accompanied_IDs)} AS id
        MATCH (p:Patient {Patient_ID:${patient_ID}})
        MATCH (s:AccompaniedBy {AccompaniedID: id})
        MERGE (p)-[:HAS_ACCOMPANIED]->(s)`;
        await session.run(q10);
        }
       
     
  
      const aggregateQuery = `
        MATCH (p:Patient {Patient_ID: ${patient_ID}})-[r]->(s)-[:Can_be]->(d:Disease)
        RETURN d.DiseaseName AS PossibleDisease, count(s) AS symptomCount
        ORDER BY symptomCount DESC
        `;
      const result = await session.run(aggregateQuery);
      // console.log(result.records.map(record => record._fields));
      // Send the result as the response
      possible_disease = result.records.map(record => record._fields);
      possible_diseases = possible_disease.map(record => {
        return {
          DiseaseName: record[0],
          symptomCount: record[1].low
        }
      })
      console.log(possible_diseases);
      res.json(possible_diseases);
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).send("An error occurred");
    }
  }

const Dashboard = async(req,res) => {

}
  
module.exports = {insertPatient,patient_symptom, DocSignup,DocLogin, AdminSignup, AdminLogin }

