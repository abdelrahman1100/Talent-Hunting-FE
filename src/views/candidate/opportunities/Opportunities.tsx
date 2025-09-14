import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Card, Button, Badge, Input, Select } from '@/components/ui'
import DataTable from '@/components/shared/DataTable'
import { getOpportunities } from '@/services/OpportunityService'
import { HiSearch, HiBriefcase, HiClock, HiCurrencyDollar, HiEye } from 'react-icons/hi'
import type { JobOpportunity } from '@/@types/opportunity'
import type { ColumnDef } from '@/components/shared/DataTable'

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<JobOpportunity[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState<JobOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const navigate = useNavigate()

  useEffect(() => {
    fetchOpportunities()
  }, [])

  useEffect(() => {
    filterOpportunities()
  }, [opportunities, searchTerm, jobTypeFilter, statusFilter])

  const fetchOpportunities = async () => {
    try {
      setLoading(true)
      const data = await getOpportunities()
      setOpportunities(data || [])
    } catch (error) {
      console.error('Error fetching opportunities:', error)
      setOpportunities([])
    } finally {
      setLoading(false)
    }
  }

  const filterOpportunities = () => {
    let filtered = [...opportunities]

    // Search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((opp) => {
        const title = (opp.title || '').toLowerCase()
        const description = (opp.description || '').toLowerCase()
        const company = (opp.company || '').toLowerCase()
        return title.includes(term) || 
               description.includes(term) || 
               company.includes(term)
      })
    }

    // Job type filter
    if (jobTypeFilter !== 'all') {
      filtered = filtered.filter((opp) => {
        const jobType = (opp.jobType || '').toLowerCase()
        const filterType = jobTypeFilter.toLowerCase()
        return jobType === filterType
      })
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((opp) => {
        const status = (opp.status || '').toLowerCase()
        const filterStatus = statusFilter.toLowerCase()
        return status === filterStatus
      })
    }

    setFilteredOpportunities(filtered)
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
      case 'active':
      case 'open':
        return 'text-emerald-600 dark:text-emerald-400 font-medium'
      case 'closed':
      case 'inactive':
        return 'text-red-600 dark:text-red-400 font-medium'
      case 'draft':
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

  const handleViewDetails = (opportunity: JobOpportunity) => {
    navigate(`/opportunities/${opportunity.id}`)
  }

  const columns: ColumnDef<JobOpportunity>[] = useMemo(
    () => [
      {
        header: 'Position',
        accessorKey: 'title',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {row.title}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {row.company}
              </span>
            </div>
          )
        },
      },
      {
        header: 'Type',
        accessorKey: 'jobType',
        cell: (props) => {
          const row = props.row.original
          return (
            <span className={getJobTypeColor(row.jobType)}>
              {row.jobType}
            </span>
          )
        },
      },
      {
        header: 'Location',
        accessorKey: 'location',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-1">
              <HiBriefcase className="w-4 h-4 text-gray-400" />
              <span>{row.location || 'Remote'}</span>
            </div>
          )
        },
      },
      {
        header: 'Salary',
        accessorKey: 'salary',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-1">
              <HiCurrencyDollar className="w-4 h-4 text-gray-400" />
              <span>
                {row.minSalary && row.maxSalary 
                  ? formatSalary(row.minSalary, row.maxSalary)
                  : 'Not specified'
                }
              </span>
            </div>
          )
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return (
            <span className={getStatusColor(row.status)}>
              {row.status}
            </span>
          )
        },
      },
      {
        header: 'Posted',
        accessorKey: 'createdAt',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-1">
              <HiClock className="w-4 h-4 text-gray-400" />
              <span>{row.createdAt ? formatDate(row.createdAt) : 'N/A'}</span>
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
            </div>
          )
        },
      },
    ],
    [navigate]
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Job Opportunities
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
          Job Opportunities
        </h1>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search opportunities..."
              prefix={<HiSearch className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              placeholder="Job Type"
              value={jobTypeFilter}
              onChange={(value) => setJobTypeFilter(value)}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'full-time', label: 'Full-time' },
                { value: 'part-time', label: 'Part-time' },
                { value: 'remote', label: 'Remote' },
                { value: 'internship', label: 'Internship' },
                { value: 'hybrid', label: 'Hybrid' },
              ]}
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              placeholder="Status"
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Opportunities Table */}
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Available Positions ({filteredOpportunities.length})
            </h3>
          </div>
          
          <DataTable
            data={filteredOpportunities}
            columns={columns}
            loading={loading}
            emptyMessage="No opportunities found"
            className="min-h-[400px]"
          />
        </div>
      </Card>
    </div>
  )
}

export default Opportunities
