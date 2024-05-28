"use server";
import { MongoClient } from "mongodb";
import crypto from "crypto";
import { user } from "@nextui-org/react";
import { cookies } from "next/headers";
import { Session } from "inspector";

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

    const favorites_query = await db
      .collection("favorites")
      .find({ _id: existingUser._id })
      .toArray();
    const favorites = favorites_query[0].favorites;

    if (password === existingUser.password) {
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

      return { success: true, message: user }; // Password is correct
    } else {
      return { success: false, message: "userfound" }; // Password is incorrect
    }
  } catch (error) {
    return error;
  }
}

export async function logOut() {
  const session = cookies().get("session");
  if (session) {
    cookies().delete("session");
    console.log("deleted session");
    return { success: true, message: "user  logged out" };
  }

  return { success: false, message: "user not logged out" };
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
      console.log("User exists");
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
      type: 0,
      profile_picture: "",
    };

    const favorite = {
      _id: id,
      favorites: [],
    };

    // Insert the new user document into the users collection
    const result = await db.collection("users").insertOne(newUser);
    const result2 = await db.collection("favorites").insertOne(favorite);

    // Return the ID of the newly created user
    return { success: true, result: "User signed up successfully." };
  } catch (error) {
    return error;
  }
}
