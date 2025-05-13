import Image from "next/image";
import FooterItem from "./FooterItem";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-main text-white flex flex-col sm:flex-row justify-center items-center sm:items-start gap-10 py-20">
      <div id="kroos" className="flex flex-col items-center gap-8">
        <Image
          width={130}
          height={93}
          src="/images/landing/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="tmdb svg"
        />
        <Link
          className="bg-white text-[#01B4E4] py-3 mx-2 text-center rounded-lg font-bold"
          href="#"
        >
          Hi Saeed
        </Link>
      </div>
      <FooterItem
        h3="The Basics"
        texts={[
          "About TMDB",
          "Contact Us",
          "Support Forums",
          "API Documentation",
          "System Status",
        ]}
      />
      <FooterItem
        h3="Get Involved"
        texts={["Contribution Bible", "Add New Movie", "Add New TV Show"]}
      />
      <FooterItem
        h3="Community"
        texts={["Guidelines", "Discussions", "Leaderboard"]}
      />
      <FooterItem
        h3="Legal"
        texts={[
          "Terms of Use",
          "API Terms of Use",
          "Privacy Policy",
          "DMCA Policy",
        ]}
      />
    </footer>
  );
}
