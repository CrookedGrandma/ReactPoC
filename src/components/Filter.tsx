import { ChangeEvent, useEffect, useId } from "react";
import { Select, SelectOnChangeData } from "@fluentui/react-components";
import { SharedStyles } from "../util.ts";
import { useFilter } from "./FilterContext.tsx";

const useStyles = SharedStyles.dropdown();

export default function Filter() {
    const classes = useStyles();

    const { setFilter, value } = useFilter();

    const ddId = useId();

    function handleChange(_: ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) {
        setFilter(data.value);
    }

    useEffect(() => {
        // Logic for when the filter value is changed
        console.log(`Filter value changed to: ${value}`);
    }, [value]);

    return <div>
        <label htmlFor={ddId} className={classes.label}>Filter</label>
        <Select id={ddId} className={classes.dropdown} value={value} onChange={handleChange}>
            <option value="alle">Alle</option>
            <option value="iets-anders">Iets anders</option>
        </Select>
    </div>;
}
