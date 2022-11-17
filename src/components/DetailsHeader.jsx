import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, songData, artistData }) =>{ 

  const artist = artistData?.artists[artistId].attributes

return (
  <div className='relative w-full flex flex-col'>
    <div className='w-full bg-gradient-to-l from-transparent to-black
    sm:h-40 h-20' />    
    <div className='absolute inset-0 flex items-center'>
      <img 
        alt='art'
        src={artistId ? artist?.artwork?.url.replace('{w}', '500').replace('{h}', '500') :
        songData?.images?.coverart}
        className='sm:w-40 w-20 sm:h-40 h-20 rounded-full object-cover
        border-2 shadow-xl shadow-black'
      />
      <div className='ml-5'>
        <p className='font-bold  sm:text-3xl text-xl text-white'>
          {artistId ? artist?.name : songData?.title}
        </p>
        {!artistId && (
          <Link to={`/artists/${songData?.artists[0].adamid}`}>
            <p className='font-base text-gray-400 mt-2'>{songData?.subtitle}</p>
          </Link>
        )}
        <p className='font-base text-gray-400 mt-2'>
          {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
        </p>
      </div>
    </div>
    <div className='w-full sm:h-40 h-20' />
  </div>
)};

export default DetailsHeader;
