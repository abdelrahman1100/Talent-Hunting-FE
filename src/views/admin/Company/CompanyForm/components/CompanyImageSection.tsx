import { useState } from 'react'
import Card from '@/components/ui/Card'
import Upload from '@/components/ui/Upload'
import { FormItem } from '@/components/ui/Form'
import Dialog from '@/components/ui/Dialog'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Controller } from 'react-hook-form'
import { HiEye, HiTrash } from 'react-icons/hi'
import { PiImagesThin } from 'react-icons/pi'

import type { FormSectionBaseProps } from '../types'
type ImageSectionProps = FormSectionBaseProps

const ImagePreview = ({
    image,
    onDelete,
}: {
    image: string
    onDelete: () => void
}) => {
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const formattedImage = image.startsWith('data:')
        ? image
        : `data:image/jpeg;base64,${image}`

    console.log('Formatted Image:', formattedImage)
    return (
        <>
            <div className="group relative rounded-xl border border-gray-200 dark:border-gray-600 p-2 flex justify-center items-center">
                <img
                    className="rounded-lg w-full h-48 object-contain dark:bg-transparent"
                    src={formattedImage}
                    alt="Uploaded"
                />
                <div className="absolute inset-0 bg-[#000000ba] group-hover:flex hidden text-xl items-center justify-center gap-2">
                    <span
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        onClick={() => setViewOpen(true)}
                    >
                        <HiEye />
                    </span>
                    <span
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        onClick={() => setDeleteConfirmationOpen(true)}
                    >
                        <HiTrash />
                    </span>
                </div>
            </div>

            <Dialog
                isOpen={viewOpen}
                onClose={() => setViewOpen(false)}
                onRequestClose={() => setViewOpen(false)}
            >
                <h5 className="mb-4">Preview</h5>
                <img className="w-full" src={formattedImage} alt="Preview" />
            </Dialog>

            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove image"
                onClose={() => setDeleteConfirmationOpen(false)}
                onRequestClose={() => setDeleteConfirmationOpen(false)}
                onCancel={() => setDeleteConfirmationOpen(false)}
                onConfirm={() => {
                    onDelete()
                    setDeleteConfirmationOpen(false)
                }}
            >
                <p> Are you sure you want to remove this image? </p>
            </ConfirmDialog>
        </>
    )
}

const ImageSection = ({ control, errors }: ImageSectionProps) => {
    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true
        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 500000

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot be more than 500kb!'
                }
            }
        }

        return valid
    }

    const handleUpload = async (
        onChange: (image: string | null) => void,
        files: File[],
    ) => {
        if (!files.length) return
        const latestUpload = files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            onChange(reader.result as string)
        }
        reader.readAsDataURL(latestUpload)
    }

    const handleImageDelete = (onChange: (image: string | null) => void) => {
        onChange(null)
    }

    return (
        <Card id="companyImage">
            <h4 className="mb-2">Company Commercial Image</h4>
            <p>Choose a company commercial photo. Only one image is allowed.</p>
            <div className="mt-4">
                <FormItem
                    invalid={Boolean(errors.commercial_id)}
                    errorMessage={errors.commercial_id?.message}
                    className="mb-4"
                >
                    <Controller
                        name="commercial_id"
                        control={control}
                        render={({ field }) => (
                            <>
                                {field.value ? (
                                    <div className="grid grid-cols-1 gap-2">
                                        <ImagePreview
                                            image={field.value}
                                            onDelete={() =>
                                                handleImageDelete(
                                                    field.onChange,
                                                )
                                            }
                                        />
                                        <Upload
                                            draggable
                                            beforeUpload={beforeUpload}
                                            showList={false}
                                            multiple={false}
                                            onChange={(files) =>
                                                handleUpload(
                                                    field.onChange,
                                                    files,
                                                )
                                            }
                                        >
                                            <div className="max-w-full flex flex-col px-4 py-2 justify-center items-center min-h-[130px]">
                                                <div className="text-[50px]">
                                                    <PiImagesThin />
                                                </div>
                                                <p className="text-center mt-1 text-xs">
                                                    Replace image
                                                </p>
                                            </div>
                                        </Upload>
                                    </div>
                                ) : (
                                    <Upload
                                        draggable
                                        beforeUpload={beforeUpload}
                                        showList={false}
                                        multiple={false}
                                        onChange={(files) =>
                                            handleUpload(field.onChange, files)
                                        }
                                    >
                                        <div className="max-w-full flex flex-col px-4 py-8 justify-center items-center">
                                            <div className="text-[60px]">
                                                <PiImagesThin />
                                            </div>
                                            <p className="flex flex-col items-center mt-2">
                                                Drop your image here or Click to
                                                browse
                                            </p>
                                        </div>
                                    </Upload>
                                )}
                            </>
                        )}
                    />
                </FormItem>
            </div>
            <p>Image formats: .jpg, .jpeg, .png. Max size: 500kb.</p>
        </Card>
    )
}

export default ImageSection
