import { cloneElement } from 'react'
import type { CommonProps } from '@/@types/common'

type SideProps = CommonProps

const Side = ({ children, ...rest }: SideProps) => {
    return (
        <div className="flex h-full p-6 bg-white dark:bg-gray-800">
            <div className="flex flex-col justify-center items-center flex-1 py-24">
                <div className="w-full max-w-[500px] px-6 lg:px-8">
                    {children
                        ? cloneElement(children as React.ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
            <div className="py-6 px-10 lg:flex flex-col flex-1 justify-between hidden rounded-3xl items-end relative xl:max-w-[520px] 2xl:max-w-[720px]">
                <img
                    src="https://img.freepik.com/free-vector/cute-people-working-office_23-2148887720.jpg?w=1000&t=st=1703123456~exp=1703124056~hmac=1234567890abcdef"
                    className="absolute h-full w-full top-0 left-0 rounded-3xl object-contain p-8"
                    alt="Talent Hunting - Cute Cartoon Characters"
                />
            </div>
        </div>
    )
}

export default Side
