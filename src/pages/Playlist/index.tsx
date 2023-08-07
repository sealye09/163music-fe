import { FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import { PlaylistInfo } from "@/types";
import { playlistApi } from "@/service";
import Grid from "@/components/Grid";
import GridSkeleton from "@/components/Skeleton/GridSkeleton";
import Pagination from "@/components/Pagination";

import DroupDown from "./DroupDown";

export type Category = {
  id: number;
  name: string;
};

export type SubCategory = Category & {
  category: number;
  hot: boolean;
};

const Playlist: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const droupDownRef = useRef<HTMLDivElement>(null);

  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [subCategories, setSubCategories] = useState<SubCategory[]>();
  const [isShowDroupDown, setIsShowDroupDown] = useState<boolean>(false);

  const [total, setTotal] = useState<number>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const page = Number(searchParams.get("page") || "1");
  const cat = searchParams.get("cat") || "全部";
  const order = searchParams.get("order") || "hot";

  const pageSize: number = 35;

  // 获取歌单分类
  useEffect(() => {
    let isUnmounted = false;
    if (isUnmounted) return;

    playlistApi.getCatlist().then((res: any) => {
      console.log("catlist", res);
      let cats = res.categories;
      let subs = res.sub;
      setCategories(() => {
        return Object.keys(cats).map((key: string) => {
          return {
            id: Number(key),
            name: cats[key],
          };
        });
      });

      setSubCategories(() =>
        subs.map((sub: any, idx: number) => {
          return {
            id: idx,
            name: sub.name,
            hot: sub.hot,
            category: sub.category,
          };
        })
      );
    });

    return () => {
      isUnmounted = true;
    };
  }, []);

  // 获取歌单列表
  useEffect(() => {
    let isUnmounted = false;
    setLoading(true);

    if (isUnmounted) return;

    playlistApi.getPlaylist(order, cat, pageSize, pageSize * (page - 1)).then((res) => {
      console.log("playlist", res);
      if ("total" in res && Boolean(res.total)) {
        setTotal(res.total as number);
      }

      if ("more" in res && Boolean(res.more)) {
        setHasMore(res.more as boolean);
      }

      if ("playlists" in res && Boolean(res.playlists)) {
        setPlaylistInfo(
          // @ts-ignore
          res.playlists.map((item) => {
            return {
              name: item.name,
              id: item.id,
              coverImgUrl: item.coverImgUrl,
            };
          })
        );
      }

      setLoading(false);
    });

    return () => {
      isUnmounted = true;
    };
  }, [page, cat, order]);

  // 外侧点击关闭下拉框
  useEffect(() => {
    const closeDroupDown = (event: Event) => {
      if (droupDownRef.current && !droupDownRef.current.contains(event.target as Node)) {
        setIsShowDroupDown(false);
      }
    };

    document.addEventListener("click", closeDroupDown);

    return () => {
      document.removeEventListener("click", closeDroupDown);
    };
  }, []);

  return (
    <div className="flex justify-center bg-gray1 border-y border-gray1">
      <div className="bg-white min-w-fit w-content border-x border-gray1">
        <div className="py-10">
          <div className="w-full h-auto flex px-6 min-w-fit border-b-2 border-red-700">
            <div className="flex min-w-fit justify-start items-center">
              <div className="icon">
                <BsMusicNoteBeamed
                  size={20}
                  className="text-red-600"
                />
              </div>

              <div
                ref={droupDownRef}
                className="relative transition-all duration-300"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setIsShowDroupDown(!isShowDroupDown)}
                >
                  <span className="px-3 text-xl min-w-fit">{cat}</span>
                  <span>👇</span>
                </div>

                {isShowDroupDown ? (
                  <div
                    className={twMerge(
                      "transition-all duration-300",
                      `absolute w-full h-full top-8`,
                      isShowDroupDown ? "opacity-100 z-40" : "opacity-0 z-0"
                    )}
                  >
                    <DroupDown
                      categeories={categories ? categories : []}
                      subCategories={subCategories ? subCategories : []}
                      setIsShowDroupDown={setIsShowDroupDown}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {playlistInfo && !loading ? (
            <Grid
              type={"playlist"}
              playlists={playlistInfo}
            />
          ) : (
            <GridSkeleton
              rows={7}
              columns={5}
            />
          )}
          {page && total && total > pageSize && (
            <Pagination
              currPage={page}
              totalPage={Math.ceil(total / pageSize)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
