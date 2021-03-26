import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllDecks } from '../actions';
import { connect } from 'react-redux';
import Deck from '../component/Deck';


class Decks extends Component {

    componentDidMount() {
        this.props.getAllDecks();
    }
    
    render() {

        const { decks, navigation} = this.props;
        const deckListing = Object.values(decks).map(deck => {
            console.log(JSON.stringify({ title: deck.questions }));

            return (
                //TouchableOpacity: the button where to press
                <TouchableOpacity
                    key={deck.title}
                    onPress={() =>
                        navigation.navigate('DeckDetails', { title: deck.title })
                    }
                >
                  <Deck id={deck.title} />
                </TouchableOpacity>
                
            );
        })

        return (
            <ScrollView style={styles.container}>
              {deckListing}
              <View style={{ marginBottom: 30 }} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 16,
      paddingRight: 16,
      backgroundColor: 'white',
      paddingLeft: 16,
      paddingBottom: 16,
    },
});

// refer to reducers/index.js
const mapStateToProps = state => ({ decks: state });

//receiveDecksAction
const mapDispatchToProps = (dispatch) => (
    {
       getAllDecks: () => dispatch(getAllDecks()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Decks);