const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const twilio = require("twilio");

const jwt = require("jsonwebtoken");





dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  const sendSOS = async (req, res) => {
      try {
          const { userPhone, message } = req.body;
  
          // Send an emergency SMS
          await client.messages.create({
              body: message || "Emergency! Please check in immediately.",
              from: process.env.TWILIO_PHONE,
              to: userPhone
          });
  
          res.status(200).json({ success: true, message: "SOS Sent Successfully!" });
      } catch (error) {
          console.error("Twilio Error:", error);
          res.status(500).json({ success: false, error: "Failed to send SOS." });
      }
  };
  
  module.exports = { sendSOS };
  app.post("/api/sos", sendSOS);

 




  
  
  // Firebase login endpoint
  app.post("/api/auth/firebase-login", async (req, res) => {
      try {
          const { idToken } = req.body;
          const decodedToken = await admin.auth().verifyIdToken(idToken); // Verify Firebase token
          const userId = decodedToken.uid;
  
          // Generate JWT for the user
          const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
          res.json({ success: true, jwt: token });
      } catch (error) {
          res.status(401).json({ error: "Invalid Firebase token" });
      }
  });

  


  

// Default Route
app.get("/", (req, res) => {
    res.send("Mental Health AI Backend Running...");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
