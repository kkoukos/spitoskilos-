import SearchFull from "../components/SearchFull";

export default function Hero() {
  return (
    <>
      <div className="flex items-center flex-col w-full h-screen text-primary-text">
        <div className="w-full bg-dog-back h-4/5 bg-no-repeat bg-cover bg-right-bottom flex flex-col items-center justify-between">
          <div className="flex items-center flex-col w-full h-full justify-center text-4xl gap-12">
            <h2>Search, Discover, Find Your Dream Home</h2>
            <SearchFull></SearchFull>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col w-full h-screen text-primary-text"></div>
    </>
  );
}
