const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const twilio = require("twilio");
const { Clerk } = require('@clerk/clerk-sdk-node');
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

  // Initialize Clerk
const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

  // Auth Middleware
const authenticateUser = async (req, res, next) => {
    try {
      const sessionToken = req.headers.authorization?.split(' ')[1];
      if (!sessionToken) {
        return res.status(401).json({ error: "Authorization token required" });
      }
  
      const user = await clerk.verifyToken(sessionToken);
      req.user = user;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };

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

 // Initialize Firebase Admin SDK (Ensures it runs only once)
 try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            })
        });
        console.log("✅ Firebase Admin SDK Initialized Successfully!");
    }
} catch (error) {
    console.error("❌ Firebase Admin SDK Initialization Failed:", error);
}

// Function to verify Firebase connection
const testFirebaseConnection = async () => {
    try {
        // Test Firestore
        const db = admin.firestore();
        await db.collection('test').doc('connection-check').set({ status: "connected", timestamp: new Date() });
        console.log("✅ Firebase Firestore is connected and writable!");

        // Test Authentication (List users)
        const listUsers = await admin.auth().listUsers(1);
        console.log("✅ Firebase Authentication is working! Found users:", listUsers.users.length);

    } catch (error) {
        console.error("❌ Firebase Connection Failed:", error);
    }
};

// Call the function
testFirebaseConnection();


  
  
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
