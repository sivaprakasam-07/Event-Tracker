import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ExcelUpload() {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error('Failed to upload file and insert data');
        console.error(error);
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls',
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer">
      <input {...getInputProps()} />
      <p>Drag & drop an Excel file here, or click to select one</p>
    </div>
  );
}

export default ExcelUpload;