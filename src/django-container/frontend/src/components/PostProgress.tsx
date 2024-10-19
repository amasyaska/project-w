export type PostProgressProps = {
    current: number;
    total: number;
};

export default function PostProgress({current, total}: PostProgressProps) {

    return <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: `${current / total * 100}%`}}
             aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}></div>
    </div>;
}
