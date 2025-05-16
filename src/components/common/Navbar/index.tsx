"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { User } from "@heroui/user";
import { FaHome, FaBell } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MyNavbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const pathname = usePathname();

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <div className="sticky -top-16 z-40">
      <Navbar
        position="sticky"
        className="-top-16"
        classNames={{
          base: "bg-main px-7 lg:px-20 xl:px-52",
          wrapper: "px-0 max-w-full",
        }}
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden text-white" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarBrand
            className="py-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img
              width={155}
              src="/images/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            />
          </NavbarBrand>
          <NavbarItem>
            <Link href="#" className="text-white">
              Movies
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" className="text-white">
              TV Shows
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" className="text-white">
              People
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" className="text-white">
              More
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-7" justify="end">
          <NavbarItem>
            <IoMdAdd color="white" size={22} className="font-bold" />
          </NavbarItem>
          <NavbarItem className="text-white">
            <span className="text-[12px] p-[5px] border rounded-sm">EN</span>
          </NavbarItem>
          <NavbarItem>
            <FaBell color="white" size={20} />
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <User
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
              name=""
            />
          </NavbarItem>
          <NavbarItem
            className="cursor-pointer"
            onClick={() => router.push("/")}
          >
            <FaHome color="#fff" size={28} />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <div
        className={cn(
          "bg-white flex gap-3 items-center px-7 lg:px-20 xl:px-52 border-b",
          pathname.startsWith("/movie") && "hidden"
        )}
      >
        <HiSearch size={20} />
        <input
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyUp={(e) => {
            if (e.key == "Enter" && searchKey) {
              router.push(`/search/movie?query=${searchKey}`);
            }
          }}
          className="w-full outline-none py-3 italic text-gray-400"
          placeholder="Search for a movie, tv show, Person..."
        />
      </div>
    </div>
  );
}
