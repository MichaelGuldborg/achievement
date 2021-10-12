import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import ImageInput, {ImageInputProps} from "./ImageInput";
import toInitials from "../../lib/string/toInitials";

export interface AvatarInputProps extends ImageInputProps {
    src?: string;
    name?: string;
}

const AvatarInput: React.FC<AvatarInputProps> = ({id, name, src, ...rest}) => {
    return (
        <ImageInput id={id} {...rest}>
            <IconButton component="span">
                <Avatar
                    src={src}
                    imgProps={{style: {objectFit: 'contain'}}}
                    style={{height: 120, width: 120, objectFit: 'contain'}}
                    alt={id + ' avatar'}
                >
                    {toInitials(name)}
                </Avatar>
            </IconButton>
        </ImageInput>
    )
}

export default AvatarInput;
