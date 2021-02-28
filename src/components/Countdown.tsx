
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    const {hasFinished, isActive, minutes, seconds, resetCountdown, startCountdown } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    // O padStart - Se a nossa string não tiver dois caracteres, ele vai add um zero na frente. Ex: '5' -> '05'
    //O split vai separar a string em uma array de string. Ex: 25 -> ['2', '5'] 

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