import Loading from '@/components/shared/Loading'
import {
    TbServer,
    TbDatabase,
    TbClock,
    TbAlertTriangle,
    // TbCheckCircle,
} from 'react-icons/tb'

interface SystemHealthData {
    serverStatus: 'healthy' | 'warning' | 'error'
    databaseConnections: number
    apiResponseTime: number
    errorRate: number
    uptime: string
}

interface SystemHealthProps {
    data: SystemHealthData | null
    loading: boolean
}

const SystemHealth = ({ data, loading }: SystemHealthProps) => {
    if (loading) {
        return <Loading loading={true} />
    }

    if (!data) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">No system health data available</p>
            </div>
        )
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'healthy':
                return <TbServer className="text-2xl text-green-600" />
            case 'warning':
                return <TbAlertTriangle className="text-2xl text-yellow-600" />
            case 'error':
                return <TbAlertTriangle className="text-2xl text-red-600" />
                return 'text-green-600 bg-green-50 dark:bg-green-900/20'
            case 'warning':
                return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
            case 'error':
                return 'text-red-600 bg-red-50 dark:bg-red-900/20'
            default:
                return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
        }
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">System Health</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Server Status */}
                <div
                    className={`p-4 rounded-lg ${getStatusIcon(data.serverStatus)}`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(data.serverStatus)}
                        <span className="font-medium">Server</span>
                    </div>
                    <div className="text-2xl font-bold capitalize">
                        {data.serverStatus}
                    </div>
                </div>

                {/* Database Connections */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <TbDatabase className="text-2xl text-blue-600" />
                        <span className="font-medium">Database</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                        {data.databaseConnections}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Connections
                    </div>
                </div>

                {/* API Response Time */}
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <TbClock className="text-2xl text-purple-600" />
                        <span className="font-medium">Response Time</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                        {data.apiResponseTime}ms
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Average
                    </div>
                </div>

                {/* Error Rate */}
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <TbAlertTriangle className="text-2xl text-red-600" />
                        <span className="font-medium">Error Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                        {(data.errorRate * 100).toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Last 24h
                    </div>
                </div>

                {/* Uptime */}
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <TbServer className="text-2xl text-green-600" />
                        <span className="font-medium">Uptime</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                        {data.uptime}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Current
                    </div>
                </div>
            </div>

            {/* Health Summary */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">System Summary</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Server Status:</span>
                        <span
                            className={`font-medium capitalize ${getStatusIcon(data.serverStatus)}`}
                        >
                            {data.serverStatus}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Database Connections:</span>
                        <span className="font-medium">
                            {data.databaseConnections} active
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>API Performance:</span>
                        <span className="font-medium">
                            {data.apiResponseTime}ms average
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Error Rate:</span>
                        <span className="font-medium">
                            {(data.errorRate * 100).toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SystemHealth
