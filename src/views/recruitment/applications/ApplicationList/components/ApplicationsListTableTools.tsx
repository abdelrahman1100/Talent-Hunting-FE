// import useOpportunityList from '../hooks/useOpportunityList'
// import OpportunityListSearch from './OpportunityListSearch'
// import OpportunityTableFilter from './OpportunityTableFilter'
import cloneDeep from 'lodash/cloneDeep'
import useApplicationList from '../hooks/useApplicationList'
import ApplicationListSearch from './ApplicationListSearch'
import ApplicationTableFilter from './ApplicationTableFilter'

const ApplicationsListTableTools = () => {
    const { tableData, setTableData } = useApplicationList()

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.search = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <ApplicationListSearch onInputChange={handleInputChange} />
            <ApplicationTableFilter />
        </div>
    )
}

export default ApplicationsListTableTools
