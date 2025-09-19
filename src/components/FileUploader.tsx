import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

const FileUploader = ({
  label,
  file,
  onFileChange,
}: {
  label: string;
  file: File | null;
  onFileChange: (value: File | null) => void;
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      onFileChange(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center 
                     hover:border-gray-400 transition-colors duration-200 cursor-pointer
                     bg-gray-50 hover:bg-gray-100"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="video/*"
            className="hidden"
          />

          <div className="flex flex-col items-center gap-3">
            {/* Upload Icon */}
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <div className="text-sm text-gray-600">
              <span className="font-medium">{label}</span>
              <p className="mt-1">or drag and drop</p>
            </div>
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-500 text-center">
          {t("labels.allowed_file_formats")}: .mp4, .avi, .mov, .wmv, .flv,
          .mkv, .webm
        </div>

        {file && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              {/* File Icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div>
                <p className="font-medium">{t("labels.file_uploaded")}</p>
                <p className="text-sm mt-1 text-green-600">{file.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
