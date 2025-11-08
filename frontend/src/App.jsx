import { useState } from "react";
function App() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://tu-backend.onrender.com/api/participar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMsg(data.message);
    setEmail("");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          🎉 Sorteo de Computadoras 🎉
        </h1>
        <p className="mb-6 text-gray-700">
          Ingresá tu email y participá del sorteo. ¡Mucha suerte!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="tuemail@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">
            Participar
          </button>
        </form>
        {msg && <p className="mt-4 text-green-600 font-semibold">{msg}</p>}
      </div>
    </div>
  );
}
export default App;