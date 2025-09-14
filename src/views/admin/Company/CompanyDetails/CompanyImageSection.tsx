import { useState } from 'react'
import Card from '@/components/ui/Card'
import Upload from '@/components/ui/Upload'
import { FormItem } from '@/components/ui/Form'
import Dialog from '@/components/ui/Dialog'
import { Controller } from 'react-hook-form'
import { HiEye, HiTrash } from 'react-icons/hi'
import { PiImagesThin } from 'react-icons/pi'
import { Company } from '../CompanyList/types'

const ImagePreview = ({ company }: { company: Company }) => {
    const [viewOpen, setViewOpen] = useState(false)
   
    const formattedImage = company.commercial_id.startsWith('data:')
        ? company.commercial_id
        : `data:image/jpeg;base64,${company.commercial_id}`

        // if no commercial id but avatar 
        
   // console.log('Formatted Image:', formattedImage)
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

          
        </>
    )
}

export default ImagePreview
