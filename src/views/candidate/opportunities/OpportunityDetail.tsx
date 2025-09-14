import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Card, Button, Spinner } from '@/components/ui'
import { getOpportunities } from '@/services/OpportunityService'
import type { JobOpportunity } from '@/@types/opportunity'
import { HiArrowLeft, HiBriefcase, HiClock, HiCurrencyDollar, HiCalendar, HiUser, HiGlobe } from 'react-icons/hi'

const OpportunityDetail = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [opportunity, setOpportunity] = useState<JobOpportunity | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            fetchOpportunity(parseInt(id))
        }
    }, [id])

    const fetchOpportunity = async (opportunityId: number) => {
        try {
            setLoading(true)
            setError(null)
            const opportunities = await getOpportunities()
            const found = opportunities.find(opp => opp.id === opportunityId)
            
            if (found) {
                setOpportunity(found)
            } else {
                setError('Opportunity not found')
            }
        } catch (error) {
            console.error('Error fetching opportunity:', error)
            setError('Failed to load opportunity details')
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatSalary = (min: number, max: number) => {
        return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    }

    const handleApply = () => {
        navigate(`/opportunities/${id}/apply`)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Spinner size="lg" />
                    <p className="text-gray-600 mt-4">Loading opportunity details...</p>
                </div>
            </div>
        )
    }

    if (error || !opportunity) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <HiBriefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Opportunity Not Found</h3>
                    <p className="text-gray-600 mb-6">{error || 'The opportunity you are looking for does not exist.'}</p>
                                <Button onClick={() => navigate('/opportunities')}>
                Back
            </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <Button
                variant="default"
                onClick={() => navigate('/opportunities')}
                className="mb-6"
            >
                <HiArrowLeft className="mr-2" />
                Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Card className="p-8">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-md font-medium ${
                                    opportunity.status === 'active' || opportunity.status === 'open'
                                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                                        : opportunity.status === 'closed' || opportunity.status === 'inactive'
                                        ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                                        : 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20'
                                }`}>
                                    {opportunity.status}
                                </span>
                                <span className={`px-3 py-1 rounded-md font-medium ${
                                    opportunity.jobType === 'full-time' || opportunity.jobType === 'fulltime'
                                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                        : opportunity.jobType === 'part-time' || opportunity.jobType === 'parttime'
                                        ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                                        : opportunity.jobType === 'contract'
                                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                                        : opportunity.jobType === 'internship'
                                        ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                                        : 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20'
                                }`}>
                                    {opportunity.jobType}
                                </span>
                                <span className="px-3 py-1 rounded-md font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700">
                                    {opportunity.publishScope}
                                </span>
                            </div>
                            
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {opportunity.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <HiCurrencyDollar className="mr-2" />
                                    <span className="font-medium">{formatSalary(opportunity.salary_min, opportunity.salary_max)}</span>
                                </div>
                                <div className="flex items-center">
                                    <HiBriefcase className="mr-2" />
                                    <span>{opportunity.jobType}</span>
                                </div>
                                <div className="flex items-center">
                                    <HiGlobe className="mr-2" />
                                    <span>{opportunity.publishScope}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                            <div 
                                className="prose max-w-none text-gray-700"
                                dangerouslySetInnerHTML={{ __html: opportunity.description }}
                            />
                        </div>

                        {/* Requirements & Details */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm">
                                        <HiCalendar className="mr-3 text-gray-400 w-5" />
                                        <span className="font-medium">Posted:</span>
                                        <span className="ml-2 text-gray-600">{formatDate(opportunity.generated_date)}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <HiClock className="mr-3 text-gray-400 w-5" />
                                        <span className="font-medium">Last Updated:</span>
                                        <span className="ml-2 text-gray-600">{formatDate(opportunity.last_updated_date)}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm">
                                        <HiUser className="mr-3 text-gray-400 w-5" />
                                        <span className="font-medium">Created By:</span>
                                        <span className="ml-2 text-gray-600">
                                            {opportunity.created_by ? `User ${opportunity.created_by}` : 'System'}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <HiUser className="mr-3 text-gray-400 w-5" />
                                        <span className="font-medium">Last Updated By:</span>
                                        <span className="ml-2 text-gray-600">
                                            {opportunity.last_updated_by ? `User ${opportunity.last_updated_by}` : 'System'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="border-t pt-6">
                            <Button 
                                size="lg" 
                                className="w-full md:w-auto"
                                onClick={handleApply}
                                disabled={opportunity.status !== 'active'}
                            >
                                {opportunity.status === 'active' ? 'Apply for this Position' : 'Position Not Available'}
                            </Button>
                            {opportunity.status !== 'active' && (
                                <p className="text-sm text-gray-500 mt-2">
                                    This position is currently not accepting applications.
                                </p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Summary</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <span className="text-sm font-medium text-gray-700">Position</span>
                                <p className="text-gray-900">{opportunity.title}</p>
                            </div>
                            
                            <div>
                                <span className="text-sm font-medium text-gray-700">Job Type</span>
                                <p className="text-gray-900 capitalize">{opportunity.jobType}</p>
                            </div>
                            
                            <div>
                                <span className="text-sm font-medium text-gray-700">Salary Range</span>
                                <p className="text-gray-900">{formatSalary(opportunity.salary_min, opportunity.salary_max)}</p>
                            </div>
                            
                            <div>
                                <span className="text-sm font-medium text-gray-700">Scope</span>
                                <p className="text-gray-900 capitalize">{opportunity.publishScope}</p>
                            </div>
                            
                            <div>
                                <span className="text-sm font-medium text-gray-700">Status</span>
                                <span className={`font-medium ${
                                    opportunity.status === 'active' || opportunity.status === 'open'
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : opportunity.status === 'closed' || opportunity.status === 'inactive'
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                }`}>
                                    {opportunity.status}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t">
                            <Button 
                                variant="default" 
                                className="w-full mb-3"
                                onClick={() => navigate('/opportunities')}
                            >
                                Browse Other Opportunities
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default OpportunityDetail
