import { TodaySetting } from '@/types/theClimbTypes'
import Logo from './logo'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
const ClimbingList: React.FC<{
  onClickLogo: (key: number) => void
  index: number
  activeIndex: number
  climbingBranch?: TodaySetting
}> = ({ index, climbingBranch }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!climbingBranch) {
    return (
      <div
        className={`border-charcoal-200 mx-[10px] flex flex-col items-center justify-between gap-[6px] rounded-[10px] border-y-[1px] bg-yellow-100 p-[10px] transition-all duration-300`}>
        <div className="rounded-full">
          <Skeleton
            width={100}
            height={100}
            baseColor="rgba(20, 55, 35, 1)"
            highlightColor="rgba(35, 77, 50, 1)"
          />
        </div>
        <div className="flex flex-col text-[14px] text-green-300">
          <span className="font-pretendard font-[700]">
            <Skeleton
              width={100}
              height={14}
              baseColor="rgba(20, 55, 35, 1)"
              highlightColor="rgba(35, 77, 50, 1)"
            />
          </span>
          <span className="font-pretendard font-[700]">
            <Skeleton
              width={100}
              height={14}
              baseColor="rgba(20, 55, 35, 1)"
              highlightColor="rgba(35, 77, 50, 1)"
            />
          </span>
          <span className="font-pretendard font-[700]">
            <Skeleton
              width={100}
              height={14}
              baseColor="rgba(20, 55, 35, 1)"
              highlightColor="rgba(35, 77, 50, 1)"
            />
          </span>
          <div
            className="relative flex cursor-pointer items-center gap-[5px]"
            onClick={() => setIsOpen(!isOpen)}
            tabIndex={0}
            onBlur={() => {
              console.log('onBlur')
              setIsOpen(false)
            }}></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`border-charcoal-200 mx-[10px] flex flex-col items-center justify-between gap-[6px] rounded-[10px] border-y-[1px] bg-yellow-100 p-[10px] transition-all duration-300`}>
      <div>
        <Logo key={index} branchName={climbingBranch.branchName} />
      </div>
      <div className="flex flex-col text-[14px] text-green-300">
        <span className="font-pretendard font-[700]">
          {climbingBranch.branchName}
        </span>
        <span className="font-pretendard font-[700]">
          {climbingBranch.today?.date}
        </span>
        <span className="font-pretendard font-[700]">
          벽-{climbingBranch.today?.wall}
        </span>
        <div
          className="relative flex cursor-pointer items-center gap-[5px]"
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
          onBlur={() => {
            console.log('onBlur')
            setIsOpen(false)
          }}></div>
      </div>
    </div>
  )
}

export default ClimbingList
