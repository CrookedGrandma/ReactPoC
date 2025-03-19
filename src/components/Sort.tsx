import { ChangeEvent, useEffect, useId } from "react";
import { Select, SelectOnChangeData } from "@fluentui/react-components";
import { SharedStyles } from "../util.ts";
import { useSort } from "./context/SortContext.tsx";

const useStyles = SharedStyles.dropdown();

export default function Sort() {
    const classes = useStyles();

    const { setSort, value } = useSort();

    const ddId = useId();

    function handleChange(_: ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) {
        setSort(data.value);
    }

    useEffect(() => {
        // Logic for when the sort value is changed
        console.log(`Sorting: ${value}`);
    }, [value]);

    return <div>
        <label htmlFor={ddId} className={classes.label}>Sorteren:</label>
        <Select id={ddId} className={classes.dropdown} value={value} onChange={handleChange}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
        </Select>
    </div>;
}
