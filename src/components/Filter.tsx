import SelectDropdown from "./SelectDropdown";
import { useFilter } from "./context/FilterContext";

export default function Filter() {
    const { setFilter, value } = useFilter();

    function handleValueChange(value: string) {
        // Implement logic that should trigger whenever the value is changed (by the user or by another component)
        console.log(`Filter component value changed: ${value}`);
    }

    const filterOptions = [
        { value: "alle", label: "Alle" },
        { value: "iets-anders", label: "Iets anders" },
    ];

    return <SelectDropdown
        label="Filter"
        value={value}
        onChange={setFilter}
        options={filterOptions}
        onValueChange={handleValueChange}
    />;
}
