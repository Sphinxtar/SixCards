import React, {useReducer, useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

//		hand: "123456", shuffled string player is trying to guess inside gState
//		guessnum, 0, times submitted a valid string to check
// 		guess: "", current contents of input field to check against hand
//		hitz: "000000" cards guessed right or zero
//		GAME STATES: 
//				DEAL    show splash and initialize the game 
//			CHECKING  action validates hand vs. hitz and sets - game in progress
//				WON	    we have a winner
//				LOST    loser

export default function App() {
  const [ hand, setHand ] = useState("123456");
  const [ hitz, setHitz ] = useState("123456");
	const [ guess, changeGuess ] = useReducer(guessReducer, new String );
	const [ guessnum, setGuessnum ] = useReducer(guessnumReducer, new Number );
	const [ gstate, setGstate ] = useReducer( gstateReducer, "DEAL");

  useEffect(() => {
		setTimeout(() => {  console.log("sleeping 3 seconds"); }, 3000);
	});

// card pix
const logo = require('./img/sixcard.jpg');
const cards = [ 
require('./img/back.jpg'),
require('./img/one.jpg'),
require('./img/two.jpg'),
require('./img/three.jpg'),
require('./img/four.jpg'),
require('./img/five.jpg'),
require('./img/six.jpg')
];

  function gstateReducer(state, action) {
//		console.log( "gStateReducer state: " + state + " guessnum: " + guessnum + " action: " + action );
		var retval = "";
	  switch ( action ) {
				case "DEAL":
						var tmp;
						var x;
						var shuffles = [ '1', '2', '3', '4', '5', '6' ];
						for ( var i = 0; i < 6; i++ ) {
								x = (getrand(1, 6) - 1); 
								tmp = shuffles[ x ];
								shuffles[ x ] =  shuffles[ i ];
								shuffles[ i ] = tmp;
						}
//						console.log( "shuffles: " + shuffles );
						setHand( shuffles );
						setHitz( "000000" );
						retval = "CHECKING";
						break;
				case "CHECKING":
						var hit = [ '0', '0', '0', '0', '0', '0' ];
						for ( var i = 0; i < guess.length; i++ ) {
								if ( hand[ i ] == guess[ i ] ) 
										hit[ i ] = hand[ i ];
						}
						setHitz( hit );
						if ( guessnum > 3 && hit.join("") != hand.join("")) {
//								console.log( "gStateReducer guessnum: " + guessnum );
								retval = "LOST";
						} else if ( hit.join("") == hand.join("")) {
//								console.log( "gStateReducer hit: " + hit.join("") + " hand: " + hand.join(""));
								retval = "WON";
			 			} else {
								retval = "CHECKING";
						}
						changeGuess( "" );
						break;
				default:
						console.log( "unknown action: " + action );
						break;
		}
		return( retval );
  }

	function guessReducer(state, action) {
		var numbers = "123456"
		let val = action;
		if ( numbers.indexOf( action[ action.length - 1 ]) < 0 ) {
			val = state;
		}
		if ( state.indexOf( action[ action.length - 1 ] ) >= 0 ) {
			val = state;
		}
		if ( action.length < state.length ) {
			val = action;
		}
  		return( val )
	}

	function guessnumReducer(state, action) { 
//		console.log( "guessnumReducer state: " + state + " action: " + action + " guess.length: " + guess.length );
		let val = new Number(action);
		return( val );
	}

	function handleSubmit( e ) {
//		console.log( "handleSubmit: gstate: " + gstate + " guess.length: " + guess.length + " guess: " + guess + " guessnum: " + guessnum + " hand: " + hand  + " hitz: " + hitz );
		if (( gstate == "DEAL" )||( gstate == "WON" )||( gstate == "LOST" )) {
				setGstate( "DEAL" );
				setGuessnum(0);
		} else if ( gstate == "CHECKING" && guess.length < 6 ) {
				alert( "Guess Too Short" );
		} else if ( gstate == "CHECKING" && guess.length == 6 ) {
				setGstate( "CHECKING" );
				setGuessnum( guessnum + 1 );
		}
    if ( e )
			e.preventDefault();
  }

  function getrand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

const showCards = (
		<View style={styles.cardtable}>
		<Image style={styles.card} source={cards[hitz[0]]} />
		<Image style={styles.card} source={cards[hitz[1]]} />
		<Image style={styles.card} source={cards[hitz[2]]} />
		<Image style={styles.card} source={cards[hitz[3]]} />
		<Image style={styles.card} source={cards[hitz[4]]} />
		<Image style={styles.card} source={cards[hitz[5]]} />
		</View>
);

	if ( gstate == "DEAL") {
  return (
		<form onSubmit={handleSubmit}>
		<center>
		<Image style={styles.logo} source={logo} />
		<div>{showCards}</div>
		<View style={styles.butn}>
        <button type="submit"> Deal A Hand </button>
		</View>
		</center>
		</form>
  );		
	} else if ( gstate == "CHECKING" ) {
  return (
		<form onSubmit={handleSubmit}>
		<center>
		<Image style={styles.logo} source={logo} />
		<div>{showCards}</div>
		<TextInput name="inguess" style={styles.guess} onChangeText={changeGuess} maxLength="6" value={guess} autoFocus={true} />
		<View style={styles.butn}>
    <button type="submit"> Take A Guess </button>
		</View>

		<View style={styles.msg}>
		<Text style={styles.msg}>Enter Numbers 1-6 In Any Order</Text>
		</View>
		</center>
		</form>
  );
	} else if ( gstate == "WON" ) {
  return (
		<form onSubmit={handleSubmit}>
		<center>
		<div>{showCards}</div>
		<View style={styles.butn}>
				<button type="submit"> You Won! </button>
		</View>
		</center>
		</form>
  );
	} else if ( gstate == "LOST" ) {
  return (
		<form onSubmit={handleSubmit}>
		<center>
		<div>{showCards}</div>
		<View style={styles.butn}>
				<button type="submit"> You Lost! </button>
		</View>
		</center>
		</form>
  );
	} else {
	return ( <h3> Hello </h3>);
	}
}

// class aint nothing without style
const styles = StyleSheet.create({
  butn: { 
    borderColor: '#fff',
    borderWidth: 12, 
    color: "#000",
    fontSize: 8,
    lineHeight: 10,
    textAlign: 'center',
    width: 200,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 112,
    padding: 10,
    width: 87,
  },
  cardtable: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  guess: { 
    borderColor: 'gray',
    borderWidth: 1, 
    color: "#000",
    fontSize: 18,
    flexDirection: 'auto',
    height: 32,
    justifyContent: 'center',
    textAlign: 'center',
    width: 120,
  },
  logo: {
    borderColor: '#fff',
    borderWidth: 0, 
    height: 117,
    width: 258,
  },
  msg: { 
    borderColor: '#000',
    borderWidth: 0, 
    color: "#000",
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    width: 400,  },
});
