import { fetcher, tmdbAPI } from "apiConfig/config";
import { useParams } from "react-router-dom";
import useSWR from "swr";

export function MovieMeta(type) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);

  return data;
}
