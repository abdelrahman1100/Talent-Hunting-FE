import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { CSVLink } from 'react-csv'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import useLockUpList from '../hooks/useLockUpList'

const LockUpListActionTools = () => {
    const navigate = useNavigate()

    const { lockupList } = useLockUpList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="departmentList.csv"
                data={lockupList}
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
                icon={<TbUserPlus className="text-xl" />}
                onClick={() =>
                    navigate(
                        `${ADMIN_PREFIX_PATH}/lockup/lockup-create`,
                    )
                }
            >
                Add new Lockup
            </Button>
        </div>
    )
}

export default LockUpListActionTools
