import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import useMainCarousel from '../../utils/hooks/useMainCarousel'

const MainContainer = () => {

  useMainCarousel()


  return (
    <div>
      <VideoTitle/>
      <VideoBackground/>
    </div>
  )
}

export default MainContainer