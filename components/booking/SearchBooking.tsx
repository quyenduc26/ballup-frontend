    "use client";

    import Link from "next/link";
    import SearchBar from "../search/searchPage";


    const SearchBooking = () => {

        return (
            <div className="container mx-auto max-w-[1400px] h-[1   00px] px-4">

                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 p-4">
                    <Link
                        href="/bookingPage/oursport"
                        className="text-lg md:text-2xl font-semibold text-black hover:text-blue-500 transition-all hover:underline"
                    >
                        OUR SPORTS
                    </Link>

                </div>
                <SearchBar/>

            </div>
        );
    };

    export default SearchBooking;
