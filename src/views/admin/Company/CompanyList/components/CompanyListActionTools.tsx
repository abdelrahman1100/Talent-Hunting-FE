import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { CSVLink } from 'react-csv'
import useCompanyList from '../hooks/useCompanylist'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'

const CategoryListActionTools = () => {
    const navigate = useNavigate()

    const { companyList } = useCompanyList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={companyList}
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
                    navigate(`${ADMIN_PREFIX_PATH}/company/company-create`)
                }
            >
                Add new Company
            </Button>
        </div>
    )
}

export default CategoryListActionTools
