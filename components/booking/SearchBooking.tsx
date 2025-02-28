    "use client";

    import Link from "next/link";
    import SearchBar from "../search/searchPage";


    const SearchBooking = () => {

        return (
            <div className="container mx-auto max-w-[1400px] h-[1   00px] px-4">

                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 p-4">
                    <Link
                        href="/teamPage/explore"
                        className="text-lg md:text-2xl font-semibold text-black hover:text-blue-500 transition-all hover:underline"
                    >
                        EXPLORE
                    </Link>
                    <Link
                        href="/teamPage/team"
                        className="text-lg md:text-2xl font-semibold text-black hover:text-blue-500 transition-all hover:underline"
                    >
                        MY TEAM
                    </Link>
                </div>
                <SearchBar/>

            </div>
        );
    };

    export default SearchBooking;
