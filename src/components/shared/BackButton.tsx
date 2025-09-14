import { useNavigate } from 'react-router'
import Button from '@/components/ui/Button'
import { HiArrowLeft } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'

interface BackButtonProps extends CommonProps {
    fallbackPath?: string
    className?: string
}

const BackButton = ({ fallbackPath, className, ...rest }: BackButtonProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
        } else if (fallbackPath) {
            navigate(fallbackPath)
        } else {
            navigate('/')
        }
    }

    return (
        <Button
            variant="plain"
            icon={<HiArrowLeft />}
            onClick={handleBack}
            className={className}
            {...rest}
        >
            Back
        </Button>
    )
}

export default BackButton
