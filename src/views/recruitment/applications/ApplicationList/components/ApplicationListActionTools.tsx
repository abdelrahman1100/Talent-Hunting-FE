import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { CSVLink } from 'react-csv'
import useApplicationList from '../hooks/useApplicationList'

const ApplicationListActionTools = () => {
    const { applicationList } = useApplicationList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="applicationList.csv"
                data={applicationList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
        </div>
    )
}

export default ApplicationListActionTools
