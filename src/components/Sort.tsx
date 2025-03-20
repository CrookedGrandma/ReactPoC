import SelectDropdown from "./SelectDropdown";
import { useSort } from "./context/SortContext";

export default function Sort() {
    const { setSort, value } = useSort();

    function handleValueChange(value: string) {
        // Implement logic that should trigger whenever the value is changed (by the user or by another component)
        console.log(`Sort component value changed: ${value}`);
    }

    const sortOptions = [
        { value: "asc", label: "A-Z" },
        { value: "desc", label: "Z-A" },
    ];

    return <SelectDropdown
        label="Sorteren:"
        value={value}
        onChange={setSort}
        options={sortOptions}
        onValueChange={handleValueChange}
    />;
}
