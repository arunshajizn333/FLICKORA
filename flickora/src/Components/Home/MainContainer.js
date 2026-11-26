import React, { useEffect } from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import useMainCarousel from '../../utils/hooks/useMainCarousel'

const MainContainer = () => {

  const data =useMainCarousel()
if (!data) return null; // or <div className="loading">Loading...</div>
  // 2. Safely destructure now that data is guaranteed to exist
  const { id, title, overview } = data;
 console.log(id);

 


  return (
    <div className='w-svw h-fit'>
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer