import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import QuizError from "./QuizError";
import QuizResult from './QuizResult';
import { black, white, red, green, azure, lightPurp, gray, customRedColor } from '../../utils/colors';
import ClickButton from "../ClickButton"
import TextButton from '../TextButton';

class Quiz extends Component {

    state = {
        title: '',
        currentQuestion: '',
        currentAnswer: '',
        correctAnswer: 0,
        incorrectAnswer: 0,
        questionNumber: 0,
        numberOfQuestions: 0,
        score: 0,
        quizFinished: false,
        errorShow: false,
        questions: ''
    }

    checkAnswer = () => {
        if (this.state.currentAnswer === '') {
            this.setState({
                currentAnswer: this.state.questions[this.state.questionNumber - 1].answer,
                errorShow: false
            })
        }

    }

    // componentDidMount() {
    //     clearLocalNotification().then(setLocalNotification);
    // }

    componentWillMount() {
        console.log("componenetWillMount => ", this.props);
        const { navigation, deck } = this.props;
        const title = navigation.getParam('title', 'undefined');
        const questions = deck.questions;
        const currentQuestion = questions.length != 0 ? questions[0].question : "";

        this.setState({
            title: title,
            currentQuestion: currentQuestion,
            questionNumber: 1,
            questions: questions,
            numberOfQuestions: questions.length,
            quizFinished: false,
            errorShow: false,
        })
    }

    nextQuestion = (isCorrect) => {
        if (this.state.currentAnswer === '') {
            this.setState({
                errorShow: true
            })
        } else {
            if (isCorrect) {
                this.setState({
                    correctAnswer: this.state.correctAnswer + 1
                });
                this.updateScore();
            } else {
                this.setState({
                    incorrectAnswer: this.state.incorrectAnswer + 1
                });
            }

            this.updateQuestion();
        }
    }
    updateScore = () => {
        const newScore = this.state.score + 1;
        this.setState({
            score: newScore
        })
    }
    updateQuestion = () => {
        const newQuestionNumber = this.state.questionNumber + 1;
        if (newQuestionNumber - 1 < this.state.numberOfQuestions) {
            this.setState({
                currentAnswer: '',
                currentQuestion: this.state.questions[newQuestionNumber - 1].question,
                questionNumber: newQuestionNumber,
            })
        } else {
            this.setState({
                quizFinished: true
            })
        }
    }
    resetQuiz = () => {
        this.setState({
          title: '',  
          currentQuestion: this.state.questions[0].question,
          currentAnswer: '',
          correctAnswer: 0,
          incorrectAnswer: 0,
          questionNumber: 1,
          score: 0,
          quizFinished: false,
          errorShow: false,
        });
    }
    backToDeckDetails = () => {
        this.props.navigation.navigate(
          'Decks'
        );
    }

    render() {
        console.log("render =>", this.state);
        const { 
            title,
            score, 
            quizFinished, 
            currentQuestion, 
            currentAnswer, 
            errorShow, 
            incorrectAnswer, 
            numberOfQuestions, 
            correctAnswer,
            questionNumber } = this.state;
        console.log("quizFinished : ", quizFinished);

        //no cards in deck, show error
        if (numberOfQuestions === 0) {
            return <QuizError />;
        }

        if(quizFinished === true){
            const scorePercentValue = ((correctAnswer / numberOfQuestions) * 100).toFixed(0);
            return (
                <QuizResult
                    deck={this.props.deck}
                    navigation={this.props.navigation}
                    handleReset={this.resetQuiz}
                    percent={scorePercentValue}
                    correctAnswer = {correctAnswer}
                    incorrectAnswer = {incorrectAnswer}
                    score = {score}
                    returnBack = {this.backToDeckDetails}
                    quizFinished = {quizFinished}
                />
            );
        }

        return (
            <View style={styles.mainView}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, alignItems: 'flex-start', color: gray }}>Deck: {title} Quiz</Text>
                    <Text style={{ fontSize: 20, alignItems: 'flex-end', color: gray }}>Remain questions: {numberOfQuestions - questionNumber}</Text>
                    <Text style={{ fontSize: 20, alignItems: 'flex-end', color: gray }}>Score: {score}</Text>

                </View>


                <Text style={styles.questionText}>
                    Question: {currentQuestion}
                </Text>
                <Text style={styles.answerText}>
                    {"Answer: " + currentAnswer}
                </Text>
                { errorShow &&
                    <Text style={styles.answerText}>
                        Before go to next card, please check the answer first.
                    </Text>
                }

                <TextButton style={styles.buttonText}
                    onPress={() => this.checkAnswer()}>
                    Check Answer
                </TextButton>

                <ClickButton
                    btnStyle={{ backgroundColor: green, borderColor: white }}
                    onPress={() => this.nextQuestion(true)}
                    disabled={quizFinished == true}
                >Correct
                </ClickButton>
                <ClickButton
                    btnStyle={{ backgroundColor: red, borderColor: white }}
                    onPress={() => this.nextQuestion(false)}
                    disabled={quizFinished == true}
                >Wrong
                </ClickButton>
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: white,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 20,
        color: gray
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: gray,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    answerText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: customRedColor,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: white,
        backgroundColor: gray,
        paddingTop: 20,
        paddingBottom: 20,
        padding: 20,
        borderColor: gray,
        borderRadius: 5,
        borderWidth: 1
    }
});

const mapStateToProps = (state, { navigation }) => {
    const title = navigation.getParam('title', 'undefined');
    const deck = state[title];

    return {
        deck
    };
};


export default connect(mapStateToProps)(Quiz);