import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { white, purple, gray, lightPurp, red, azure, customRedColor } from '../utils/colors';
import { connect } from 'react-redux';
import { removeDeck } from '../actions';
import Deck from './Deck';
import ClickButton from './ClickButton';
import TextButton from './TextButton';

class DeckDetails extends Component {
    handleDelete = title => {
        const { removeDeck, navigation } = this.props;
        removeDeck(title);
        navigation.navigate("Decks");
    };
    render() {
        const { deck } = this.props;
        return (
            <View style={styles.container}>
                <Deck id={deck && deck.title} />
                <View>

                    <ClickButton
                        btnStyle={{ backgroundColor: customRedColor, borderColor: gray }}
                        txtStyle={{ color: white }}
                        onPress={() =>
                            this.props.navigation.navigate('Quiz', { title: deck.title })
                        }>
                        Start Quiz</ClickButton>

                    <ClickButton
                        btnStyle={{ backgroundColor: azure, borderColor: gray }}
                        txtStyle={{ color: white }}
                        onPress={() =>
                            this.props.navigation.navigate('NewCard', { title: deck.title })
                        }>
                        Add Card </ClickButton>
                    <TextButton
                        style={styles.deleteText}
                        onPress={() => this.handleDelete(deck.title)}
                    >
                        Delete Deck
                    </TextButton>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'space-around',
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: white
    },
    deleteText: {
        fontSize: 25,
        textAlign: 'center',
        color: 'red',
        paddingBottom: 20,
      },
});

const mapStateToProps = (state, { navigation }) => {
    // console.log("deckdetails currentRoute: ", navigation.getParam('title', 'undefined'));
    const currentRoute = navigation.getParam('title', 'undefined');
    const deck = state[currentRoute];

    // console.log("deckdetails deck: ", state[currentRoute]);
    return {
        deck
    };
};

const mapDispatchToProps = (dispatch) => (
    {
        removeDeck: (title) => dispatch(removeDeck(title)),
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
