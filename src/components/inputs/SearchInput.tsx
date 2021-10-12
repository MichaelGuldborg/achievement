import React from 'react';
import SearchIcon from 'remixicon-react/Search2LineIcon';
import Box from '@material-ui/core/Box/Box';
import RoundTextField from "../material/RoundTextField";
import {InputAdornment, InputBaseProps} from "@material-ui/core";

export interface SearchProps {
    search: string;
    onChange: (search: string) => void;
    box?: true;
    width?: React.CSSProperties["width"];
}

type SearchInputProps = SearchProps & Omit<InputBaseProps, "onChange">;

export const SearchInput: React.FC<SearchInputProps> = ({search, box, width, onChange, ...props}) => {
    return (
        <Box height={box ? 64 : undefined}
             display='flex'
             alignItems='center'
             justifyContent='center'
             width={width}
        >
            <RoundTextField
                placeholder="Søg …"
                value={search}
                fullWidth
                startAdornment={
                    <InputAdornment position='start'>
                        <SearchIcon size={17}/>
                    </InputAdornment>
                }
                onChange={(event) => onChange(event.target.value)}
                {...props}
            />
        </Box>

    )
};

export default SearchInput