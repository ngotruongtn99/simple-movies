import React from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import Button from "components/button/Button";

const BannerItems = ({ item }) => {
  const { title, poster_path, id } = item;
  const { data } = useSWR(tmdbAPI.getMovieDetail(id), fetcher);
  const navigate = useNavigate();
  const genres = data?.genres || [];
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={tmdbAPI.getMovieImage(poster_path)}
        alt=""
        className="w-full h-full rounded-lg "
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>
        {genres.length > 0 && (
          <div className="flex mb-8 items-centers gap-x-3">
            {genres.map((item) => (
              <span
                key={item.id}
                className="px-4 py-2 border border-white rounded-md"
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
        <Button bgColor="primary" onClick={() => navigate(`/movies/${id}`)}>
          Watch now
        </Button>
      </div>
    </div>
  );
};

export default BannerItems;
