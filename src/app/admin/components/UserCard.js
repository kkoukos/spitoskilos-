import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import React from "react";
import { Avatar } from "@nextui-org/react";

export default function UserCard({ user, selected = false }) {
  return (
    <>
      <div className="h-[10%] w-full flex items-center justify-between rounded-xl bg-[#14293A] px-10">
        <div className="flex w-2/5 justify-between items-center">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            radius="sm"
          />
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>

        <div className="hover:cursor-pointer">
          {!selected && <RadioButtonUnchecked />}
          {selected && <RadioButtonChecked />}
        </div>
      </div>
    </>
  );
}
