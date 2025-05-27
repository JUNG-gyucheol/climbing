import { TheClimbBranch } from '@/types/theClimbTypes'
import Skeleton from 'react-loading-skeleton'

const BranchList: React.FC<{
  theClimbs?: TheClimbBranch[]
  onClickBranch: (branch: TheClimbBranch) => void
}> = ({ theClimbs, onClickBranch }) => {
  if (!theClimbs) {
    return (
      <section>
        <div className="flex flex-col gap-[10px]">
          {Array.from({ length: Math.ceil(14 / 4) }).map((_, index) => {
            const branchs = Array.from({
              length: Math.ceil(14 / 4) * 4,
            })
              .fill(undefined)
              .map(() => {
                return true
              })
            return (
              <div key={index} className="flex gap-[10px]">
                {branchs?.slice(index * 4, index * 4 + 4).map((branch, idx) => {
                  return branch ? (
                    <div
                      key={`${index}-${idx}`}
                      className="flex w-[100%] items-center justify-center text-center">
                      <div className="border-charcoal-200 w-full cursor-pointer rounded-[10px] border-[1px] bg-yellow-100 px-[10px] py-[6px] font-bold text-black">
                        <div>
                          {' '}
                          <Skeleton
                            width={50}
                            height={18}
                            baseColor="rgba(20, 55, 35, 1)"
                            highlightColor="rgba(35, 77, 50, 1)"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={`${index}-${idx}`}
                      className="flex w-[100%] items-center justify-center text-center"></div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex flex-col gap-[10px]">
        {Array.from({ length: Math.ceil(theClimbs.length / 4) }).map(
          (_, index) => {
            const branchs = Array.from({
              length: Math.ceil(theClimbs.length / 4) * 4,
            })
              .fill(undefined)
              .map((_, index) => {
                return theClimbs?.[index]
              })
            return (
              <div key={index} className="flex gap-[10px]">
                {branchs?.slice(index * 4, index * 4 + 4).map((branch, idx) => {
                  return branch ? (
                    <div
                      key={branch.id}
                      className="flex w-[100%] items-center justify-center text-center"
                      onClick={() => {
                        onClickBranch(branch)
                      }}>
                      <div className="border-charcoal-200 w-full cursor-pointer rounded-[10px] border-[1px] bg-yellow-100 px-[10px] py-[6px] font-bold text-black">
                        <div>{branch.branch}</div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={`${index}-${idx}`}
                      className="flex w-[100%] items-center justify-center text-center"></div>
                  )
                })}
              </div>
            )
          },
        )}
      </div>
    </section>
  )
}

export default BranchList
