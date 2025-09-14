import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Card, Button, Input, Select, toast, Notification } from '@/components/ui'
import DataTable from '@/components/shared/DataTable'
import { getCandidateApplications, withdrawApplication } from '@/services/CandidateApplicationService'
import { HiSearch, HiBriefcase, HiClock, HiCurrencyDollar, HiEye, HiX } from 'react-icons/hi'
import type { CandidateApplication } from '@/@types/application'
import type { ColumnDef } from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

const MyApplications = () => {
  const [applications, setApplications] = useState<CandidateApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<CandidateApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [withdrawingId, setWithdrawingId] = useState<number | null>(null)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<CandidateApplication | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    filterApplications()
  }, [applications, searchTerm, statusFilter])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const data = await getCandidateApplications()
      setApplications(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  const filterApplications = () => {
    let filtered = [...applications]

    // Search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((app) => {
        const title = (app.opportunity.title || '').toLowerCase()
        const description = (app.opportunity.description || '').toLowerCase()
        return title.includes(term) || description.includes(term)
      })
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((app) => {
        const status = (app.application_status || '').toLowerCase()
        const filterStatus = statusFilter.toLowerCase()
        return status === filterStatus
      })
    }

    setFilteredApplications(filtered)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatSalary = (min: number, max: number) => {
    return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'text-amber-600 dark:text-amber-400 font-medium'
      case 'accepted':
        return 'text-emerald-600 dark:text-emerald-400 font-medium'
      case 'rejected':
        return 'text-red-600 dark:text-red-400 font-medium'
      case 'withdrawn':
        return 'text-gray-600 dark:text-gray-400 font-medium'
      default:
        return 'text-blue-600 dark:text-blue-400 font-medium'
    }
  }

  const getJobTypeColor = (jobType: string) => {
    switch (jobType?.toLowerCase()) {
      case 'full-time':
      case 'fulltime':
        return 'text-blue-600 dark:text-blue-400 font-medium'
      case 'part-time':
      case 'parttime':
        return 'text-green-600 dark:text-green-400 font-medium'
      case 'remote':
        return 'text-purple-600 dark:text-purple-400 font-medium'
      case 'internship':
        return 'text-orange-600 dark:text-orange-400 font-medium'
      case 'hybrid':
        return 'text-indigo-600 dark:text-indigo-400 font-medium'
      default:
        return 'text-gray-600 dark:text-gray-400 font-medium'
    }
  }

  const handleViewDetails = (application: CandidateApplication) => {
    navigate(`/opportunities/${application.opportunity.id}`)
  }

  const handleWithdraw = (application: CandidateApplication) => {
    setSelectedApplication(application)
    setShowWithdrawDialog(true)
  }

  const confirmWithdraw = async () => {
    if (!selectedApplication) return

    try {
      setWithdrawingId(selectedApplication.id)
      await withdrawApplication(selectedApplication.id)
      
      toast.push(
        <Notification title="Success" type="success">
          Application withdrawn successfully!
        </Notification>
      )
      
      // Refresh applications
      await fetchApplications()
    } catch (error) {
      console.error('Error withdrawing application:', error)
      toast.push(
        <Notification title="Error" type="danger">
          Failed to withdraw application. Please try again.
        </Notification>
      )
    } finally {
      setWithdrawingId(null)
      setShowWithdrawDialog(false)
      setSelectedApplication(null)
    }
  }

  const canWithdraw = (application: CandidateApplication) => {
    return application.application_status?.toLowerCase() === 'pending'
  }

  const columns: ColumnDef<CandidateApplication>[] = useMemo(
    () => [
      {
        header: 'Position',
        accessorKey: 'opportunity.title',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {row.opportunity.title}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {row.opportunity.company || 'Company'}
              </span>
            </div>
          )
        },
      },
      {
        header: 'Type',
        accessorKey: 'opportunity.jobType',
        cell: (props) => {
          const row = props.row.original
          return (
            <span className={getJobTypeColor(row.opportunity.jobType)}>
              {row.opportunity.jobType}
            </span>
          )
        },
      },
      {
        header: 'Salary',
        accessorKey: 'opportunity.salary',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-1">
              <HiCurrencyDollar className="w-4 h-4 text-gray-400" />
              <span>
                {row.opportunity.salary_min && row.opportunity.salary_max 
                  ? formatSalary(row.opportunity.salary_min, row.opportunity.salary_max)
                  : 'Not specified'
                }
              </span>
            </div>
          )
        },
      },
      {
        header: 'Status',
        accessorKey: 'application_status',
        cell: (props) => {
          const row = props.row.original
          return (
            <span className={getStatusColor(row.application_status)}>
              {row.application_status}
            </span>
          )
        },
      },
      {
        header: 'Applied',
        accessorKey: 'generated_date',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-1">
              <HiClock className="w-4 h-4 text-gray-400" />
              <span>{row.generated_date ? formatDate(row.generated_date) : 'N/A'}</span>
            </div>
          )
        },
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="plain"
                icon={<HiEye />}
                onClick={() => handleViewDetails(row)}
              >
                View
              </Button>
              {canWithdraw(row) && (
                <Button
                  size="sm"
                  variant="plain"
                  icon={<HiX />}
                  onClick={() => handleWithdraw(row)}
                  loading={withdrawingId === row.id}
                  className="text-red-600 hover:text-red-700"
                >
                  Withdraw
                </Button>
              )}
            </div>
          )
        },
      },
    ],
    [navigate, withdrawingId]
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Applications
          </h1>
        </div>
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          My Applications
        </h1>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search applications..."
              prefix={<HiSearch className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              placeholder="Status"
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'pending', label: 'Pending' },
                { value: 'accepted', label: 'Accepted' },
                { value: 'rejected', label: 'Rejected' },
                { value: 'withdrawn', label: 'Withdrawn' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Applications Table */}
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Application History ({filteredApplications.length})
            </h3>
          </div>
          
          <DataTable
            data={filteredApplications}
            columns={columns}
            loading={loading}
            emptyMessage="No applications found"
            className="min-h-[400px]"
          />
        </div>
      </Card>

      {/* Withdraw Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showWithdrawDialog}
        onClose={() => setShowWithdrawDialog(false)}
        onConfirm={confirmWithdraw}
        title="Withdraw Application"
        confirmText="Withdraw"
        cancelText="Cancel"
        type="danger"
      >
        <p>
          Are you sure you want to withdraw your application for{' '}
          <strong>{selectedApplication?.opportunity.title}</strong>?
        </p>
        <p className="text-sm text-gray-600 mt-2">
          This action cannot be undone. You will need to reapply if you change your mind.
        </p>
      </ConfirmDialog>
    </div>
  )
}

export default MyApplications
