import { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Discover = lazy(() => import("../pages/Discover"));
const Layout = lazy(() => import("../pages/Layout"));
const Recommend = lazy(() => import("../pages/Recommend"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Loading = lazy(() => import("../components/Loading"));
const PlaylistDetail = lazy(() => import("../pages/PlaylistDetail"));
const SongDetail = lazy(() => import("../pages/SongDetail"));
const ArtistDetail = lazy(() => import("../pages/ArtistDetail"));
const Playlist = lazy(() => import("../pages/Playlist"));
const Artist = lazy(() => import("../pages/Artist"));
const Album = lazy(() => import("../pages/Album"));
const AlbumDetail = lazy(() => import("../pages/AlbumDetail"));
const MyMusic = lazy(() => import("../pages/MyMusic"));
const Search = lazy(() => import("../pages/Search"));
interface Props {}

const Router: FC<Props> = ({}) => {
  return (
    <Suspense
      fallback={
        <div className=" h-96 flex flex-row justify-center items-center">
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route element={<Discover />}>
            <Route
              path=""
              element={<Recommend />}
            ></Route>
            <Route
              path="/discover/playlist"
              element={<Playlist />}
            ></Route>
            <Route
              path="/discover/artist"
              element={<Artist />}
            ></Route>
            <Route
              path="/discover/album"
              element={<Album />}
            ></Route>
          </Route>

          <Route
            path="/mymusic"
            element={<MyMusic />}
          ></Route>

          <Route
            path="/search"
            element={<Search />}
          ></Route>

          <Route
            path="/playlist/:playlistId"
            element={<PlaylistDetail />}
          ></Route>
          <Route
            path="/song/:songId"
            element={<SongDetail />}
          ></Route>
          <Route
            path="/album/:albumId"
            element={<AlbumDetail />}
          ></Route>
          <Route
            path="/artist/:artistId"
            element={<ArtistDetail />}
          ></Route>

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
