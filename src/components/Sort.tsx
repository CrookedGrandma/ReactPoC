import { ChangeEvent, useId } from "react";
import { Select, SelectOnChangeData } from "@fluentui/react-components";
import { SharedStyles } from "../util.ts";

const useStyles = SharedStyles.dropdown();

export default function Sort() {
    const classes = useStyles();

    const ddId = useId();

    function handleChange(_: ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) {
        if (data.value == "asc")
            console.log("Normale sortering!");
        else
            console.log("Omgekeerde sortering??");
    }

    return <div>
        <label htmlFor={ddId} className={classes.label}>Sorteren:</label>
        <Select id={ddId} className={classes.dropdown} defaultValue="A-Z" onChange={handleChange}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
        </Select>
    </div>;
}
