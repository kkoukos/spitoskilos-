'use server';

import { client } from "../lib/db";
import { redirect } from "next/navigation";

export async function createEntry(formData) {
    const {property} = Object.fromEntries(formData); // Object.fromEntries allows us to destructure all the values we
                                                     // passed at the const file

    // create unique id for the entry
    const id = Math.floor(Math.random() * 100000);

    // save new hash for the entry
    await client.hSet(`input:${id}`, {
        property
    })

    redirect('/')
}

// import { client } from "../lib/db";
// import { useRouter } from "next/navigation"; // Import the useRouter hook for navigation

// export async function createEntry(formData) {
//     const router = useRouter(); // Initialize the router

//     // Extract the property value from formData
//     const { property } = formData;

//     // Generate a unique id for the entry (you might want to use a more robust method than Math.random())
//     const id = Math.floor(Math.random() * 100000);

//     try {
//         // Save new hash for the entry
//         await client.hSet(`input:${id}`, { property });

//         // Redirect to the desired page using Next.js router
//         router.push('/');
//     } catch (error) {
//         // Handle any errors that occur during database interaction or navigation
//         console.error('Error creating entry:', error);
//     }
// }
