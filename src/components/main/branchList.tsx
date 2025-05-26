import { TheClimbBranch } from '@/types/theClimbTypes'
import Skeleton from 'react-loading-skeleton'

const BranchList: React.FC<{
  theClimbs?: TheClimbBranch[]
  onClickBranch: (branch: TheClimbBranch) => void
}> = ({ theClimbs, onClickBranch }) => {
  if (!theClimbs) {
    return (
      <section>
        <div className="flex flex-wrap gap-[10px]">
          {Array(14)
            .fill(undefined)
            .map((branch, index) => {
              return (
                <div
                  key={index}
                  className="flex w-[23%] items-center justify-center text-center">
                  <div className="border-charcoal-200 w-full cursor-pointer rounded-[10px] border-[1px] bg-yellow-100 px-[10px] py-[6px] font-bold text-black">
                    <div>
                      <Skeleton
                        width={50}
                        height={18}
                        baseColor="rgba(20, 55, 35, 1)"
                        highlightColor="rgba(35, 77, 50, 1)"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex flex-wrap gap-[10px]">
        {theClimbs?.map((branch) => {
          return (
            <div
              key={branch.id}
              className="flex w-[23%] items-center justify-center text-center"
              onClick={() => {
                onClickBranch(branch)
              }}>
              <div className="border-charcoal-200 w-full cursor-pointer rounded-[10px] border-[1px] bg-yellow-100 px-[10px] py-[6px] font-bold text-black">
                <div>{branch.branch}</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default BranchList
