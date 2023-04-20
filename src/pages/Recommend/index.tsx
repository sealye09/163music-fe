import { lazy, useEffect, useState } from 'react';
import GridHeader, { Tag } from '../../components/GridHeader';
import Grid from '../../components/Grid';
import { getNewAlbums, getRecommendPlaylist } from '../../service';

import './index.css';

const Banner = lazy(() => import('../../components/Banner'));

type PlaylistInfo = {
  id: number;
  type: number;
  name: string;
  picUrl: string;
};

type AlbumInfo = PlaylistInfo;

interface Props {}

// 推荐页包含组件（轮播图、热门推荐、新碟上架、榜单）

const Recommend = (props: Props) => {
  const playlistTags: Array<Tag> = [
    {
      id: 0,
      title: '华语',
      target: '/discover/playlist/?cat=%E5%8D%8E%E8%AF%AD',
    },
    {
      id: 1,
      title: '流行',
      target: '/discover/playlist/?cat=%E6%B5%81%E8%A1%8C',
    },
    {
      id: 2,
      title: '摇滚',
      target: '/discover/playlist/?cat=%E6%91%87%E6%BB%9A',
    },
    {
      id: 3,
      title: '民谣',
      target: '/discover/playlist/?cat=%E6%B0%91%E8%B0%A3',
    },
    {
      id: 4,
      title: '电子',
      target: '/discover/playlist/?cat=%E7%94%B5%E5%AD%90',
    },
    {
      id: 5,
      title: '古典',
      target: '/discover/playlist/?cat=%E5%8F%A4%E5%85%B8',
    },
    {
      id: 6,
      title: '金属',
      target: '/discover/playlist/?cat=%E9%87%91%E5%B1%9E',
    },
    {
      id: 7,
      title: '说唱',
      target: '/discover/playlist/?cat=%E8%AF%B4%E5%94%B1',
    },
  ];

  const [playlistRec, setPlaylistRec] = useState<Array<PlaylistInfo>>();
  const [newAlbums, setNewAlbums] = useState<Array<AlbumInfo>>();

  useEffect(() => {
    // 获取推荐
    getRecommendPlaylist(10).then((res) => {
      setPlaylistRec(
        // @ts-ignore
        res.result.map((item) => {
          return {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
          };
        })
      );
    });
    // 获取新碟
    getNewAlbums().then((res) => {
      if ('albums' in res) {
        setNewAlbums(
          // @ts-ignore
          res.albums.map((item) => {
            return {
              id: item.id,
              name: item.name,
              picUrl: item.picUrl,
            };
          })
        );
      }
    });
  }, []);

  return (
    <div className='recommend'>
      <Banner />
      <div className='recommend-2 h-auto w-full'>
        <div className='rec-list flex flex-col justify-cente items-center h-auto min-w-fit'>
          <div className='recommend-item h-auto w-full py-6'>
            <GridHeader
              headline={{
                title: '热门推荐',
                target: '/discover/playlist/',
              }}
              tags={playlistTags}
              hasMoreTag={true}
            />
            {!!playlistRec ? (
              <Grid
                playlists={playlistRec}
                type='playlist'
              />
            ) : (
              <></>
            )}
          </div>
          <div className='recommend-item h-auto w-full py-6'>
            <GridHeader
              headline={{
                title: '新碟上架',
                target: '/discover/album/',
              }}
              hasMoreTag={true}
            />
            {!!newAlbums ? (
              <Grid
                playlists={newAlbums.slice(0, 10)}
                type='album'
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
