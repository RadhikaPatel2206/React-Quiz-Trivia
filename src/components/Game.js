import React, { useState } from "react";
import {
    Container,
    Button,
    Typography,
    CircularProgress,
} from "@material-ui/core";

import opentdb from "../api/opentdb";
import QuestionCard from "./QuestionCard";

const TOTAL_QUESTIONS = 10;

const GameCard = () => {
    const [loading, setLoading] = useState(false);
    const [gameOver, setGameOver] = useState(true);
    const [number, setNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);
        setNumber(0);
        setScore(0);
        setUserAnswers([]);

        const { data } = await opentdb.get();
        setQuestions(data.results.map((result) => result.question));
        setAnswers(
            data.results.map((result) => [
                ...result.incorrect_answers,
                result.correct_answer,
            ])
        );
        setCorrectAnswers(data.results.map((result) => result.correct_answer));
        setLoading(false);
    };

    const checkAnswer = (event) => {
        if (!gameOver) {
            // User answer
            const answer = event.currentTarget.value;

            // Check answer against correctAnswer
            const correct = answer === correctAnswers[number];

            // Update score depending on correct answer or not
            if (correct) setScore((prev) => prev + 1);

            // Save the answer in the array for user answers
            setUserAnswers((prev) => [...prev, answer]);
        }
    };

    const nextQuestion = () => {
        const nextQ = number + 1;
        if (nextQ === TOTAL_QUESTIONS - 1) {
            setGameOver(true);
        } else {
            setNumber(nextQ);
        }
    };

    return (
        <Container>
            <Typography variant="h2" component="h2">
                React Quiz Trivia
            </Typography>

            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <Button variant="contained" onClick={startTrivia}>
                    Start
                </Button>
            ) : null}

            {loading ? <CircularProgress /> : null}

            {!loading && !gameOver && (
                <React.Fragment>
                    <Container>Score: {score}</Container>
                    <QuestionCard
                        questionNbr={number + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        question={questions[number]}
                        answers={answers[number]}
                        userAnswer={
                            userAnswers ? userAnswers[number] : undefined
                        }
                        correctAnswer={correctAnswers[number]}
                        onClick={checkAnswer}
                    />
                </React.Fragment>
            )}

            {!loading &&
            !gameOver &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1 ? (
                <Button onClick={nextQuestion} variant="contained">
                    Next Question
                </Button>
            ) : null}
        </Container>
    );
};

export default GameCard;
