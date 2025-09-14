import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { CandidateProfile } from './type'
import CandidateCVFile from './components/CandidateCV'

const CandidateOverview = ({ profile }: { profile: CandidateProfile }) => {
    // Download CV from base64
    const handleDownloadCV = () => {
        const base64 = profile.cvFile.replace(
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
        link.download = 'CV.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return (
        <Card className="w-full">
            <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Candidate Summary</h3>
                <p className="text-gray-700">{profile.summary}</p>
            </div>
            <div className="flex items-center gap-4">
                <CandidateCVFile
                    cvFileBase64={profile.cvFile}
                    candidateId={profile.user.id}
                />
            </div>
        </Card>
    )
}

export default CandidateOverview
