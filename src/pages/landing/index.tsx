import { discordIntroduceVideo } from '@/constants/discord-assets-path'

import Footer from './components/footer'
import Header from './components/header'
import HomeHero from './components/home-hero'
import VideoBanner from './components/video-banner'

function LandingPage() {
  return (
    <div className='w-full bg-[url("/background/landing-art.webp")] bg-cover'>
      <Header />
      <HomeHero />
      {discordIntroduceVideo.map((videoBanner, index) => (
        <VideoBanner
          key={index}
          videoUrl={videoBanner.source}
          title={videoBanner.title}
          description={videoBanner.description}
          videoIsLeft={index % 2 === 0}
          isLast={index === discordIntroduceVideo.length - 1}
        />
      ))}
      <Footer />
    </div>
  )
}

export default LandingPage
