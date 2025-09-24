import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { verifyEmail, resendVerification } from "../services/auth";
import VerificationCodeForm from "../components/Auth/VerificationCodeForm";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Get email from navigation state or redirect
    const stateEmail = location.state?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  const handleVerify = async (code) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await verifyEmail(email, code);
      setSuccess(result.msg);

      // Auto-login
      if (result.token && result.user) {
        setTimeout(() => {
          login(result.token, result.user);
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");

    try {
      await resendVerification(email);
      setSuccess("Verification code sent successfully!");
    } catch (err) {
      setError(err.message || "Failed to resend code");
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8">
          {success ? (
            <div className="text-center space-y-4">
              <div className="text-green-400 text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-white">Email Verified!</h2>
              <p className="text-gray-400">{success}</p>
              <p className="text-gray-400 text-sm">Redirecting to dashboard...</p>
            </div>
          ) : (
            <>
              <VerificationCodeForm
                email={email}
                onVerify={handleVerify}
                onResend={handleResend}
                isLoading={isLoading}
                type="email"
              />

              {error && (
                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/login")}
                  className="text-primary hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
