import { Dropdown, makeStyles, Option, OptionOnSelectData, SelectionEvents } from "@fluentui/react-components";
import { useId } from "react";

const useStyles = makeStyles({
    label: {
        marginRight: "1rem",
    },
});

export default function Sort() {
    const classes = useStyles();

    const ddId = useId();

    function handleSelection(_: SelectionEvents, data: OptionOnSelectData) {
        if (data.optionValue == "asc")
            console.log("Normale sortering!");
        else
            console.log("Omgekeerde sortering??");
    }

    return <div>
        <label htmlFor={ddId} className={classes.label}>Sorteren:</label>
        <Dropdown
            id={ddId}
            inlinePopup
            defaultValue="A-Z"
            defaultSelectedOptions={["asc"]}
            onOptionSelect={handleSelection}
        >
            <Option value="asc">A-Z</Option>
            <Option value="desc">Z-A</Option>
        </Dropdown>
    </div>;
}
