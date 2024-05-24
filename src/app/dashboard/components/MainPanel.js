import MyProfile from "./MyProfile";
import MyListings from "./MyListings";
import MyFavorites from "./MyFavorites";

export default function MainPanel({ user, view }) {
  const renderContent = () => {
    if (view[0]) {
      return <MyProfile user={user} />;
    } else if (view[1]) {
      return <MyListings user={user} />;
    } else if (view[2]) {
      return <MyFavorites user={user} />;
    }
  };
  return (
    <div className="w-full h-full bg-[#0d1e2b] flex items-center justify-center ">
      <div className="w-11/12 h-[91.5%] bg-[#14293A] rounded-xl border-1 border-gray-700 text-white flex flex-col justify-evenly items-center max-w-[1550px]">
        {" "}
        {renderContent()}
      </div>
    </div>
  );
}
