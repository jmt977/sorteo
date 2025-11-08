import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://sorteo-nine-lyart.vercel.app",
}));
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.get("/", (req, res) => {
  res.send("API del sorteo funcionando 🎉");
});

app.post("/api/participar", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email requerido" });

  try {
    await pool.query("INSERT INTO participantes (email) VALUES ($1)", [email]);
    res.json({ message: "¡Gracias por participar!" });
  } catch (err) {
    if (err.code === "23505") {
      res.json({ message: "Ya estás participando con este email." });
    } else {
      console.error(err);
      res.status(500).json({ message: "Error del servidor" });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
