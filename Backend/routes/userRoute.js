const express = require("express");
const router = express.Router();
const{insertPatient, patient_symptom, DocSignup, DocLogin, AdminLogin, AdminSignup} = require("../controllers/Controller");

router.route("/AdminSignup").post(AdminSignup);
router.route("/AdminLogin").post(AdminLogin);
router.route("/DocLogin").post(DocLogin);
router.route("/DocSignin").post(DocSignup);
router.route("/sym").post(patient_symptom);
router.route("/Registration").post(insertPatient);
module.exports = router;