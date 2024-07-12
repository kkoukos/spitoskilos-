"use client";

import { Form } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import { useRouter } from "next/navigation";
import LogoWhite from "../../../../public/spitoskilos_logo_img_white.svg";
import { PlacesConnector } from "../../../connectors/PlacesConnector";

registerCoreBlocks();
const FormNewListing = () => {
  const router = useRouter();

  const handleSubmit = async (data, { completeForm, setIsSubmitting }) => {
    setIsSubmitting(true);
    console.log();
    const results = await PlacesConnector(data?.answers?.area?.value);

    if (results.suggestions.length > 0) {
      console.log(results.suggestions[0].placePrediction.place);
      const placesId = results.suggestions[0].placePrediction.place;
      console.log(placesId);
      const response = await fetch("/api/returnLatLon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placesId }),
      });

      const { lat, lon } = await response.json();

      const formData = {
        area: data?.answers?.area?.value,
        availability: data?.answers?.availability?.value,
        availableFor: data?.answers?.availablefor?.value,
        bathrooms: data?.answers?.bathrooms?.value,
        bedrooms: data?.answers?.bedrooms?.value,
        category: data?.answers?.category?.value,
        description: data?.answers?.description?.value,
        floor: data?.answers?.floor?.value,
        price: data?.answers?.price?.value,
        lat: lat,
        lon: lon,
        subcategory: data?.answers?.subcategory?.value,
        surface: data?.answers?.surface?.value,
        year: data?.answers?.year?.value,
      };

      // Call to API route to insert data into MongoDB
      try {
        const response = await fetch("../../api/newListing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData }),
        });

        const { success } = await response.json();

        if (success) {
          console.log("Document inserted ");
          setIsSubmitting(false);
          completeForm();
          router.push("/dashboard");
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error("Failed to submit listing:", error);
      }
    } else {
      console.log("No suggestions available.");
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Form
        formId="1"
        formObj={{
          blocks: [
            {
              name: "welcome-screen",
              id: "welcome",
              attributes: {
                label: "Your listing",
                description: "Upload your listing to Spitoskilos!",
                attachment: {
                  type: "image",

                  url: LogoWhite.src,
                },
                attachmentMaxWidth: "300px",
              },
            },
            {
              name: "dropdown",
              id: "category",
              attributes: {
                label: "Choose property category",
                choices: [
                  {
                    label: "House",
                    value: "House",
                  },
                  {
                    label: "Commercial",
                    value: "Commercial",
                  },
                  {
                    label: "Land",
                    value: "Land",
                  },
                ],
              },
            },
            {
              name: "dropdown",
              id: "subcategory",
              attributes: {
                label: "Choose property type",
                choices: [
                  {
                    label: "Apartment",
                    value: "Apartment",
                  },
                  {
                    label: "Studio",
                    value: "Studio",
                  },
                  {
                    label: "Maisonette",
                    value: "Maisonette",
                  },
                  {
                    label: "Vila",
                    value: "Vila",
                  },
                  {
                    label: "Building",
                    value: "Building",
                  },
                  {
                    label: "Other",
                    value: "Other",
                  },
                ],
              },
            },
            {
              name: "dropdown",
              id: "availablefor",
              attributes: {
                label: "Available for",
                choices: [
                  {
                    label: "Buy",
                    value: "Buy",
                  },
                  {
                    label: "Rent",
                    value: "Rent",
                  },
                ],
              },
            },
            {
              name: "short-text",
              id: "area",
              attributes: {
                // attachment: {
                //   type: "image",
                //   url: "https://quillforms.com/wp-content/uploads/2022/10/ludovic-migneault-B9YbNbaemMI-unsplash_50-scaled.jpeg",
                // },
                // layout: "split-right",
                required: true,
                label: "Write the address",
              },
            },

            {
              name: "number",
              id: "surface",
              attributes: {
                required: true,
                label: "Write the surface of the property in m²",
              },
            },

            {
              name: "number",
              id: "bedrooms",
              attributes: {
                required: true,
                label: "Write the number of bedrooms",
              },
            },

            {
              name: "number",
              id: "bathrooms",
              attributes: {
                required: true,
                label: "Write the number of bathrooms",
              },
            },

            {
              name: "number",
              id: "year",
              attributes: {
                required: true,
                label: "Write the construction year",
              },
            },

            {
              name: "date",
              id: "availability",
              attributes: {
                required: true,
                label: "Type when will the property be available",
              },
            },

            {
              name: "number",
              id: "floor",
              attributes: {
                required: true,
                label: "Write the floor that the property is located",
                description:
                  "(If it is not in one floor, write the total number of floors it covers)",
              },
            },

            {
              name: "long-text",
              id: "description",
              attributes: {
                required: true,
                label: "Type a brief about the property",
              },
            },

            {
              name: "slider",
              id: "price",
              attributes: {
                label: "Please choose the price of the property",
                min: 0,
                max: 900,
                step: 5,
                prefix: "€",
                suffix: ",000",
              },
            },

            {
              name: "numeric",
              id: "Submit",
              attributes: {
                required: true,
                label: "Submit",
              },
            },
            // {
            //   name: "email",
            //   id: "iqfrqwr13r",
            //   attributes: {
            //     required: true,
            //     label: "Thanks {{field:kdsfkdg}}, please insert your email!",
            //   },
            // },
            // {
            //   name: "multiple-choice",
            //   id: "gqr1294c",
            //   attributes: {
            //     required: true,
            //     multiple: true,
            //     verticalAlign: false,
            //     label: "Which subjects do you love the most?",
            //     choices: [
            //       {
            //         label: "Physics",
            //         value: "physics",
            //       },
            //       {
            //         label: "Math",
            //         value: "math",
            //       },
            //       {
            //         label: "English",
            //         value: "english",
            //       },
            //       {
            //         label: "Biology",
            //         value: "biology",
            //       },
            //     ],
            //   },
            // },
            // {
            //   name: "statement",
            //   id: "g91imf1023",
            //   attributes: {
            //     label: "You are doing great so far!",
            //     buttonText: "Continue",
            //     quotationMarks: true,
            //   },
            // },
            // {
            //   name: "website",
            //   id: "bv91em9123",
            //   attributes: {
            //     required: true,
            //     multiple: true,
            //     label: "Please insert your website url!",
            //   },
            // },
          ],
          settings: {
            animationDirection: "vertical",
            disableWheelSwiping: false,
            disableNavigationArrows: false,
            disableProgressBar: false,
          },
          theme: {
            font: "Roboto",
            buttonsBgColor: "#14293A",
            logo: {
              src: "",
            },
            questionsColor: "#000",
            answersColor: "#0aa7c2",
            buttonsFontColor: "#fff",
            buttonsBorderRadius: 25,
            errorsFontColor: "#fff",
            errorsBgColor: "#f00",
            progressBarFillColor: "#000",
            progressBarBgColor: "#ccc",
          },
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormNewListing;
