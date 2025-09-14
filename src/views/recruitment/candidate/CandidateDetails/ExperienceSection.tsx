import Card from '@/components/ui/Card'
import { Experience } from './type'

const ExperienceSection = ({ experiences }: { experiences: Experience[] }) => {
    return (
        <Card className="w-full">
            <div className="mb-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">
                    Work Experience
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {experiences.length} position
                    {experiences.length !== 1 ? 's' : ''} • Professional journey
                </p>
            </div>

            {experiences.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-4xl mb-3">💼</div>
                    <p className="text-gray-500 dark:text-gray-400">
                        No work experience added yet
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {experiences.map((exp) => {
                        return (
                            <div
                                key={exp.id}
                                className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer"
                            >
                                {/* Experience Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">
                                            {exp.title}
                                        </h4>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">
                                                {exp.company}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Experience Details */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <span className="text-sm font-medium">
                                            {exp.years} year
                                            {exp.years !== 1 ? 's' : ''} of
                                            experience
                                        </span>
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

export default ExperienceSection
