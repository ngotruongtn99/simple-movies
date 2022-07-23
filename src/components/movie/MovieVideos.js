import React from "react";
import { MovieMeta } from "./MovieMeta";

const MovieVideos = () => {
  const data = MovieMeta("videos");
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.splice(0, 2).map((item) => (
          <div key={item.id}>
            <h3 className="inline-block p-3 mb-5 text-xl font-medium bg-[#6f5cf1]">
              {item.name}
            </h3>
            <div className="w-full aspect-video">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="object-fill w-full h-full"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieVideos;
