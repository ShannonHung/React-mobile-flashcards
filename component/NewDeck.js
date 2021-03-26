import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { white, purple, gray, lightPurp, azure } from '../utils/colors';
import { connect } from 'react-redux';
import ClickButton from './ClickButton';
import { addDeck } from '../actions';


class NewDeck extends Component {
    state = {
        name: ''
    };
    handleDeckNameChange = name =>{
        console.log("testChange" , name);
        this.setState({ name });
    }
    handleSubmit = () =>{
        console.log("This props => " , this.state);
        const {title, navigation, addDeck} = this.props;
        const {name} = this.state            
          addDeck(name);
        //   //clean
          this.setState({ name: '' });
        //   console.log(this.props);
        //   navigate to detail
          navigation.navigate("Decks");
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>NewDeck</Text>
                <View>
                    <View style={styles.block}>
                        <Text style={styles.title}>Add a new Deck</Text>
                    </View>
                    <View style={[styles.block]}>
                        <TextInput
                            style={styles.input}
                            value={this.state.question}
                            onChangeText={this.handleDeckNameChange}
                            placeholder="Deck Name Here"
                            autoFocus={true}
                            returnKeyType="next"
                            onSubmitEditing={() => this.answerTextInput.focus()}
                            blurOnSubmit={false}
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
        addDeck: (title) => dispatch(addDeck(title))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);