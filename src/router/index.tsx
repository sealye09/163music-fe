import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Discover = lazy(() => import("../pages/Discover"));
const Layout = lazy(() => import("../pages/Layout"));
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

const Router = () => {
  return (
    <Suspense
      fallback={
        <div className="h-96 flex flex-row justify-center items-center">
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Navigate
                to="/discover"
                replace
              />
            }
          />
          <Route
            path="/discover"
            element={<Discover />}
          />
          <Route
            path="/discover/playlist"
            element={<Playlist />}
          />
          <Route
            path="/discover/artist"
            element={<Artist />}
          />
          <Route
            path="/discover/album"
            element={<Album />}
          />

          <Route
            path="/mymusic"
            element={<MyMusic />}
          />
          <Route
            path="/search"
            element={<Search />}
          />
          <Route
            path="/playlist/:playlistId"
            element={<PlaylistDetail />}
          />
          <Route
            path="/song/:songId"
            element={<SongDetail />}
          />
          <Route
            path="/album/:albumId"
            element={<AlbumDetail />}
          />
          <Route
            path="/artist/:artistId"
            element={<ArtistDetail />}
          />
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
