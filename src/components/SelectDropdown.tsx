import { ChangeEvent, useEffect, useId, useRef } from "react";
import { Select, SelectOnChangeData } from "@fluentui/react-components";
import { SharedStyles } from "../util.ts";

const useStyles = SharedStyles.dropdown();

export interface Props {
    // Label displayed next to the dropdown
    label: string;

    // List of available options in the dropdown
    options: { value: string; label: string }[];

    // Current value selected in the dropdown (needs to be controlled by the caller)
    value: string;

    // Callback that should be called by the dropdown's onChange event (needs to update the value in the state)
    onChange: (value: string) => void;

    // Optional callback to call whenever the value changes, by the user or using the state from another component
    onValueChange?: (value: string) => void;
}

export default function SelectDropdown({ label, options, value, onChange, onValueChange }: Readonly<Props>) {
    const classes = useStyles();
    const ddId = useId();

    function handleChange(_: ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) {
        onChange(data.value);
    }

    // This is needed to tell React that onValueChange does not change as it is called in the useEffect call below
    const onValueChangeRef = useRef(onValueChange);

    useEffect(() => {
        if (onValueChangeRef.current)
            onValueChangeRef.current(value);
    }, [value]);

    return <div>
        <label htmlFor={ddId} className={classes.label}>{label}</label>
        <Select id={ddId} className={classes.dropdown} value={value} onChange={handleChange}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    </div>;
}
