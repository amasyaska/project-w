import style from './PostProgress.module.css';

export type PostProgressProps = {
    current: number;
    goal: number;
};

export default function PostProgress({current, goal}: PostProgressProps) {
    const currentShort = current >= 1000 ? `${(current / 1000).toFixed(2)}` : current;
    const goalShort = current >= 1000 ? `${(goal / 1000).toFixed(2)} тис.` : goal;

    return <div className={style.progress}>
        <span className={style.percent}>
            Залишилось {(100 - current / goal * 100).toFixed(2)}%
        </span>
        <div className={style.bar}
             role="progressbar"
             aria-valuenow={current} aria-valuemin={0} aria-valuemax={goal}
             style={{height: `${current / goal * 100}%`}}>
            <span className={style.goal}>
                {currentShort} / {goalShort} грн
            </span>
        </div>
    </div>;
}
