"use server";
import { MongoClient } from "mongodb";
import crypto from "crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Constants
const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "session";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

// Helper function to create MongoDB client
async function getMongoClient() {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

// Helper function to generate session token
function generateToken(user) {
  console.log(JWT_SECRET);
  return jwt.sign(
    {
      userId: user._id,
      username: user.username,
      type: user.type,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Helper function to set session cookie
function setSessionCookie(token) {
  cookies().set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function signIn(username, password) {
  try {
    const client = await getMongoClient();
    const db = client.db("users");

    const existingUser = await db.collection("users").findOne({ username });

    if (!existingUser) {
      return { success: false, message: "nouserfound" };
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    // Verify password hash

    if (!isValidPassword) {
      return { success: false, message: "userfound" };
    }

    const favorites_query = await db
      .collection("favorites")
      .find({ _id: existingUser._id })
      .toArray();
    const favorites = favorites_query[0].favorites;

    const user = {
      _id: existingUser._id,
      name: existingUser.name,
      username: existingUser.username,
      email: existingUser.email,
      phone: existingUser.phone,
      type: existingUser.type || 0,
      profile_picture: existingUser.profile_picture,
      favorites: favorites,
    };

    // Generate and set session token
    const token = generateToken(user);
    setSessionCookie(token);

    return { success: true, message: user };
  } catch (error) {
    console.error("Sign in error:", error);
    return { success: false, message: "An error occurred during sign in" };
  }
}

export async function handleGoogleLogin(googleCredential) {
  try {
    // The credential is in the format { credential: "token_string" }
    const { credential } = googleCredential;

    if (!credential) {
      throw new Error("No Google credential provided");
    }

    // Decode the JWT token from Google (it's a JWT!)
    const decoded = jwt.decode(credential);

    if (!decoded) {
      throw new Error("Invalid Google credential");
    }

    const userData = {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
      email_verified: decoded.email_verified,
    };

    // Connect to MongoDB
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("users");

    // Check if user exists
    let user = await db.collection("users").findOne({ email: userData.email });

    if (!user) {
      // Create new user
      const id = crypto
        .createHash("sha256")
        .update(userData.email)
        .digest("hex");
      const username = userData.email.split("@")[0];

      user = {
        _id: id,
        name: userData.name,
        username: username,
        email: userData.email,
        password: await bcrypt.hash(crypto.randomBytes(32).toString("hex"), 10),
        phone: "",
        type: 0,
        profile_picture: userData.picture || "",
      };

      // Insert the new user
      await db.collection("users").insertOne(user);

      // Create favorites document
      await db.collection("favorites").insertOne({
        _id: id,
        favorites: [],
      });
    }

    // Get favorites
    const favorites_query = await db
      .collection("favorites")
      .find({ _id: user._id })
      .toArray();
    const favorites = favorites_query[0]?.favorites || [];

    // Prepare user response
    const userResponse = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      type: user.type || 0,
      profile_picture: user.profile_picture,
      favorites: favorites,
    };

    await client.close();

    return {
      success: true,
      message: userResponse,
    };
  } catch (error) {
    console.error("Google login error:", error);
    return {
      success: false,
      message: error.message || "Failed to authenticate with Google",
    };
  }
}

export async function signUp(name, username, password, email, phone) {
  try {
    const client = await getMongoClient();
    const db = client.db("users");

    const existingUser = await db.collection("users").findOne({
      $or: [
        { username: { $regex: `^${username}$`, $options: "i" } },
        { email: { $regex: `^${email}$`, $options: "i" } },
      ],
    });

    console.log("Found User:", existingUser);

    if (existingUser) {
      return {
        success: false,
        result:
          existingUser.username.toLowerCase() === username.toLowerCase()
            ? "Username already exists."
            : "Email already exists.",
      };
    }

    const id = crypto.createHash("sha256").update(username).digest("hex");
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = {
      _id: id,
      name,
      username,
      password: hashedPassword,
      email,
      phone,
      type: 0,
      profile_picture: "",
    };

    await db.collection("users").insertOne(newUser);
    await db.collection("favorites").insertOne({
      _id: id,
      favorites: [],
    });

    // Generate and set session token for automatic sign in
    const token = generateToken(newUser);
    setSessionCookie(token);

    return { success: true, result: "User signed up successfully." };
  } catch (error) {
    console.error("Sign up error:", error);
    return { success: false, result: "An error occurred during sign up." };
  }
}

export async function logOut() {
  try {
    cookies().delete(COOKIE_NAME);
    return { success: true, message: "User logged out" };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "Failed to log out" };
  }
}

export async function deleteUser(username) {
  try {
    const client = await getMongoClient();
    const db = client.db("users");
    const db1 = client.db("listings");

    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return { success: false, result: "User not found." };
    }

    const userId = user._id;

    // Delete user data
    await Promise.all([
      db.collection("users").deleteOne({ _id: userId }),
      db.collection("favorites").deleteOne({ _id: userId }),
      db1.collection("Residences").deleteMany({ user_id: userId }),
    ]);

    // Clear session if the deleted user is currently logged in
    const sessionCookie = cookies().get(COOKIE_NAME);
    if (sessionCookie) {
      const decoded = jwt.verify(sessionCookie.value, JWT_SECRET);
      if (decoded.userId === userId) {
        cookies().delete(COOKIE_NAME);
      }
    }

    return {
      success: true,
      result: "User and associated data deleted successfully.",
    };
  } catch (error) {
    console.error("Delete user error:", error);
    return { success: false, result: "An error occurred while deleting user." };
  }
}
