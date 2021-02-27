import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenges {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    startNewChallenge: () => void; 
    levelUp: () => void; 
    resetChallenge: () => void;
    completeChallenge: () => void;
    level: number; 
    currentExperience: number;  
    challengesCompleted: number; 
    activeChallenge: Challenges;
    experienceToNextLevel: number;
}

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) return;

        const { amount } = activeChallenge;

        //let it changes -> Deixe isso mudar
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience -= experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level,
                levelUp,
                currentExperience, 
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}