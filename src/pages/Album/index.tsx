import React, { FC, useEffect, useState } from 'react';
import './index.css';
import GridHeader, { Tag } from '../../components/GridHeader';
import Grid from '../../components/Grid';
import { AlbumInfo } from '../AlbumDetail';
import { getNewAlbums, getAllNewAlbum } from '../../service';
import { useLocation } from 'react-router';
import PageSelector from '../../components/PageSelector';

interface Props {}

const TAGS: Array<Tag> = [
  {
    id: 0,
    title: '全部',
    target: '?cat=ALL',
  },
  {
    id: 1,
    title: '中国',
    target: '?cat=ZH',
  },
  {
    id: 2,
    title: '欧美',
    target: '?cat=EA',
  },
  {
    id: 3,
    title: '韩国',
    target: '?cat=KR',
  },
  {
    id: 4,
    title: '日本',
    target: '?cat=JP',
  },
];

const Album: FC<Props> = ({}) => {
  const url = useLocation();
  const [newAlbums, setNewAlbums] = useState<Array<AlbumInfo>>();
  const [allAlbums, setAllAlbums] = useState<Array<AlbumInfo>>();
  const [page, setPage] = useState(1);
  const [area, setArea] = useState<string>(() => {
    if (url.search === '') {
      return TAGS[0].title;
    } else {
      return url.search.slice(5);
    }
  });

  const pageSize: number = 35;

  // 热门新碟
  useEffect(() => {
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

  useEffect(() => {
    setArea(url.search.slice(5));
  }, [url]);

  useEffect(() => {
    getAllNewAlbum(area, pageSize, (page - 1) * pageSize).then((res) => {
      if ('albums' in res) {
        console.log(area);

        setAllAlbums(
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
  }, [area, page]);

  return (
    <div
      className='w-full flex justify-center'
      style={{ background: '#f5f5f5' }}
    >
      <div
        className='bg-white'
        style={{
          width: '864px',
        }}
      >
        <div className='h-auto w-full pt-10'>
          <GridHeader
            headline={{
              title: '热门新碟',
              target: '',
            }}
            hasMoreTag={false}
          />
          {!!newAlbums ? (
            <Grid
              playlists={newAlbums!.slice(0, 10)}
              type='album'
            />
          ) : (
            <></>
          )}
        </div>
        <div className='h-auto w-full py-10'>
          <GridHeader
            headline={{
              title: '全部新碟',
              target: '',
            }}
            tags={TAGS}
            hasMoreTag={false}
          />
          {!!allAlbums ? (
            <Grid
              playlists={allAlbums}
              type='album'
            />
          ) : (
            <></>
          )}
        </div>
        <div className='pb-10'>
          <PageSelector
            currPage={page}
            totalPage={20}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Album;
