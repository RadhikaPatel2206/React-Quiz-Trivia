import "./QuestionCard.css";
import React from "react";

const QuestionCard = (props) => {
    const renderOptions = props.answers.map((answer) => {
        const classProp = `option-button ${
            props.userAnswer
                ? answer === props.correctAnswer
                    ? "green"
                    : props.userAnswer === answer
                    ? "red"
                    : ""
                : ""
        }`;

        return (
            <div key={answer}>
                <button
                    className={classProp}
                    disabled={props.userAnswer ? true : false}
                    onClick={props.onClick}
                    value={answer}
                >
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
            </div>
        );
    });

    return (
        <div className="question-card" key={props.questionNbr}>
            <h4 className="question-number">
                Question {props.questionNbr} / {props.totalQuestions}
            </h4>
            <h6
                className="question-title"
                dangerouslySetInnerHTML={{ __html: props.question }}
            />
            {renderOptions}
            {/* {props.userAnswer ? (
                <div
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
                </div>
            ) : null} */}
        </div>
    );
};

export default QuestionCard;
