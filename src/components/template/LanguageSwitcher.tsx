import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Dropdown from '@/components/ui/Dropdown'
import Button from '@/components/ui/Button'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useLocaleStore } from '@/store/localeStore'
import { PiGlobeDuotone } from 'react-icons/pi'
import type { CommonProps } from '@/@types/common'

interface LanguageOption {
    code: string
    name: string
    flag: string
}

const languageOptions: LanguageOption[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

const _LanguageSwitcher = ({ className }: CommonProps) => {
    const { t } = useTranslation()
    const { currentLang, setLang } = useLocaleStore()
    const [isOpen, setIsOpen] = useState(false)

    const currentLanguage = languageOptions.find(lang => lang.code === currentLang) || languageOptions[0]

    const handleLanguageChange = (langCode: string) => {
        setLang(langCode)
        setIsOpen(false)
    }

    return (
        <Dropdown
            className={className}
            isOpen={isOpen}
            onToggle={setIsOpen}
            placement="bottom-end"
            renderTitle={
                <Button
                    variant="plain"
                    icon={<PiGlobeDuotone />}
                    className="flex items-center gap-2"
                >
                    <span className="text-lg">{currentLanguage.flag}</span>
                    <span className="hidden sm:inline-block">
                        {currentLanguage.code.toUpperCase()}
                    </span>
                </Button>
            }
        >
            <Dropdown.Item variant="header">
                <div className="py-2 px-3">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {t('common.language')}
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            {languageOptions.map((language) => (
                <Dropdown.Item
                    key={language.code}
                    eventKey={language.code}
                    className="flex items-center gap-3 px-3 py-2"
                    onClick={() => handleLanguageChange(language.code)}
                >
                    <span className="text-lg">{language.flag}</span>
                    <span className="flex-1">{language.name}</span>
                    {currentLang === language.code && (
                        <span className="text-blue-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                    )}
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

const LanguageSwitcher = withHeaderItem(_LanguageSwitcher)

export default LanguageSwitcher
