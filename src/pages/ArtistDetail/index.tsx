import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";

import { ArtistInfo, Introduction, PlaylistInfo, RawArtistInfo, RawSongInfo, Track } from "@/types";
import useTrackStore from "@/stores/useTrackStore";
import { artistApi } from "@/service";

import ArtistDescription from "./ArtistDescription";
import ArtistHot50 from "./ArtistHot50";
import ArtistAlbum from "./ArtistAlbum";

import "./index.css";

interface Props {}

const ArtistDetail: FC<Props> = ({}) => {
  const { artistId } = useParams();
  const [navItem, setNavItem] = useState<number>(0);

  const tracks = useTrackStore((state) => state.tracks);
  const setTracks = useTrackStore((state) => state.setTracks);
  const setTrackIndex = useTrackStore((state) => state.setTrackIndex);

  const [hot50, setHot50] = useState<Track[]>([]);
  const [artistInfo, setArtistInfo] = useState<ArtistInfo>();
  const [albums, setAlbums] = useState<PlaylistInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [introduction, setIntroduction] = useState<Introduction>();
  const [albumSize, setAlbumSize] = useState(0);

  const pageSize = 30;

  const addAllSong = () => {
    let allNewTracks: Track[] = [];
    hot50?.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks([...tracks, ...allNewTracks]);
  };

  const playAllSong = () => {
    let allNewTracks: Track[] = [];
    hot50?.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks(allNewTracks);
    setTrackIndex(0);
  };

  // hot50
  useEffect(() => {
    artistApi.getArtist(artistId!).then((res: AxiosResponse) => {
      // @ts-ignore
      setAlbumSize(res.artist.albumSize);
      const info = ("artist" in res ? res.artist : {}) as RawArtistInfo;
      const songs = ("hotSongs" in res ? res.hotSongs : [{}]) as RawSongInfo[];
      setArtistInfo({
        name: info.name,
        id: info.id,
        picUrl: info.img1v1Url,
      });
      const temp = [];
      for (let i = 0; i < songs.length; i++) {
        temp.push({
          song: {
            name: songs[i].name,
            id: songs[i].id,
          },
          artist: {
            id: songs[i].ar[0].id,
            name: songs[i].ar[0].name,
          },
          album: {
            id: songs[i].al.id,
            name: songs[i].al.name,
            picUrl: songs[i].al.picUrl,
          },
        });
      }

      console.log(artistInfo);

      setHot50([...temp]);
    });
  }, [artistId]);

  // albums
  useEffect(() => {
    artistApi.getArtistAlbums(artistId!, pageSize, (page - 1) * pageSize).then((res) => {
      // @ts-ignore
      const data = res.hotAlbums;
      console.log("albums", data);

      setAlbums(() =>
        data.map((album: any) => {
          return {
            id: album.id,
            name: album.name,
            picUrl: album.picUrl,
          };
        })
      );
    });
  }, [artistId, page]);

  // description
  useEffect(() => {
    artistApi.getArtistDescription(artistId!).then((res) => {
      setIntroduction(() => {
        return {
          // @ts-ignore
          desc: res.briefDesc,
          // @ts-ignore
          introduction: res.introduction.map((item: any) => {
            return {
              title: item.ti,
              content: item.txt,
            };
          }),
        };
      });
    });
  }, [artistId]);

  return (
    <div className="artist-detail">
      <div className="content-artist flex flex-col pt-8 bg-white px-8">
        {!!artistInfo && (
          <>
            <div className="artist-name text-3xl py-3 px-1">{artistInfo.name}</div>
            <div className="artist-img rounded-t-lg w-full h-96">
              <img
                className="object-cover w-full h-full rounded-t-lg"
                src={artistInfo.picUrl}
              />
            </div>
          </>
        )}

        <div className="navbars flex items-center w-full h-12 rounded-b-lg ">
          <Link
            to=""
            className={`min-w-fit h-12 pt-3 px-6 rounded-b-lg hover:bg-white hover:border-t-2 hover:border-red-600 ${
              navItem === 0 ? "border-t-2 border-red-600" : ""
            }`}
            onClick={() => {
              setNavItem(0);
            }}
          >
            热门作品
          </Link>
          <Link
            to=""
            className={`min-w-fit h-12 pt-3 px-6 rounded-b-lg hover:bg-white hover:border-t-2 hover:border-red-600 ${
              navItem === 1 ? "border-t-2 border-red-600" : ""
            }`}
            onClick={() => {
              setNavItem(1);
            }}
          >
            所有专辑
          </Link>
          <Link
            to=""
            className={`min-w-fit h-12 pt-3 px-6 rounded-b-lg hover:bg-white hover:border-t-2 hover:border-red-600 ${
              navItem === 2 ? "border-t-2 border-red-600" : ""
            }`}
            onClick={() => {
              setNavItem(2);
            }}
          >
            艺人介绍
          </Link>
        </div>
        <div className="pb-12">
          {navItem === 0 && hot50.length !== 0 ? (
            <ArtistHot50
              playAllSong={playAllSong}
              addAllSong={addAllSong}
              hot50={hot50!}
            />
          ) : navItem === 1 && albums.length !== 0 ? (
            <ArtistAlbum
              albums={albums}
              page={page}
              pageSize={pageSize}
              setPage={setPage}
              albumSize={albumSize}
            />
          ) : navItem === 2 && !!introduction ? (
            <ArtistDescription
              introduction={{
                desc: introduction.desc,
                introduction: introduction.introduction,
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
