import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getArtist, getArtistAlbums, getArtistDescription } from '../../service';
import { Track, TracksContext } from '../Layout';
import ArtistAlbum from './ArtistAlbum';
import ArtistDescription, { Iintroduction } from './ArtistDescription';
import ArtistHot50 from './ArtistHot50';
import './index.css';
import { PlaylistInfo } from '../../components/Grid';
import { AxiosResponse } from 'axios';

export interface BasisInfo {
  id: number;
  name: string;
}

export interface ArtistInfo {
  id: number;
  name: string;
  picUrl: string;
}

export interface RawArtistInfo {
  id: number;
  name: string;
  img1v1Url: string;
}

export interface RawSongInfo {
  id: number;
  name: string;
  ar: [{ id: number; name: string }];
  al: { id: number; name: string; picUrl: string };
}

interface Props {}

const ArtistDetail: FC<Props> = ({}) => {
  const { artistId } = useParams();
  const [navItem, setNavItem] = useState<number>(0);
  const { tracks, setTracks, setTrackIndex } = useContext(TracksContext);

  const [hot50, setHot50] = useState<Array<Track>>([]);
  const [artistInfo, setArtistInfo] = useState<ArtistInfo>();
  const [albums, setAlbums] = useState<Array<PlaylistInfo>>([]);
  const [page, setPage] = useState<number>(1);
  const [introduction, setIntroduction] = useState<Iintroduction>();
  const [albumSize, setAlbumSize] = useState(0);

  const pageSize = 30;

  const addAllSong = () => {
    let allNewTracks: Array<Track> = [];
    hot50?.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks([...tracks, ...allNewTracks]);
    // setTracks(tracks.concat(allNewTracks));
  };

  const playAllSong = () => {
    let allNewTracks: Array<Track> = [];
    hot50?.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks(allNewTracks);
    setTrackIndex(0);
  };

  // hot50
  useEffect(() => {
    getArtist(artistId!).then((res: AxiosResponse) => {
      // @ts-ignore
      setAlbumSize(res.artist.albumSize);
      const info = ('artist' in res ? res.artist : {}) as RawArtistInfo;
      const songs = ('hotSongs' in res ? res.hotSongs : [{}]) as RawSongInfo[];
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
    getArtistAlbums(artistId!, pageSize, (page - 1) * pageSize).then((res) => {
      // @ts-ignore
      const data = res.hotAlbums;
      console.log('albums', data);

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
    getArtistDescription(artistId!).then((res) => {
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
    <div className='artist-detail'>
      <div className='content-artist flex flex-col pt-8 bg-white px-8'>
        {!!artistInfo ? (
          <>
            <div className='artist-name text-3xl py-3 px-1'>{artistInfo.name}</div>
            <div className='artist-img rounded-t-lg w-full h-96'>
              <img
                className='object-cover w-full h-full rounded-t-lg'
                src={artistInfo.picUrl}
              ></img>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className='navbars flex items-center w-full h-12 rounded-b-lg '>
          <Link
            to=''
            className={`min-w-fit h-12 pt-3 px-6 rounded-b-lg hover:bg-white hover:border-t-2 hover:border-red-600 ${
              navItem === 0 ? 'border-t-2 border-red-600' : ''
            }`}
            onClick={() => {
              setNavItem(0);
            }}
          >
            热门作品
          </Link>
          <Link
            to=''
            className={`min-w-fit h-12 pt-3 px-6 rounded-b-lg hover:bg-white hover:border-t-2 hover:border-red-600 ${
              navItem === 1 ? 'border-t-2 border-red-600' : ''
            }`}
            onClick={() => {
              setNavItem(1);
            }}
          >
            所有专辑
          </Link>
          <Link
            to=''
            className={`min-w-fit h-12 pt-3 px-6 rounded-b-lg hover:bg-white hover:border-t-2 hover:border-red-600 ${
              navItem === 2 ? 'border-t-2 border-red-600' : ''
            }`}
            onClick={() => {
              setNavItem(2);
            }}
          >
            艺人介绍
          </Link>
        </div>
        <div className='pb-12'>
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
