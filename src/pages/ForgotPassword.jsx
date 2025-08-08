import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });

      setMessage(res.data.message);

      if (res.data.token) {
       
        navigate(`/reset-password/${res.data.token}`);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Error sending reset email");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
      </div>
    </div>
  );
}
