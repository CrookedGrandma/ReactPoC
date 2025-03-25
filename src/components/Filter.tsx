import FotoboekContext from "./context/Contexts.tsx";
import SelectDropdown from "./SelectDropdown";

export enum FilterValue {
    Alle = "alle",
    SingleDigit = "single-digit",
}

export default function Filter() {
    const { setValue: setFilter, value } = FotoboekContext.Filter.useValue();

    function handleValueChange(value: string) {
        // Implement logic that should trigger whenever the value is changed (by the user or by another component)
        console.log(`Filter component value changed: ${value}`);
    }

    const filterOptions = [
        { value: FilterValue.Alle, label: "Alle" },
        { value: FilterValue.SingleDigit, label: "< 10" },
    ];

    return <SelectDropdown
        label="Filter"
        value={value}
        onChange={setFilter}
        options={filterOptions}
        onValueChange={handleValueChange}
    />;
}
