import "./QuestionCard.css";
import React from "react";
import { Container, Typography, Fab } from "@material-ui/core";

const QuestionCard = (props) => {
    const renderOptions = props.answers.map((answer) => {
        return (
            <Container key={answer}>
                <Fab
                    disabled={props.userAnswer ? true : false}
                    onClick={props.onClick}
                    value={answer}
                    variant="extended"
                >
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                </Fab>
            </Container>
        );
    });

    return (
        <Container key={props.questionNbr}>
            <Typography variant="h4" component="h4">
                Question {props.questionNbr} / {props.totalQuestions}
            </Typography>
            <Typography variant="h6" component="h6">
                <i dangerouslySetInnerHTML={{ __html: props.question }} />
            </Typography>
            {renderOptions}
            {props.userAnswer ? (
                <Container
                    className={
                        props.userAnswer === props.correctAnswer
                            ? "green"
                            : "red"
                    }
                >
                    <i style={{ color: "white" }}>
                        {props.userAnswer === props.correctAnswer
                            ? "Correct answer."
                            : `Wrong answer. Correct one is ${props.correctAnswer}`}
                    </i>
                </Container>
            ) : null}
        </Container>
    );
};

export default QuestionCard;
