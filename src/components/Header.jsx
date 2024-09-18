const Header = ({ step }) => {
  return (
    <div>
      {step === 1 && <div className="w-[32%] h-[3px] bg-[#E6692E]"></div>}
      {step === 2 && (
        <div className="flex">
          <div className="w-[32%] h-[3px] bg-[#E6692E]"></div>
          <div className="w-[1%]"></div>
          <div className="w-[32%] h-[3px] bg-[#E6692E]"></div>
        </div>
      )}
      {step === 3 && (
        <div className="flex">
          <div className="w-[32%] h-[3px] bg-[#E6692E]"></div>
          <div className="w-[1%]"></div>
          <div className="w-[32%] h-[3px] bg-[#E6692E]"></div>
          <div className="w-[1%]"></div>
          <div className="w-[33%] h-[3px] bg-[#E6692E]"></div>
        </div>
      )}
    </div>
  );
};
export default Header;
