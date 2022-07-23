import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "apiConfig/config";
import Button from "components/button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "./../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  // console.log("MovieCard ~ id", id);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img
        src={tmdbAPI.getMovieImage(poster_path)}
        alt=""
        className="w-full h-[250px]  rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold h-[60px]">{title}</h3>
        <div className="flex items-center justify-between mt-2 mb-10 opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <div className="flex flex-row items-center justify-between gap-2">
            <span>{vote_average}</span>
            <span>
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4"
              >
                <path
                  d="M10 15L4 18L5.5 12L1 7L7.5 6.5L10 1L12.5 6.5L19 7L14.5 12L16 18L10 15Z"
                  fill="#FFEA00"
                  stroke="#FFEA00"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        <Button bgColor="secondary" onClick={() => navigate(`/movies/${id}`)}>
          Watch now
        </Button>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
function FallbackComponent() {
  return <p className="text-red-500 bg-red-50">Something went wrong !</p>;
}
export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <LoadingSkeleton
        width="100%"
        height="250px"
        borderRadius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold h-[60px]">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-10 opacity-50">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <div className="flex flex-row items-center justify-center gap-2">
            <span>
              <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
            </span>
            <span>
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4"
              >
                <path
                  d="M10 15L4 18L5.5 12L1 7L7.5 6.5L10 1L12.5 6.5L19 7L14.5 12L16 18L10 15Z"
                  fill="#FFEA00"
                  stroke="#FFEA00"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        <LoadingSkeleton width="100%" height="40px"></LoadingSkeleton>
      </div>
    </div>
  );
};
