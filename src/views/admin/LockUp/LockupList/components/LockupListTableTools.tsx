// import useCategoryList from '../../CategoryList/hooks/useCategoryList'
import CategoryListSearch from './LockupListSearch'
import useDepartmentList from '../hooks/useLockUpList'
import CategoryListTableFilter from './LockupListTableFilter'
import cloneDeep from 'lodash/cloneDeep'
import useLockUpList from '../hooks/useLockUpList'
import LockUpListSearch from './LockupListSearch'
import LockupListTableFilter from './LockupListTableFilter'
const LockupListTableTools = () => {
    const { tableData, setTableData } = useLockUpList()

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
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
            <LockUpListSearch onInputChange={handleInputChange} />
            <LockupListTableFilter />
        </div>
    )
}

export default LockupListTableTools
