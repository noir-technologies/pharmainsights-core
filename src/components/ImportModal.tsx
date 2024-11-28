import React, { useState } from 'react';
import { showSuccessAlert, showErrorAlert } from '../utils/alertUtils';

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    context: 'products' | 'inventories';
    onSuccess?: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, context, onSuccess }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            showErrorAlert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const endpoint =
            context === 'products'
                ? 'http://localhost:5229/api/product/import'
                : 'http://localhost:5229/api/inventory/import';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem('token') }`,
                },
            });

            if (!response.ok) {
                throw new Error('File upload failed');
            }

            showSuccessAlert('File uploaded successfully!');
            onClose();
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            showErrorAlert('Error uploading file.');
        }
    };

    const title = context === 'products' ? 'Import Products' : 'Import Inventories';

    return (
        <div
            className={ `fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${ isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }` }
        >
            <div className="bg-white rounded-lg shadow-lg w-[20vw] p-6">
                <h2 className="text-xl font-bold mb-4">{ title }</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="file">
                        Upload File
                    </label>
                    <input
                        type="file"
                        id="file"
                        accept=".xls, .xlsx, .csv"
                        onChange={ handleFileChange }
                        className="file-input file-input-bordered w-full bg-blue-100"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={ onClose }
                        className="btn btn-outline"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={ handleUpload }
                        className="btn btn-primary"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImportModal;
