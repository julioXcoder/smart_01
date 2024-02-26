import Logo from "./logo";

const Spinner = () => {
  return (
    <div className="fixed flex h-screen w-screen flex-col items-center justify-center gap-y-2">
      <div className="flex items-center gap-x-3">
        <Logo />
      </div>
      <span className="loader h-14 w-14 text-black dark:text-white"></span>
    </div>
  );
};

export default Spinner;
