import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import OrderListTable from './components/UserListTable'
import OrderListTableTools from './components/UserListTableTools'
import CompanyListSelected from './components/UserListSelected'
import UserRoleCards from './components/UserRoleCards'
import useUserRoles from './hooks/useUserRoles'

const UserList = () => {
    const { roleList } = useUserRoles()

    const handleRoleUpdate = () => {
        // This will trigger a re-fetch of roles
        // The useUserRoles hook will handle the refresh
    }

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <UserRoleCards
                        roleList={roleList}
                        onRoleUpdate={handleRoleUpdate}
                    />
 <h3 className="text-lg font-semibold text-gray-800">All Users</h3>
                    <div className="flex flex-col gap-4  justify-between">
                   
                        <OrderListTableTools />
                        <OrderListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <CompanyListSelected />
        </>
    )
}

export default UserList
