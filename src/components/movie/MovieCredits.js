import React from "react";
import { tmdbAPI } from "apiConfig/config";
import { MovieMeta } from "./MovieMeta";

const MovieCredits = () => {
  const data = MovieMeta("credits");
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="mb-10 text-3xl text-center">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.splice(0, 4).map((item) => (
          <div className=" cast-item" key={item.id}>
            <h4 className="text-xl h-[60px]">{item.character} </h4>

            <img
              src={tmdbAPI.getMovieImage(item.profile_path)}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg"
            />
            <h3 className="text-xl h-[60px] p-2">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCredits;
