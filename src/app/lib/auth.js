"use server";
import { MongoClient } from "mongodb";
import crypto from "crypto";
import { user } from "@nextui-org/react";

export async function signIn(username, password) {
  // const secret = "alehxs";

  // const key = new TextEncoder().encode(secret);
  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

    // Create a new MongoClient instance with the URI and options
    const client = new MongoClient(uri);

    // Connect to the client and store the promise
    await client.connect();

    const db = client.db("users");
    console.log("Connected to MongoDB.");

    const existingUser = await db.collection("users").findOne({ username });

    if (!existingUser) {
      return { success: false, message: "nouserfound" }; // User not found
    }

    if (password === existingUser.password) {
      const user = {
        _id: existingUser._id,
        name: existingUser.name,
        username: existingUser.username,
      };

      return { success: true, message: user }; // Password is correct
    } else {
      return { success: false, message: "userfound" }; // Password is incorrect
    }
  } catch (error) {
    return error;
  }
}

export async function signUp(name, username, password, email, phone) {
  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

    // Create a new MongoClient instance with the URI and options
    const client = new MongoClient(uri);

    // Connect to the client and store the promise
    await client.connect();

    const db = client.db("users");
    console.log("Connected to MongoDB.");

    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return { success: false, result: "Username already exists." };
    }

    const id = crypto.createHash("sha256").update(username).digest("hex");

    const newUser = {
      _id: id, // Using the provided ID
      name,
      username,
      password, // Note: Password should be hashed before storing in a real application
      email,
      phone,
    };

    // Insert the new user document into the users collection
    const result = await db.collection("users").insertOne(newUser);

    // Return the ID of the newly created user
    return { success: true, result: "User signed up successfully." };
  } catch (error) {
    return error;
  }
}
