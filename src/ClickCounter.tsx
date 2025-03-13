import { Button } from "@fluentui/react-components";
import { useState } from "react";

export function ClickCounter() {
    const [count, setCount] = useState(0);
    return <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>;
}
