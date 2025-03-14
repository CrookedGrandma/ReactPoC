interface Props {
    className: string;
}

export default function Head(props: Readonly<Props>) {
    return <div className={props.className}>Head</div>;
}
