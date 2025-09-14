import Avatar from '@/components/ui/Avatar'
import { PiUserDuotone } from 'react-icons/pi'
import acronym from '@/utils/acronym'
import useRandomBgColor from '@/utils/hooks/useRandomBgColor'
import type { CommonProps } from '@/@types/common'

interface DefaultAvatarProps extends CommonProps {
    src?: string | null
    name?: string | null
    size?: 'sm' | 'md' | 'lg' | number
    shape?: 'circle' | 'square' | 'round'
    className?: string
}

const DefaultAvatar = ({ 
    src, 
    name, 
    size = 'md', 
    shape = 'circle',
    className,
    ...rest 
}: DefaultAvatarProps) => {
    const bgColor = useRandomBgColor()
    
    // If we have a valid image source, use it
    if (src && src.trim() !== '') {
        return (
            <Avatar
                src={src}
                size={size}
                shape={shape}
                className={className}
                {...rest}
            />
        )
    }
    
    // If we have a name, show initials with random background color
    if (name && name.trim() !== '') {
        return (
            <Avatar
                size={size}
                shape={shape}
                className={`${bgColor(name)} ${className || ''}`}
                {...rest}
            >
                {acronym(name)}
            </Avatar>
        )
    }
    
    // Default fallback with user icon
    return (
        <Avatar
            size={size}
            shape={shape}
            icon={<PiUserDuotone />}
            className={className}
            {...rest}
        />
    )
}

export default DefaultAvatar
