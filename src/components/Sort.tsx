import FotoboekContext from "./context/Contexts.tsx";
import SelectDropdown from "./SelectDropdown";

export default function Sort() {
    const { setValue: setSort, value } = FotoboekContext.Sort.useValue();

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
