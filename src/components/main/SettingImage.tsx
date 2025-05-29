import dayjs from 'dayjs'
import Image from 'next/image'
import { RefObject, useRef, useState } from 'react'

const SettingImage: React.FC<{
  branch: {
    branch_id: number
    brand: string
    created_at: string
    id: number
    infos: {
      date: string
      color: string
      wall: string
    }[]
    setting_date: string
  }
  branchName: string
  ref: RefObject<HTMLDivElement | null>
  length: number
  idx: number
}> = ({ branch, branchName }) => {
  const [isOpen, setIsOpen] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div>
        <div className="font-bold text-green-200">
          <span>{dayjs(branch.setting_date).format('YYYY-MM')}</span>
        </div>
        <div
          ref={imageRef}
          key={`${branch.setting_date}-${branch.infos}`}
          className="relative">
          <Image
            onClick={() => {
              setIsOpen((prev) => !prev)
            }}
            src={`/schedules/${dayjs(branch.setting_date).format('YYYY-MM')}_${branchName}_wall.png`}
            alt="schedule"
            width={300}
            height={300}
            onError={(e) => {
              console.log('error')
              console.log('error', e)
            }}
            priority={true}
          />
          <div
            onClick={() => {
              setIsOpen((prev) => !prev)
            }}
            className={`fixed top-[50%] left-[50%] flex -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isOpen ? 'z-[101] block w-[300px]' : 'z-[99] hidden'} transition-all duration-200`}>
            <Image
              src={`/schedules/${dayjs(branch.setting_date).format('YYYY-MM')}_${branchName}_wall.png`}
              alt="schedule"
              width={300}
              height={300}
              onError={(e) => {
                console.log('error')
                console.log('error', e)
              }}
              loading="lazy"
            />
          </div>
          <div
            onClick={() => {
              setIsOpen(false)
            }}
            className={`fixed top-[0px] left-[0px] z-[100] h-[100%] w-[100%] bg-black/50 ${isOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-all duration-200`}
          />
        </div>
      </div>
    </>
  )
}

export default SettingImage
