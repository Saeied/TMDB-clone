interface FooterItemProps {
  h3: string;
  texts: string[];
}

export default function FooterItem({ h3, texts }: FooterItemProps) {
  return (
    <div>
      <h3 className="text-[19px] font-[700] text-center sm:text-start">{h3.toUpperCase()}</h3>
      <ul className="text-[16px] flex flex-col items-center sm:items-start">
        {texts.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
}
