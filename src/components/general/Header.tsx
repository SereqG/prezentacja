type props = {
  text: string;
};

export const Header = ({ text }: props) => {
  return (
    <div className="w-full text-center my-3">
      <h2 className="font-bold text-5xl text-white">{text}</h2>
    </div>
  );
};
