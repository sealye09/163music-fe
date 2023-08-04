import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { ArtistInfo, Track } from "@/types";
import { artistApi } from "@/service";

import Description from "./Description";
import Hot50 from "./Hot50";
import Albums from "./Albums";

const TabsConfig = [
  {
    id: 0,
    title: "热门50",
    query: "hot50",
    to: "?tab=hot50",
  },
  {
    id: 1,
    title: "专辑",
    query: "albums",
    to: "?tab=albums",
  },
  {
    id: 2,
    title: "艺人介绍",
    query: "description",
    to: "?tab=description",
  },
];

const ArtistDetail: FC = () => {
  const { artistId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTabId, setActiveTabId] = useState<number>(0);

  const [hot50, setHot50] = useState<Track[]>([]);
  const [artistInfo, setArtistInfo] = useState<ArtistInfo>();
  const [albumSize, setAlbumSize] = useState(0);

  useEffect(() => {
    const tab = searchParams.get("tab") || "hot50";
    for (let i = 0; i < TabsConfig.length; i++) {
      if (TabsConfig[i].query === tab) {
        setActiveTabId(TabsConfig[i].id);
        break;
      }
    }
  }, [searchParams]);

  // hot50
  useEffect(() => {
    let isUnmounted = false;
    if (isUnmounted) return;

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

    return () => {
      isUnmounted = true;
    };
  }, [artistId]);

  if (!artistId) return null;

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
          {TabsConfig.map((tab) => (
            <Link
              key={tab.id}
              to={tab.to}
              className={twMerge(
                "min-w-fit h-12 pt-3 px-6 rounded-b-lg hover:bg-white hover:border-t-2 hover:border-red-600",
                activeTabId === tab.id ? "border-t-2 border-red-600" : ""
              )}
            >
              {tab.title}
            </Link>
          ))}
        </div>

        <div className="pb-12">
          {activeTabId === 0 && hot50.length !== 0 ? <Hot50 hot50={hot50!} /> : null}
          {activeTabId === 1 ? (
            <Albums
              artistId={artistId}
              totalAlbums={albumSize}
            />
          ) : null}
          {activeTabId === 2 ? <Description artistId={artistId} /> : null}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
