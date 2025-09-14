import Card from '@/components/ui/Card'
import { ApplicationStatusChart as ApplicationStatusChartType } from '../types'

type ApplicationStatusChartProps = {
    data: ApplicationStatusChartType
}

const ApplicationStatusChart = ({ data }: ApplicationStatusChartProps) => {
    const total = data.total || 1
    const pendingPercentage = Math.round((data.pending / total) * 100)
    const acceptedPercentage = Math.round((data.accepted / total) * 100)
    const rejectedPercentage = Math.round((data.rejected / total) * 100)

    return (
        <Card>
            <h3 className="text-lg font-semibold mb-4">Application Status</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Pending
                    </span>
                    <span className="text-sm font-medium">{data.pending}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${pendingPercentage}%` }}
                    ></div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Accepted
                    </span>
                    <span className="text-sm font-medium">{data.accepted}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${acceptedPercentage}%` }}
                    ></div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Rejected
                    </span>
                    <span className="text-sm font-medium">{data.rejected}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${rejectedPercentage}%` }}
                    ></div>
                </div>

                {/* <div className="pt-2 border-t">
                    <div className="text-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {data.total}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
                    </div>
                </div> */}
            </div>
        </Card>
    )
}

export default ApplicationStatusChart
