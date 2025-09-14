import classNames from 'classnames'
import type { CommonProps } from '@/@types/common'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        style,
        logoWidth = 'auto',
    } = props

    const textColor = mode === 'dark' ? 'text-white' : 'text-gray-900'
    const displayText = type === 'streamline' ? 'TH' : 'Talent Hunting'

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <span className={`font-bold text-lg ${textColor} select-none`}>
                {displayText}
            </span>
        </div>
    )
}

export default Logo
