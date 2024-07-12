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

export async function deleteUser(username) {
  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    const client = new MongoClient(uri);

    await client.connect();
    const db = client.db("users");
    console.log("Connected to MongoDB.");

    // Find the user by username
    const user = await db.collection("users").findOne({ username });
    if (!user) {
      console.log("User not found");
      return { success: false, result: "User not found." };
    }

    const userId = user._id;

    // Delete user from 'users' collection
    await db.collection("users").deleteOne({ _id: userId });
    console.log(`Deleted user with ID: ${userId} from 'users' collection.`);

    // Delete all listings associated with the user ID from 'listings' collection

    const db1 = client.db("listings");

    const listingsDeleteResult = await db1
      .collection("Residences")
      .deleteMany({ user_id: userId });
    console.log(
      `Deleted ${listingsDeleteResult.deletedCount} listings associated with user ID: ${userId} from 'listings' collection.`
    );

    // Optionally, delete user's favorites or other related data from other collections

    // Return success message
    return {
      success: true,
      result: "User and associated listings deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, result: "An error occurred while deleting user." };
  }
}
