import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Track, TracksContext } from '../../pages/Layout';
import './index.css';

interface Props {
  listItems: Array<string>;
  listInfo: Array<Track>;
}

const TrackList: FC<Props> = ({ listItems, listInfo }) => {
  console.log(listInfo);

  const { tracks, setTracks, trackIndex, setTrackIndex } = useContext(TracksContext);
  console.log(listItems);

  const playTrack = (e: any) => {
    const node = e.target.parentNode;
    const idx = node.querySelector('.idx').textContent;
    setTracks(listInfo);
    setTrackIndex(idx - 1);
  };

  const addTrack = (e: any) => {
    const node = e.target.parentNode;
    const idx = node.querySelector('.idx').textContent;
    const data = listInfo[idx - 1];
    setTracks([...tracks, data]);
    // setTracks(tracks.concat({ ...data }));
  };

  return (
    <div>
      <table className='w-full list-table'>
        <thead>
          <tr className='w-full table-head h-8'>
            <th
              align='left'
              className='idx'
            ></th>
            <th align='left'>歌曲标题</th>
            {listItems[1] == '歌手' || listItems[2] == '歌手' || listItems[1] == '专辑' || listItems[2] == '专辑' ? (
              <th align='left'>{listItems[1]}</th>
            ) : (
              <></>
            )}
            {listItems[1] == '歌手' || listItems[2] == '歌手' || listItems[1] == '专辑' || listItems[2] == '专辑' ? (
              <th align='left'>{listItems[2]}</th>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {listInfo ? (
            listInfo.map((item, idx) => (
              <tr
                key={item.song.id}
                className='tr-info w-full'
                // onClick={addTrack}
                onDoubleClick={playTrack}
              >
                <td
                  align='center'
                  className={`idx idx-${idx + 1} px-4`}
                >
                  {idx + 1}
                </td>
                <td align='left'>
                  <Link
                    className='song-link max-w-fit mr-12'
                    title={item.song.name}
                    to={`/song/${item.song.id}`}
                  >
                    {item.song.name}
                  </Link>
                </td>
                {listItems[1] == '歌手' || listItems[2] == '歌手' ? (
                  <td align='left'>
                    <Link
                      className='artist-link max-w-fit mr-12'
                      title={item.artist.name}
                      to={`/artist/${item.artist.id}`}
                    >
                      {item.artist.name}
                    </Link>
                  </td>
                ) : (
                  <></>
                )}

                {listItems[1] == '专辑' || listItems[2] == '专辑' ? (
                  <td align='left'>
                    <Link
                      className='album-link max-w-fit mr-4'
                      title={item.album.name}
                      to={`/album/${item.album.id}`}
                    >
                      {item.album.name}
                    </Link>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrackList;
