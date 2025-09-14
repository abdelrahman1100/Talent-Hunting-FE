import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import useOpportunityList from '../hooks/useOpportunityList'
import { CSVLink } from 'react-csv'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'

const OpportunityListActionTools = () => {
    const navigate = useNavigate()

    const { opportunityList } = useOpportunityList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="opportunityList.csv"
                data={opportunityList}
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
                    navigate(
                        `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-create`,
                    )
                }
            >
                Add new
            </Button>
        </div>
    )
}

export default OpportunityListActionTools
