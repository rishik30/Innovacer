import * as React from "react"
import FileUploader from "../Components/FileUploader"
import PatientsTable from "../Components/PatientsTable"

const Main = () => {
  const [fetchCount, setFetchCount] = React.useState<number>(0)

  const handleFileUploadSuccess = () => {
    setFetchCount(fetchCount + 1)
  }

  return (
      <div className="main-container">
          <FileUploader accept={".csv, .xls, .xlsx"} handleFileUpload={() => {}} onSuccess={handleFileUploadSuccess} />
          <PatientsTable fetchCount={fetchCount} />
      </div>
  )
}

export default Main
