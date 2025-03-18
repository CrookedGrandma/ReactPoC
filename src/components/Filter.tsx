import { Dropdown, makeStyles, Option, OptionOnSelectData, SelectionEvents } from "@fluentui/react-components";
import { useEffect, useId } from "react";
import { useFilter } from "./FilterContext.tsx";

const useStyles = makeStyles({
    label: {
        marginRight: "1rem",
    },
});

export default function Filter() {
    const classes = useStyles();

    const { selectedOption, setFilter, text } = useFilter();

    const ddId = useId();

    function handleSelection(_: SelectionEvents, data: OptionOnSelectData) {
        if (data.optionText == text)
            return;
        setFilter(data.optionText ?? "", data.selectedOptions[0]);
    }

    useEffect(() => {
        // Logic for when the filter value is changed
        console.log(`Filter value changed to: ${text}`);
    }, [text]);

    return <div>
        <label htmlFor={ddId} className={classes.label}>Filter</label>
        <Dropdown
            id={ddId}
            inlinePopup
            value={text}
            selectedOptions={[selectedOption]}
            onOptionSelect={handleSelection}
        >
            <Option value="alle">Alle</Option>
            <Option value="iets-anders">Iets anders</Option>
        </Dropdown>
    </div>;
}
