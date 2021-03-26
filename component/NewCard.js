import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { white, purple, gray, lightPurp, azure } from '../utils/colors';
import { connect } from 'react-redux';
import ClickButton from './ClickButton';
import { addCardToTheDeck } from '../actions';


class NewCard extends Component {
    state = {
        question: '',
        answer: ''
    };
    handleQuestionChange = question => {
        // console.log("testChange => ", question);
        this.setState({ question });
    };

    handleAnswerChange = answer => {
        this.setState({ answer });
    };

    handleSubmit = () =>{
        console.log("This props => " , this.props);
        const {title, navigation, addCardToTheDeck} = this.props;
        const card = {
            question: this.state.question,
            answer: this.state.answer
          };
          console.log(JSON.stringify(card), title);
          addCardToTheDeck(title, card);
          //clean
          this.setState({ question: '', answer: '' });
          //navigate to detail
          navigation.navigate("DeckDetails");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>NewCard</Text>
                <View>
                    <View style={styles.block}>
                        <Text style={styles.title}>Add a new question</Text>
                    </View>
                    <View style={[styles.block]}>
                        <TextInput
                            style={styles.input}
                            value={this.state.question}
                            onChangeText={this.handleQuestionChange}
                            placeholder="Question Here"
                            autoFocus={true}
                            returnKeyType="next"
                            onSubmitEditing={() => this.answerTextInput.focus()}
                            blurOnSubmit={false}
                        />
                    </View>

                    <View style={[styles.block]}>
                        <TextInput
                            style={styles.input}
                            value={this.state.answer}
                            onChangeText={this.handleAnswerChange}
                            placeholder="Answer"
                            ref={input => {
                                this.answerTextInput = input;
                            }}
                            returnKeyType="done"
                            onSubmitEditing={this.handleSubmit}
                        />
                    </View>
                    <ClickButton
                        btnStyle={{ backgroundColor: azure, borderColor: gray }}
                        txtStyle={{ color: white }}
                        onPress={this.handleSubmit}
                        disabled={this.state.question === '' || this.state.answer === ''}>
                        Submit
                    </ClickButton>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: white,
        justifyContent: 'space-around'
    },
    block: {
        marginBottom: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 32
    },
    input: {
        borderWidth: 1,
        borderColor: purple,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        fontSize: 20,
        height: 40
    }
});

const mapStateToProps = (state, { navigation }) => {
    //currentRoute
    const title = navigation.getParam('title', 'undefined');
    return {
        title
    };
};


const mapDispatchToProps = (dispatch) => (
    {
        addCardToTheDeck: (title, card) => dispatch(addCardToTheDeck(title, card))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);