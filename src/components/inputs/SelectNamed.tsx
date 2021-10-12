import React, {CSSProperties} from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel} from "@material-ui/core";
import {SelectInputProps} from "@material-ui/core/Select/SelectInput";
import {toIdValueMap} from "../../lib/map/toIdValueMap";
import NamedValue from "../../models/NamedValue";
import Tooltip from "@material-ui/core/Tooltip";
import Identifiable from "../../models/Identifyable";


export interface SelectNamedProps {
    label?: string;
    labelId?: string;
    placeholder?: string;
    options?: (NamedValue & { tooltip?: string })[];
    value: string | string[];
    onChange: SelectInputProps['onChange'];
    multiple?: boolean;
    fullWidth?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
    style?: CSSProperties;
    className?: string;
}

export const SelectNamed: React.FC<SelectNamedProps> =
    ({
         label,
         labelId,
         placeholder,
         options = [],
         value,
         onChange,
         multiple = false,
         fullWidth = false,
         variant = 'standard',
         className,
         ...rest
     }) => {

        const idValueMap = toIdValueMap(options);

        const renderValue = (selected: unknown): React.ReactNode => {
            if (typeof selected === 'object' && (selected as unknown[])?.length !== undefined) {
                return (selected as unknown[])?.map(u => {
                    if (typeof u === 'string') return idValueMap[u]?.name;
                    if (typeof u === 'object') return idValueMap[(u as Identifiable).id]?.name
                    return u;
                }).join(', ');

            }

            if ((selected as string[])?.length === 0) {
                return placeholder;
            }

            if (typeof selected === 'string') {
                return idValueMap[selected]?.name;
            }

            return "" + (placeholder !== undefined ? placeholder : "");
        }

        // if single select and string is not empty wrap in array
        const v = multiple ? value : !value ? value : [value];
        const lId = labelId || 'select-' + label?.toLowerCase() + '-label';
        const selecter = (
            <Select
                value={v ?? ''}
                onChange={onChange}
                renderValue={renderValue}
                multiple={multiple}
                fullWidth={fullWidth}
                labelId={lId}
                variant={variant}
                {...rest}
                displayEmpty
            >
                <MenuItem value={undefined} disabled>{label}</MenuItem>
                {options.map(({id, name, tooltip}) => (
                    <MenuItem key={id} value={id}>
                        <Tooltip title={tooltip ?? ''}>
                            <ListItemText
                                primary={name}
                            />
                        </Tooltip>
                        {multiple && <Checkbox checked={v?.indexOf(id) > -1}/>}
                    </MenuItem>
                ))}
            </Select>
        )

        if (placeholder) return selecter

        return (
            <FormControl fullWidth={fullWidth} className={className}>
                <InputLabel id={lId} variant={variant}>
                    {label}
                </InputLabel>
                {selecter}
            </FormControl>
        );
    }

export default SelectNamed;