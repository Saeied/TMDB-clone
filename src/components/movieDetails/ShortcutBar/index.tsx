import CustomDropdown from "./CustomDropdown";

export default function ShortcutBar() {
  return (
    <div className="hidden sm:flex justify-center">
      <CustomDropdown
        btnText="Overview"
        itemsTexts={[
          "Main",
          "Alternative Titles",
          "Cast & Crew",
          "Release Dates",
          "Translations",
        ]}
      />
      <CustomDropdown
        btnText="Media"
        itemsTexts={["Backdrops", "Logos", "Posters", "Videos"]}
      />
      <CustomDropdown
        btnText="Fandom"
        itemsTexts={["Discussions", "Reviews"]}
      />
      <CustomDropdown
        btnText="Share"
        itemsTexts={["Share Link", "Facebook", "Tweet"]}
      />
    </div>
  );
}
