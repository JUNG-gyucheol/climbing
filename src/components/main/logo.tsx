import { getImages } from '@/utils/climbs'
import Image from 'next/image'

const Logo: React.FC<{
  branchName: string
  width?: number
  height?: number
}> = ({ branchName, width = 100, height = 100 }) => {
  return (
    <div
      className={`h-[${height}px] w-[${width}px] cursor-pointer overflow-hidden rounded-full`}>
      <Image
        src={getImages(branchName)}
        alt="logo"
        width={width}
        height={height}
      />
    </div>
  )
}

export default Logo
