import Loading from '@/components/shared/Loading'
import useSWR from 'swr'
import { useParams } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import { User } from '../UserList/types'
import { apiGetUser } from '@/services/UserService'
import UserImageSection from './UserImageSection'
import UserRolesSection from './UserRolesSection'
import UserTimelineSection from './UserTimelineSection'

const UserDetails = () => {
    const { id } = useParams()

    const { data: userData, isLoading: isUserLoading } = useSWR<User>(
        [`/api/users/${id}`, { id: id as string }],
        ([_, params]: [string, { id: string }]) =>
            apiGetUser({ id: params.id }),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    return (
        <Loading loading={isUserLoading}>
            {!isEmpty(userData) && (
                <div className="flex flex-col gap-6">
                    {/* Top Row - User Profile and Roles */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Column - User Profile */}
                        <div className="lg:w-1/2">
                            <UserImageSection user={userData} />
                        </div>

                        {/* Right Column - User Roles */}
                        <div className="lg:w-1/2">
                            <UserRolesSection user={userData} />
                        </div>
                    </div>

                    {/* Bottom Row - Timeline (Full Width) */}
                    <div className="w-full">
                        <UserTimelineSection user={userData} />
                    </div>
                </div>
            )}
        </Loading>
    )
}

export default UserDetails
