"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { FaCaretDown } from "react-icons/fa";

export default function CustomDropdown({
  btnText,
  itemsTexts,
}: {
  btnText: string;
  itemsTexts: string[];
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="data-[hover=true]:bg-transparent" variant="light">
          {btnText} <FaCaretDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {itemsTexts.map((item) => (
          <DropdownItem key={item}>{item}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
