import React, { useState, useEffect } from 'react';

const VerificationCodeForm = ({ 
  email, 
  onVerify, 
  onResend, 
  isLoading = false,
  type = 'email' // 'email' or 'password'
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCodeChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }

    // Submit if all digits are filled
    if (newCode.every(digit => digit !== '') && index === 5) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const digits = pasteData.replace(/\D/g, '').split('').slice(0, 6);
    
    if (digits.length === 6) {
      const newCode = [...Array(6).fill('')];
      digits.forEach((digit, index) => {
        newCode[index] = digit;
      });
      setCode(newCode);
      document.getElementById('code-5').focus();
    }
  };

  const handleSubmit = (verificationCode = null) => {
    const finalCode = verificationCode || code.join('');
    
    if (finalCode.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setError('');
    onVerify(finalCode);
  };

  const handleResendCode = async () => {
    setCountdown(60); // 60 seconds countdown
    await onResend();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {type === 'password' ? 'Reset Password' : 'Verify Your Email'}
        </h2>
        <p className="text-gray-400">
          Enter the 6-digit code sent to <span className="text-primary font-medium">{email}</span>
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
        <div className="flex justify-center space-x-3">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-2xl text-center border-2 border-gray-600 rounded-lg bg-gray-800 text-white focus:border-primary focus:outline-none"
              disabled={isLoading}
              autoFocus={index === 0}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || code.some(digit => digit === '')}
          className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : type === 'password' ? 'Reset Password' : 'Verify Email'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-400">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={handleResendCode}
            disabled={countdown > 0 || isLoading}
            className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend {countdown > 0 && `(${countdown}s)`}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerificationCodeForm;