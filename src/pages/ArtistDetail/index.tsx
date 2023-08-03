import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { ArtistInfo, Introduction, PlaylistInfo, RawArtistInfo, RawSongInfo, Track } from "@/types";
import useAudioStore from "@/stores/useAudioStore";
import { artistApi } from "@/service";

import Description from "./Description";
import Hot50 from "./Hot50";
import Albums from "./Albums";

interface Props {}

const ArtistDetail: FC<Props> = ({}) => {
  const { artistId } = useParams();
  const [navItem, setNavItem] = useState<number>(0);

  const tracks = useAudioStore((state) => state.tracks);
  const setTracks = useAudioStore((state) => state.setTracks);
  const setTrackIndex = useAudioStore((state) => state.setTrackIndex);

  const [hot50, setHot50] = useState<Track[]>([]);
  const [artistInfo, setArtistInfo] = useState<ArtistInfo>();
  const [albums, setAlbums] = useState<PlaylistInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [introduction, setIntroduction] = useState<Introduction>();
  const [albumSize, setAlbumSize] = useState(0);

  const pageSize = 30;

  const addAllSong = () => {
    let allNewTracks: Track[] = [];
    hot50.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks([...tracks, ...allNewTracks]);
  };

  const playAllSong = () => {
    let allNewTracks: Track[] = [];
    hot50.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks(allNewTracks);
    setTrackIndex(0);
  };

  // hot50
  useEffect(() => {
    artistApi.getArtist(artistId!).then((res) => {
      console.log("🚀 ~ file: index.tsx:54 ~ artistApi.getArtist ~ res:", res);

      // @ts-ignore
      setAlbumSize(res.artist.albumSize);
      // @ts-ignore
      const info = res.artist;
      // @ts-ignore
      const songs = res.hotSongs;
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
            coverImgUrl: album.picUrl,
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
    <div className="bg-[#f5f5f5]">
      <div className="flex flex-col pt-8 w-[874px] bg-white px-8 mx-auto border-x border-[#d5d5d5]">
        {!!artistInfo && (
          <>
            <div className="artist-name text-3xl py-3 px-1">{artistInfo.name}</div>
            <div className="rounded-t-lg w-full h-96 border border-[#d5d5d5]">
              <img
                className="object-cover w-full h-full rounded-t-lg"
                src={artistInfo.picUrl}
              />
            </div>
          </>
        )}

        <div className="flex items-center w-full h-12 rounded-b-lg border border-[#d5d5d5] bg-[#f7f7f7]">
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
            <Hot50
              playAllSong={playAllSong}
              addAllSong={addAllSong}
              hot50={hot50!}
            />
          ) : navItem === 1 && albums.length !== 0 ? (
            <Albums
              albums={albums}
              page={page}
              pageSize={pageSize}
              setPage={setPage}
              albumSize={albumSize}
            />
          ) : navItem === 2 && !!introduction ? (
            <Description
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
