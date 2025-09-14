import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { CSVLink } from 'react-csv'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import useUserList from '../hooks/useUserlist'

const UserListActionTools = () => {
    const navigate = useNavigate()

    const { userList } = useUserList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={userList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={() =>
                    navigate(`${ADMIN_PREFIX_PATH}/user/user-create`)
                }
            >
                Add new User
            </Button>
        </div>
    )
}

export default UserListActionTools
