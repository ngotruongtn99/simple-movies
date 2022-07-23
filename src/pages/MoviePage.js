import React, { useState, useEffect } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "components/movie/MovieCard";
import { fetcher, tmdbAPI } from "apiConfig/config";
import useDebounce from "hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";

const itemsPerPage = 20;
const MoviePage = () => {
  const [pageMovies, setPageMovies] = useState(1);
  const [filter, setFilter] = useState("");
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const filterDebounce = useDebounce(filter, 500);
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", pageMovies));
  const { data, error } = useSWR(url, fetcher);
  // console.log("MoviePage ~ data", data);

  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, pageMovies));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", pageMovies));
    }
  }, [filterDebounce, pageMovies]);
  const movies = data?.results || [];
  // const { page, totalPage } = data;
  // We start with an empty list of items.
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    // Fetch items from another resources.
    if (!data || !data.total_pages) return;
    setPageCount(Math.ceil(data.total_pages));
  }, [data, itemOffset]);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_pages;
    setItemOffset(newOffset);
    setPageMovies(event.selected + 1);
  };
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

      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;
