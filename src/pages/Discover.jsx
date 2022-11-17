import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
 
const Discover = () => {
    
    const { activeSong, isPlaying, genreListId  } = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');
    const dispatch = useDispatch()

    if(isFetching) return <Loader title='Loading songs ...' />
    if(error) return <Error />

    const genreTitle = genres.find(({ value }) => value === genreListId)?.title
    return (
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='fonst-bold text-3xl text-white text-left'>
                    Discover {genreTitle || 'Pop'}
                </h2>
                <select
                    value={genreListId}
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                    className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:m-0 m-5'
                >
                    {genres.map((genre) => <option key={genre.value} value={genre.value}>
                        {genre.title}
                    </option>)}
                </select>
            </div>
            <div className='flex flex-wrap sm:justify-start juctify-center gap-6'>
                {data?.map((song, i) => (
                    <SongCard 
                        key={song.key}
                        song={song}
                        i={i}
                        activeSong={activeSong}
                        isPlaying={isPlaying}
                        data={data}
                    />
                ))}
            </div>
        </div>
    )
}

export default Discover;
