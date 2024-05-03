import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function PropertyCard({ property }) {
  const detailsUrl = `/properties/${property._id}`;
  return (
    <a
      href={detailsUrl}
      className="relative flex w-full bg-white shadow-lg rounded-xl mt-4 mb-4 border-1 hover:shadow-2xl transition-shadow duration-300"
    >
      <img
        //   object-cover, fits the image when the window is smaller
        className="w-1/3 object-cover rounded-l-xl"
        src="https://m3.spitogatos.gr/281266820_1600x1200.jpg?v=20130730"
        alt="Property Photo"
      />
      <div className="w-2/3 p-4 ">
        <div className="text-lg font-bold">
          {property.propertyCategory}, {property.surface}m²
        </div>
        <p className=" text-sm ">{property.area}</p>
        <p className=" text-gray-400 mt-2 ">{property.description}</p>

        <div className="flex items-center text-gray-400 mt-3 space-x-4">
          <BedOutlinedIcon className="mb-1 text-md" />
          {property.numberOfBedrooms}
          <BathtubOutlinedIcon className="mb-1 text-md" />
          {property.numberOfBathrooms}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-xl font-bold text-gray-900">
            {/* .toLocaleString() vazei komma "," stis xiliades*/}€
            {property.price.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 mt-2">
            Updated: {new Date(property.dateOfUpload).toLocaleDateString()}
          </div>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 p-2 rounded-full text-gray-900 hover:bg-red-700 hover:text-white transition duration-300"
        onClick={() => console.log(property._id, ",added to favorite list!")}
      >
        <FavoriteBorderIcon />
      </button>
    </a>
  );
}
