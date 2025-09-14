import FileSegment from '../FileSegment'

const CandidateCVFile = ({
    cvFileBase64,
    candidateId,
}: {
    cvFileBase64: string
    candidateId: number
}) => {
    const getFileSize = (base64: string) => Math.ceil((base64.length * 3) / 4)

    // Format CV name as "Candidate #X CV"
    const formatCVName = (id: number) => `Candidate #${id} CV`

    const handleDownload = () => {
        const base64 = cvFileBase64.replace(
            /^data:application\/pdf;base64,/,
            '',
        )
        const byteCharacters = atob(base64)
        const byteNumbers = Array.from(byteCharacters, (char) =>
            char.charCodeAt(0),
        )
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = formatCVName(candidateId)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return (
        <FileSegment
            fileType="pdf"
            name={formatCVName(candidateId)}
            size={getFileSize(cvFileBase64)}
            onClick={handleDownload}
            loading={false}
        />
    )
}

export default CandidateCVFile
