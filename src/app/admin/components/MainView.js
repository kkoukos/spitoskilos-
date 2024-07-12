"use client";

import UserView from "./UserView";
import ListingView from "./ListingView";

export default function MainView({ view, user }) {
  const renderContent = () => {
    if (view[0]) {
      return <UserView user={user} />;
    }
    if (view[1]) {
      return <ListingView />;
    }
  };
  return <div className="h-[80%] w-[90%]  flex-col">{renderContent()}</div>;
}
