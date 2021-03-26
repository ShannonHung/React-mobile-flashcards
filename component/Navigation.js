import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Decks from './Decks';
import NewDeck from './NewDeck';
import DeckDetails from './DeckDetails';
import NewCard from './NewCard';
import Quiz from './Quiz/Quiz';
import { white, lightPurp, black, purple, red } from '../utils/colors'

const Tabs = createBottomTabNavigator(
    {
        Decks: {
            screen: Decks,
            navigationOptions: {
                title: 'FlashCards',
                tabBarLabel: 'Decks',
                tabBarIcon: ({ tintColor }) => <Ionicons name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} size={30} color={tintColor} />
            }
        },
        NewDeck: {
            screen: NewDeck,
            navigationOptions: {
                title: 'FlashCards',
                tabBarLabel: 'New Deck',
                tabBarIcon: ({ tintColor }) => <Ionicons name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'} size={30} color={tintColor} />
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: lightPurp,
            style: {
                backgroundColor: white,
            },
        }
    }
);

Tabs.navigationOptions = ({ navigation }) => {
    //current routename
    const { routeName } = navigation.state.routes[navigation.state.index];
    // console.log("navigation => ", routeName);

    const headerTitle = routeName;
    return {
        headerTitle,
    };
};

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: {
            headerTintColor: lightPurp,
            headerStyle: {
                backgroundColor: white
            }
        }
    },
    NewCard: {
        screen: NewCard,
        navigationOptions: {
            headerTintColor: lightPurp,
            headerStyle: {
                backgroundColor: white
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: lightPurp,
            headerStyle: {
                backgroundColor: white
            }
        },
    },
},
    {
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS, // https://reactnavigation.org/docs/4.x/stack-navigator/ -> TransitionPresets
        },
    }
)

export default createAppContainer(MainNavigator);