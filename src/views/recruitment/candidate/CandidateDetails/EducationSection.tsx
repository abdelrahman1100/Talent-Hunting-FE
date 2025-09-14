import Card from '@/components/ui/Card'
import { Education } from './type'

const EducationSection = ({ educations }: { educations: Education[] }) => {
    // Function to get current year for calculating years since graduation
    const getYearsSinceGraduation = (graduationYear: number) => {
        const currentYear = new Date().getFullYear()
        return currentYear - graduationYear
    }

    return (
        <Card className="w-full">
            <div className="mb-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">
                    Education & Qualifications
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {educations.length} degree
                    {educations.length !== 1 ? 's' : ''} • Academic background
                </p>
            </div>

            {educations.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-4xl mb-3">🎓</div>
                    <p className="text-gray-500 dark:text-gray-400">
                        No education information added yet
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {educations.map((education) => {
                        const yearsSinceGraduation = getYearsSinceGraduation(
                            education.year,
                        )

                        return (
                            <div
                                key={education.id}
                                className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer"
                            >
                                {/* Education Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div>
                                                <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                                                    {education.degree}
                                                </h4>
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium">
                                                        {education.university}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Education Details */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <span className="text-sm font-medium">
                                            Graduated in {education.year}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400 dark:text-gray-500">
                                        {yearsSinceGraduation > 0
                                            ? `${yearsSinceGraduation} year${yearsSinceGraduation !== 1 ? 's' : ''} ago`
                                            : 'This year'}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </Card>
    )
}

export default EducationSection
