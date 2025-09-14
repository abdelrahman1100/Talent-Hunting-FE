import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
// import useCustomerList from '../../CategoryList/hooks/useCategoryList'
import useDepartmentList from '../hooks/useDepartmentList'
import { CSVLink } from 'react-csv'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'

const DepartmentListActionTools = () => {
    const navigate = useNavigate()

    const { departmentList } = useDepartmentList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="departmentList.csv"
                data={departmentList}
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
                    navigate(`${ADMIN_PREFIX_PATH}/department/department-create`)
                }
            >
                Add new Department
            </Button>
        </div>
    )
}

export default DepartmentListActionTools
