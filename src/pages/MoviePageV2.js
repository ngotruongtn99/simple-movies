import React, { useState, useEffect } from "react";
import MovieCard, { MovieCardSkeleton } from "components/movie/MovieCard";
import { fetcher, tmdbAPI } from "apiConfig/config";
import useDebounce from "hooks/useDebounce";
import { v4 } from "uuid";
import Button from "components/button/Button";
import useSWRInfinite from "swr/infinite";

const itemsPerPage = 20;
const MoviePageV2 = () => {
  const [pageMovies, setPageMovies] = useState(1);
  const [filter, setFilter] = useState("");
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const filterDebounce = useDebounce(filter, 500);
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", pageMovies));

  // console.log("MoviePage ~ data", data);
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];

  const loading = !data && !error;
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, pageMovies));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", pageMovies));
    }
  }, [filterDebounce, pageMovies]);
  return (
    <div className="py-10 page-container">
      <div className="flex gap-3 mb-10">
        <div className="flex-1 ">
          <input
            type="text"
            className="w-full p-4 text-white rounded-lg outline-none bg-slate-800"
            placeholder="Type here to search"
            onChange={handleFilter}
          />
        </div>
        <button className="p-4 text-white rounded-lg bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin "></div>
      )}
       */}
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10 text-center">
        <Button
          onClick={() => setSize(size + 1)}
          className={isReachingEnd ? "hidden" : ""}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default MoviePageV2;
