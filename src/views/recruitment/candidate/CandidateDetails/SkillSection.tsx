import Card from '@/components/ui/Card'
import { Skill } from './type'

const SkillSection = ({ skills }: { skills: Skill[] }) => {
    // Function to get skill level color and styling
    const getSkillLevelStyle = (level: string) => {
        const normalizedLevel = level.toLowerCase()

        switch (normalizedLevel) {
            case 'expert':
            case 'advanced':
                return {
                    color: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200',
                    border: 'border-emerald-200 dark:border-emerald-700',
                    icon: '⭐',
                }
            case 'intermediate':
            case 'moderate':
                return {
                    color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
                    border: 'border-blue-200 dark:border-blue-700',
                    icon: '🔷',
                }
            case 'beginner':
            case 'basic':
                return {
                    color: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
                    border: 'border-amber-200 dark:border-amber-700',
                    icon: '🔶',
                }
            default:
                return {
                    color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
                    border: 'border-gray-200 dark:border-gray-600',
                    icon: '💡',
                }
        }
    }

    return (
        <Card className="w-full">
            <div className="mb-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">
                    Skills & Expertise
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {skills.length} skill{skills.length !== 1 ? 's' : ''} •
                    Professional competencies
                </p>
            </div>

            {skills.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-4xl mb-3">📚</div>
                    <p className="text-gray-500 dark:text-gray-400">
                        No skills added yet
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skill) => {
                        const levelStyle = getSkillLevelStyle(skill.level)
                        // const skillIcon = getSkillIcon(skill.name)

                        return (
                            <div
                                key={skill.id}
                                className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer"
                            >
                                {/* Skill Name and Level Badge */}
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                                        {skill.name}
                                    </h4>
                                    <div
                                        className={`${levelStyle.color} ${levelStyle.border} font-medium text-xs px-2 py-1 rounded-full flex items-center`}
                                    >
                                        {skill.level}
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

export default SkillSection
