import React from "react";

export interface ImageInputProps {
    id?: string;
    onChange: (file: File) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({id, children, onChange}) => {
    const inputId = id + '-file-input';
    return (
        <React.Fragment>
            <input
                accept="image/*"
                style={{display: 'none'}}
                id={inputId}
                type="file"
                onChange={async (event) => {
                    if (!event.target.files?.length) {
                        return;
                    }
                    const file = event.target.files[0];
                    onChange && onChange(file);
                }}
            />
            <label htmlFor={inputId} style={{cursor: 'pointer'}}>
                {children}
            </label>
        </React.Fragment>
    )
}
export default ImageInput;