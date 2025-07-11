import GroupMultiSelect from "./GroupMultiSelect"
import ModalityMultiSelect from "./ModalityMultiSelect"
import { useContext } from "react"
import { DatasetContext } from "../context/DatasetContext"

const TopBar = () => {
  const { searchTitle, setSearchTitle } = useContext(DatasetContext);
    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
    };
  return (
    <div className="flex items-center justify-between text-gray-700 px-10 py-4 mt-2 flex-wrap gap-4">
      <input value={searchTitle} onChange={handleSearchChange} type="text" className="bg-white px-4 py-2 rounded-md border-gray-300 shadow-sm" placeholder="Search datasets..." />
      <div className="flex gap-3 flex-wrap">
        <ModalityMultiSelect />
        <GroupMultiSelect />
      </div>
    </div>
  )
}

export default TopBar