import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;
export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    // O padStart - Se a nossa string não tiver dois caracteres, ele vai add um zero na frente. Ex: '5' -> '05'
    //O split vai separar a string em uma array de string. Ex: 25 -> ['2', '5'] 

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button disabled className={styles.countdownButton}>
                    <p>
                        Ciclo encerrado
                        <img src="icons/happy.svg" height='40px' width='40px' alt=""/>
                    </p>
                </button>
            ) : (
                    <>
                        {isActive ? (
                            <button onClick={resetCountdown} type='button' className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                                Abandonar ciclo
                            </button>
                        ) : (
                                <button onClick={startCountdown} type='button' className={styles.countdownButton}>
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>
                )}


        </div>
    );
}