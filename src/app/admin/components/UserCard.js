import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import React from "react";
import { Avatar } from "@nextui-org/react";

export default function UserCard({
  user,
  selected = false,
  index,
  setSelectedNum,
  key,
}) {
  const handleSelection = () => {
    console.log(index);
    setSelectedNum(index); // Update selectedNum with the current index
  };
  return (
    <>
      <div
        className="h-[10%] w-full flex items-center justify-between rounded-xl bg-[#14293A] px-10"
        key={key}
      >
        <div className="flex w-[50%] justify-between items-center">
          <Avatar
            src={user.profile_picture}
            radius="sm"
            className="max-w-1/5"
          />
          <div className="w-2/5">{user.username}</div>
          <div className="w-2/5">{user.email}</div>
        </div>

        <div className="hover:cursor-pointer" onClick={handleSelection}>
          {!selected && <RadioButtonUnchecked />}
          {selected && <RadioButtonChecked />}
        </div>
      </div>
    </>
  );
}
