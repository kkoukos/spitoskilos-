// validation.js
import validator from "validator";

export const validateLoginInput = (username, password) => {
  const errors = {};

  // Username/Email validation
  if (!username) {
    errors.username = "Username/Email is required";
  } else {
    // Sanitize and validate username/email
    username = validator.trim(username);
    username = validator.escape(username); // Prevent XSS

    if (username.includes("@")) {
      // Email validation
      if (!validator.isEmail(username)) {
        errors.username = "Invalid email format";
      }
    } else {
      // Username validation
      if (!validator.isLength(username, { min: 3, max: 30 })) {
        errors.username = "Username must be between 3 and 30 characters";
      }
      if (!validator.matches(username, /^[a-zA-Z0-9_]+$/)) {
        errors.username =
          "Username can only contain letters, numbers and underscore";
      }
    }
  }

  // Password validation
  if (!password) {
    errors.password = "Password is required";
  } else {
    // Sanitize password
    password = validator.trim(password);

    // Basic password validation
    if (!validator.isLength(password, { min: 8, max: 128 })) {
      errors.password = "Password must be between 8 and 128 characters";
    }

    // Check for common password patterns that might indicate injection attempts
    const suspiciousPatterns = [
      "--",
      ";",
      "/*",
      "*/",
      "UNION",
      "SELECT",
      "<script>",
      "javascript:",
      "data:",
      "vbscript:",
      "onload=",
      "onerror=",
    ];

    if (
      suspiciousPatterns.some((pattern) =>
        password.toLowerCase().includes(pattern.toLowerCase())
      )
    ) {
      errors.password = "Invalid password format";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    sanitizedData: {
      username,
      password,
    },
  };
};

// Google credential validation
export const validateGoogleCredential = (credential) => {
  const errors = {};

  if (!credential) {
    errors.credential = "Google credential is required";
  } else if (typeof credential !== "string") {
    errors.credential = "Invalid credential format";
  } else {
    // Verify JWT format (basic structure check)
    const jwtParts = credential.split(".");
    if (jwtParts.length !== 3) {
      errors.credential = "Invalid credential format";
    }

    // Additional JWT validation can be added here
    try {
      const decodedHeader = JSON.parse(atob(jwtParts[0]));
      const decodedPayload = JSON.parse(atob(jwtParts[1]));

      if (!decodedHeader.alg || !decodedPayload.sub) {
        errors.credential = "Invalid credential structure";
      }
    } catch (error) {
      errors.credential = "Invalid credential format";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// Rate limiting helper
const loginAttempts = new Map();

export const checkRateLimit = (
  ip,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000
) => {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || [];

  // Remove old attempts
  const recentAttempts = attempts.filter(
    (timestamp) => now - timestamp < windowMs
  );

  if (recentAttempts.length >= maxAttempts) {
    return false; // Rate limit exceeded
  }

  // Add new attempt
  recentAttempts.push(now);
  loginAttempts.set(ip, recentAttempts);
  return true;
};
