import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import { Button } from '@/components/ui'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { Controller } from 'react-hook-form'
import { HiOutlineUser } from 'react-icons/hi'
import { FormSectionBaseProps } from '../types'

type ProfileImageSectionProps = FormSectionBaseProps

const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })

const ProfileImage = ({ control, errors }: ProfileImageSectionProps) => {
    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }
            }
        }

        return valid
    }

    return (
        <Card>
            <h4 className="mb-6">Profile Image (Optional)</h4>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg text-center p-4">
                <div className="text-center">
                    <Controller
                        name="user_img"
                        control={control}
                        render={({ field }) => (
                            <>
                                <div className="flex items-center justify-center">
                                    {field.value ? (
                                        <Avatar
                                            size={100}
                                            className="border-4 border-white bg-gray-100 text-gray-300 shadow-lg"
                                            icon={<HiOutlineUser />}
                                            src={
                                                field.value.startsWith('data:')
                                                    ? field.value
                                                    : `data:image/jpeg;base64,${field.value}`
                                            }
                                        />
                                    ) : (
                                        <DoubleSidedImage
                                            src="/img/others/upload.png"
                                            darkModeSrc="/img/others/upload-dark.png"
                                            alt="Upload image"
                                        />
                                    )}
                                </div>
                                <Upload
                                    showList={false}
                                    uploadLimit={1}
                                    beforeUpload={beforeUpload}
                                    onChange={async (files) => {
                                        if (files.length > 0) {
                                            const base64 = await toBase64(
                                                files[0],
                                            )
                                            field.onChange(base64)
                                        }
                                    }}
                                >
                                    <Button
                                        variant="solid"
                                        className="mt-4"
                                        type="button"
                                    >
                                        Upload Image (Optional)
                                    </Button>
                                </Upload>
                            </>
                        )}
                    />
                </div>
            </div>

            {errors?.user_img && (
                <p className="mt-2 font-semibold text-red-500 text-sm">
                    {errors.user_img.message as string}
                </p>
            )}
        </Card>
    )
}

export default ProfileImage
