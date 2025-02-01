// signupValidation.js
import validator from "validator";

export const validateSignupInput = (formData) => {
  const { name, username, password, email, phone } = formData;
  const errors = {};

  // Name validation
  if (!name) {
    errors.name = "Name is required";
  } else {
    const sanitizedName = validator.trim(validator.escape(name));
    if (!validator.matches(sanitizedName, /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/)) {
      errors.name = "Name should only contain letters and spaces";
    }
    if (!validator.isLength(sanitizedName, { min: 2, max: 50 })) {
      errors.name = "Name must be between 2 and 50 characters";
    }
  }

  // Username validation
  if (!username) {
    errors.username = "Username is required";
  } else {
    const sanitizedUsername = validator.trim(validator.escape(username));
    if (!validator.isLength(sanitizedUsername, { min: 7, max: 30 })) {
      errors.username = "Username must be between 7 and 30 characters";
    }
    if (!validator.matches(sanitizedUsername, /^[a-zA-Z0-9]+$/)) {
      errors.username = "Username can only contain letters and numbers";
    }
  }

  // Password validation
  if (!password) {
    errors.password = "Password is required";
  } else {
    const sanitizedPassword = validator.trim(password);

    if (!validator.isLength(sanitizedPassword, { min: 8, max: 30 })) {
      errors.password = "Password must be between 8 and 30 characters";
    }

    // Complex password requirements
    if (!/(?=.*[a-z])/.test(sanitizedPassword)) {
      errors.password = "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(sanitizedPassword)) {
      errors.password = "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(sanitizedPassword)) {
      errors.password = "Password must contain at least one number";
    }

    // Check for common security issues
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
        sanitizedPassword.toLowerCase().includes(pattern.toLowerCase())
      )
    ) {
      errors.password = "Invalid password format";
    }
  }

  // Email validation
  if (!email) {
    errors.email = "Email is required";
  } else {
    const sanitizedEmail = validator.trim(validator.normalizeEmail(email));
    if (!validator.isEmail(sanitizedEmail)) {
      errors.email = "Invalid email format";
    }
  }

  // Phone validation
  if (!phone) {
    errors.phone = "Phone number is required";
  } else {
    const sanitizedPhone = validator.trim(validator.escape(phone));
    if (!validator.matches(sanitizedPhone, /^[0-9]{8,15}$/)) {
      errors.phone = "Phone number must be between 8 and 15 digits";
    }
  }

  // Prepare sanitized data
  const sanitizedData = {
    name: validator.trim(validator.escape(name)),
    username: validator.trim(validator.escape(username)),
    password: validator.trim(password),
    email: validator.trim(validator.normalizeEmail(email)),
    phone: validator.trim(validator.escape(phone)),
  };

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    sanitizedData,
  };
};

// Rate limiting helper for signup attempts
const signupAttempts = new Map();

export const checkSignupRateLimit = (
  ip,
  maxAttempts = 3,
  windowMs = 60 * 60 * 1000
) => {
  const now = Date.now();
  const attempts = signupAttempts.get(ip) || [];

  // Remove old attempts
  const recentAttempts = attempts.filter(
    (timestamp) => now - timestamp < windowMs
  );

  if (recentAttempts.length >= maxAttempts) {
    return false; // Rate limit exceeded
  }

  // Add new attempt
  recentAttempts.push(now);
  signupAttempts.set(ip, recentAttempts);
  return true;
};
