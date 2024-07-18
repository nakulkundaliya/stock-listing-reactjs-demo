import express from 'express'
import axios from 'axios'
import nodemailer from 'nodemailer'
import admin from 'firebase-admin'
import cors from 'cors'

var serviceAccount = require("../stock-tracker.json");
const API_KEY_BAKEND = process.env.NEXT_APP_API_KEY_BAKEND;
const app = express();
const port = process.env.PORT || 5000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "test@gmail.com", // TODO: replace with your account
    pass: "lokx yesi qkpw rvmh",
  },
});

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  res.send("Server is working");
});

const authenticateUser = async (req, res, next) => {
  const token = req.body?.headers.Authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

app.post("/api/set-threshold", authenticateUser, async (req, res) => {
  const { index, threshold, email, direction } = req.body;
  const user = req.user;

  await db.collection("threshold").add({
    userId: user.uid,
    index,
    email,
    threshold,
    direction,
  });

  res.send("Threshold set");
});

const sendAlertIfNeeded = async (alert) => {
  try {
    const email = userRecord.email;

    await transporter.sendMail({
      from: "test@gmail.com", // TODO: Replace with your account
      to: alert?.email,
      subject: "Price Alert",
      text: `The price of ${alert?.index} has crossed your threshold. Current price: ${currentIndexPrice}, your threshold price was: ${alert?.threshold} `,
    });
  } catch (error) {
    console.error("Error sending alert:", error);
  }
};

const checkAlerts = async () => {
  const alertsSnapshot = await db.collection("threshold").get();
  alertsSnapshot.forEach(async (doc) => {
    const alert = doc.data();
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${alert.index}&token=${API_KEY_BAKEND}`
    );
    const currentIndexPrice = response.data.c;
    let notify = false;
    if (alert.direction === "above" && currentIndexPrice > alert.threshold) {
      notify = true;
    } else if (
      alert.direction === "below" &&
      currentIndexPrice < alert.threshold
    ) {
      notify = true;
    }

    if (notify) {
      sendAlertIfNeeded(alert);
    }
  });
};

setInterval(checkAlerts, 10000);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
