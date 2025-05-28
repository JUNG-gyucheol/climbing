import dayjs from 'dayjs'
import Image from 'next/image'
import { RefObject, useEffect, useRef, useState } from 'react'

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
}> = ({ branch, branchName, ref, length, idx }) => {
  const [isOpen, setIsOpen] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const [imageWidth, setImageWidth] = useState(0)
  useEffect(() => {
    if (imageRef.current) {
      setImageWidth(imageRef.current.offsetWidth)
    }
  }, [imageRef, ref])

  return (
    <div
      ref={imageRef}
      key={`${branch.setting_date}-${branch.infos}`}
      className="relative">
      <Image
        src={`/schedules/${dayjs(branch.setting_date).format('YYYY-MM')}_${branchName}_wall.png`}
        alt="schedule"
        width={300}
        height={300}
      />
      <div
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
        style={{
          left: isOpen ? (length === 1 ? 0 : 0) : 0,
          //   transform: `translate(${(imageWidth / 2) * (idx === 0 ? 1 : -1)}px, 0%) scale(1)`,
          transform: isOpen
            ? length === 1
              ? 'translateY(-60%) scale(1.55)'
              : `translate(${(imageWidth / 2 + (idx === 0 ? -12 : 16)) * (idx === 0 ? 1 : -1)}px, -60%) scale(1.55)`
            : 'translateY(0%) scale(1)',
        }}
        className={`absolute top-[0px] cursor-pointer ${isOpen ? 'z-[101] w-[300px]' : 'z-[99]'} transition-all duration-200`}>
        <Image
          src={`/schedules/${dayjs(branch.setting_date).format('YYYY-MM')}_${branchName}_wall.png`}
          alt="schedule"
          width={300}
          height={300}
        />
      </div>
      <div
        onClick={() => {
          setIsOpen(false)
        }}
        className={`fixed top-[0px] left-[0px] z-[100] h-[100%] w-[100%] bg-black/50 ${isOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-all duration-200`}
      />
    </div>
  )
}

export default SettingImage
