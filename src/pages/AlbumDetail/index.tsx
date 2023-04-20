import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import TrackList from '../../components/TrackList';
import { getAlbum } from '../../service';
import { Track, TracksContext } from '../Layout';
import './index.css';

export interface AlbumInfo {
  id: number;
  name: string;
  picUrl: string;
  description: string;
  artist: {
    id: number;
    name: string;
  };
}

export interface RawAlbumInfo {
  id: number;
  name: string;
  picUrl: string;
  description: string;
  artists: Array<{ id: number; name: string }>;
}

interface Props {}

const AlbumDetail: FC<Props> = ({}) => {
  const { albumId } = useParams();
  const { tracks, setTracks, trackIndex, setTrackIndex } = useContext(TracksContext);

  const [albumInfo, serAlbumInfo] = useState<AlbumInfo>();
  const [songDetail, setSongDetail] = useState<Array<Track>>();

  const addAllSong = () => {
    let allNewTracks: Array<Track> = [];
    songDetail?.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks([...tracks, ...allNewTracks]);
  };

  const playAllSong = () => {
    let allNewTracks: Array<Track> = [];
    songDetail?.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks(allNewTracks);
    setTrackIndex(0);
  };

  useEffect(() => {
    getAlbum(albumId!).then((res) => {
      const songs = ('songs' in res ? res.songs : [{}]) as [{}];
      const album = ('album' in res ? res.album : [{}]) as RawAlbumInfo;

      const albumSongs = songs.map((song: any) => {
        return {
          song: {
            id: song.id,
            name: song.name,
          },
          artist: {
            id: song.ar[0].id,
            name: song.ar[0].name,
          },
          album: {
            id: song.al.id,
            name: song.al.name,
            picUrl: song.al.picUrl,
          },
        };
      });

      setSongDetail(albumSongs);
      serAlbumInfo({
        id: album.id as number,
        name: album.name,
        picUrl: album.picUrl,
        description: album.description,
        artist: {
          id: album.artists[0].id,
          name: album.artists[0].name,
        },
      });
    });
  }, [albumId]);

  return (
    <div className='album-detail'>
      <div className='content w-full bg-white'>
        <div className='py-8 w-full'>
          {!!albumInfo ? (
            <div className='info-card flex px-10 pb-4 justify-around'>
              <div className='img'>
                <img
                  className='rounded-md w-56 h-56'
                  src={`${albumInfo?.picUrl}`}
                ></img>
              </div>
              <div className='playlist-info w-2/3 flex-col justify-end'>
                <div className='artist-info text-sm pb-4 w-full flex'>
                  <p>歌手：</p>
                  <Link
                    className='artist-link'
                    artist-id={albumInfo?.artist.id}
                    title={albumInfo?.artist.name}
                    to={`/artist/${albumInfo?.artist.id}`}
                  >
                    {albumInfo?.artist.name}
                  </Link>
                </div>
                <div className='album-info text-sm pb-4 w-full flex'>
                  <p>专辑：</p>
                  <Link
                    className='artist-link'
                    artist-id={albumInfo?.id}
                    title={albumInfo?.name}
                    to={`/album/${albumInfo?.id}`}
                  >
                    {albumInfo?.name}
                  </Link>
                </div>

                <div className='des pb-3 w-full'>
                  <div
                    className='ply-description'
                    title={albumInfo?.description}
                  >
                    介绍：{albumInfo?.description}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='tracks-list px-10 pb-10'>
          <div
            className='list-header flex justify-between h-24 min-h-fit items-end pb-2'
            style={{
              borderBottom: '2px solid #c20c0c',
            }}
          >
            <div className='flex items-end justify-between mx-2 w-full min-h-fit'>
              <div className='flex items-end'>
                <p className='text-xl text-black'>歌曲列表</p>
                <p className='track-count text-gray-500 text-sm mx-4'>
                  {!!songDetail ? songDetail.length : '1'}
                  首歌
                </p>
              </div>
              <div className='btns text-sm items-end'>
                <button
                  style={{
                    backgroundColor: '#2B659E',
                  }}
                  className='btn play text-white px-3 py-1 rounded-md'
                  onClick={playAllSong}
                >
                  播放
                </button>
                <button
                  style={{
                    backgroundColor: '#2B659E',
                  }}
                  className='btn rounded-md py-1 px-2 text-white'
                  onClick={addAllSong}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <TrackList
            listItems={['歌曲标题', '专辑']}
            listInfo={songDetail!}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
