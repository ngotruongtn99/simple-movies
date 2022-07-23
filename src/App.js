import { Fragment, lazy, Suspense } from "react";
import "swiper/scss";
import { Route, Routes } from "react-router";
import Main from "components/layout/Main";
// import HomePage from "pages/HomePage";
import Banner from "components/banner/Banner";
import ErrorPage from "pages/ErrorPage";
// import MoviePage from "pages/MoviePage";
// import MovieDetailPage from "pages/MovieDetailPage";

const HomePage = lazy(() => import("pages/HomePage"));
const MoviePageV2 = lazy(() => import("pages/MoviePageV2"));
const MoviePage = lazy(() => import("pages/MoviePage"));
const MovieDetailPage = lazy(() => import("pages/MovieDetailPage"));
function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
