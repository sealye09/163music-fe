import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "@/Layout";
import Discover from "@/pages/Discover";
import Playlist from "@/pages/Playlist";
import Artist from "@/pages/Artist";
import Album from "@/pages/Album";
import MyMusic from "@/pages/MyMusic";
import Search from "@/pages/Search";

import Loading from "@/components/Loading";
import NotFound from "@/pages/NotFound";

const PlaylistDetail = lazy(() => import("@/pages/PlaylistDetail"));
const SongDetail = lazy(() => import("@/pages/SongDetail"));
const ArtistDetail = lazy(() => import("@/pages/ArtistDetail"));
const AlbumDetail = lazy(() => import("@/pages/AlbumDetail"));

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
