import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Card, Button, toast, Notification } from '@/components/ui'
import { getOpportunities, applyToOpportunity } from '@/services/OpportunityService'
import type { JobOpportunity } from '@/@types/opportunity'
import { HiArrowLeft, HiCheckCircle } from 'react-icons/hi'

const ApplyForm = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [opportunity, setOpportunity] = useState<JobOpportunity | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            fetchOpportunity(parseInt(id))
        }
    }, [id])


    const apply = async () => {
        try {
            setSubmitting(true)
            setSuccess(false)
            setError(null)
            
            if (!opportunity?.id) {
                throw new Error('Opportunity ID is required')
            }
            
            const applyToOpportunityRequest = {
                opportunity_id: opportunity.id,
            }
            
            await applyToOpportunity(applyToOpportunityRequest)
            
            // Show success notification
            toast.push(
                <Notification title="Success" type="success">
                    Application submitted successfully! We'll review your application and get back to you soon.
                </Notification>
            )
            
            setSuccess(true)
            
            // Redirect after 3 seconds
            setTimeout(() => {
                navigate('/opportunities')
            }, 3000)
            
        } catch (error) {
            console.error('Error applying to opportunity:', error)
            const errorMessage = error instanceof Error ? error.message : 'Failed to apply to opportunity'
            setError(errorMessage)
            
            // Show error notification
            toast.push(
                <Notification title="Error" type="danger">
                    {errorMessage}
                </Notification>
            )
        } finally {
            setSubmitting(false)
        }
    }

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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading opportunity details...</p>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <HiCheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-gray-600 mb-6">
                        Thank you for applying to &quot;{opportunity.title}&quot;. We&apos;ll review your application and get back to you soon.
                    </p>
                    <p className="text-sm text-gray-500">Redirecting to opportunities page...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <Button
                variant="default"
                onClick={() => navigate(`/opportunities/${id}`)}
                className="mb-6"
            >
                <HiArrowLeft className="mr-2" />
                Back to Opportunity
            </Button>

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Position</h1>
                    <p className="text-gray-600">Click the button below to apply with your profile for &quot;{opportunity.title}&quot;</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Application Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-8">
                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-700">{error}</p>
                                    </div>
                                )}
                                <div className="flex space-x-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        loading={submitting}
                                        className="flex-1"
                                        onClick={() => apply()}
                                    >
                                        {submitting ? 'Applying For Application...' : 'Apply For Application'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="default"
                                        size="lg"
                                        onClick={() => navigate(`/opportunities/${id}`)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                        </Card>
                    </div>

                    {/* Job Summary */}
                    <div className="lg:col-span-1">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Position Summary</h3>
                            
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
                                    <p className="text-gray-900">
                                        ${opportunity.salary_min.toLocaleString()} - ${opportunity.salary_max.toLocaleString()}
                                    </p>
                                </div>
                                
                                <div>
                                    <span className="text-sm font-medium text-gray-700">Scope</span>
                                    <p className="text-gray-900 capitalize">{opportunity.publishScope}</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <Button 
                                    variant="default" 
                                    className="w-full mb-3 truncate"
                                    onClick={() => navigate('/opportunities')}
                                >
                                    Browse Other Opportunities
                                </Button>
                                <Button 
                                    variant="default" 
                                    className="w-full"
                                    onClick={() => navigate(`/opportunities/${id}`)}
                                >
                                    View Full Details
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyForm
