import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { TodaySetting } from '@/types/theClimbTypes'
import ClimbingList from './climbingList'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, Pagination, Keyboard, Mousewheel } from 'swiper/modules'

const SwiperNotice: React.FC<{
  todaySetting: TodaySetting[] | undefined
  onClickLogo: (key: number) => void
}> = ({ todaySetting, onClickLogo }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
  }

  return (
    <div className="mt-[10px] w-screen">
      <Swiper
        modules={[Autoplay, Keyboard, Mousewheel, Pagination]}
        direction="horizontal"
        slidesPerView={2}
        // centeredSlides={true}
        // spaceBetween={5}
        loop={true}
        mousewheel={true}
        keyboard={{ enabled: true }}
        // pagination={{
        //   clickable: true,
        //   type: 'bullets',
        //   bulletClass: 'swiper-pagination-bullet',
        //   bulletActiveClass: 'swiper-pagination-bullet-active',
        //   renderBullet: (index, className) => {
        //     console.log(index, className)
        //     return `<span class="${className}"><span class="bullet-progress"></span></span>`
        //   },
        // }}
        autoplay={{
          delay: 2000, // 3초마다 슬라이드 전환
          disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
        }}
        onActiveIndexChange={handleSlideChange}>
        {todaySetting?.map((climbingBranch, index) => {
          return (
            <SwiperSlide key={index} className={`relative`}>
              <ClimbingList
                key={index}
                climbingBranch={climbingBranch}
                onClickLogo={(key) => onClickLogo(key)}
                index={index}
                activeIndex={activeIndex}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default SwiperNotice
