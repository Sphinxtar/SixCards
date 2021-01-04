import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, Image, Alert } from 'react-native';

//		hand: "123456", shuffled string player is trying to guess inside gState
//		guessnum: 0, times submitted a valid string to check
// 		gtext: "", current contents of input field to check against hand
//		hitz: "000000" cards guessed right or zero
//		GAME STATES: 
//				DEAL    show splash and initialize the game 
//			CHECKING  action validates hand vs. hitz and sets - game in progress
//				WON	    we have a winner
//				LOST    loser

export default function App() {
  const [ hand, setHand ] = useState("123456");
  const [ hitz, setHitz ] = useState("123456");
	const [ gtext, setGtext ] = useState( new String );
	const [ gstate, setGstate ] = useState( "DEAL" );
	const [ guessnum, setGuessnum ] = useState( new Number );
  const [ bone, setBoneState ] = useState( false );
  const [ btwo, setBtwoState ] = useState( false );
  const [ bthree, setBthreeState ] = useState( false );
  const [ bfour, setBfourState ] = useState( false );
  const [ bfive, setBfiveState ] = useState( false );
  const [ bsix, setBsixState ] = useState( false );

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

	function handleSubmit( e ) {
//		console.log( "handleSubmit: gstate: " + gstate + " gtext.length: " + gtext.length + " gtext: " + gtext + " guessnum: " + guessnum + " hand: " + hand  + " hitz: " + hitz );
    if ( e )
			e.preventDefault();
  }

  function getrand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function clicked(butn) {
//		console.log( "clicked: " + butn + " gtext: " + gtext + " hand: " + hand + " guessnum: " + guessnum );
		 switch( butn ) {
				case "deal":
						var tmp;
						var x;
						var shuffles = [ '1', '2', '3', '4', '5', '6' ];
						for ( var i = 0; i < 6; i++ ) {
								x = (getrand(1, 6) - 1); 
								tmp = shuffles[ x ];
								shuffles[ x ] =  shuffles[ i ];
								shuffles[ i ] = tmp;
						}
//						console.log( "Shuffles: " + shuffles );
						setHand( shuffles.join("") );
						setHitz( "000000" );
						setGstate("CHECKING");
						setGuessnum( 0 );
						break;
				case "guess":
						let guesses = guessnum + 1;
						if ( gtext.length < 6 ) {
								setTimeout(() => { Alert.alert( "SixCards", "Too Short!", [ { text: "ok", onPress: () => { }, }, ],) }, 6);
						} else {
								var hit = [ '0', '0', '0', '0', '0', '0' ];
								for ( var i = 0; i < gtext.length; i++ ) {
									if ( hand[ i ] == gtext[ i ] ) 
											hit[ i ] = hand[ i ];
							}
							setHitz( hit );
							if ( guessnum > 3 && hit.join("") != hand ) {
									setGstate( "LOST" );
							} else if ( hit.join("") == hand ) {
									setGstate( "WON" );
				 			} else {
									setGstate( "CHECKING" );
							}
							setGuessnum( guesses );
							setGtext( "" );
							clicked( "clr" );
						}
						break;
				case "clr":
						setGtext("");
						if ( bone )
								setBoneState( false );
						if ( btwo )
								setBtwoState( false );
						if ( bthree )
								setBthreeState( false );
						if ( bfour )
								setBfourState( false );
						if ( bfive )
								setBfiveState( false );
						if ( bsix )
								setBsixState( false );
						break;
				case "1":
						setGtext( gtext + butn );
						setBoneState( true );
						break;
				case "2":
						setGtext( gtext + butn );
						setBtwoState( true );
						break;
				case "3":
						setGtext( gtext + butn );
						setBthreeState( true );
						break;
				case "4":
						setGtext( gtext + butn );
						setBfourState( true );
						break;
				case "5":
						setGtext( gtext + butn );
						setBfiveState( true );
						break;
				case "6":
						setGtext( gtext + butn );
						setBsixState( true );
				default:
						break;
		 }	
  }

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

const buttonboard = (
		<View style={styles.centered}>
    <View style={styles.buttonbar}>
    <View style={styles.butnview}>
		<Button onPress={() => clicked("clr")} title="CLEAR" color="#838383" />
    </View>
    <View style={styles.butnview}>
		<Button onPress={() => clicked("1")} title=" 1 " color="#838383" disabled={bone} />
    </View>
    <View style={styles.butnview}>
		<Button onPress={() => clicked("2")} title=" 2 " color="#838383" disabled={btwo} />
    </View>
    <View style={styles.butnview}>
		<Button onPress={() => clicked("3")} title=" 3 " color="#838383" disabled={bthree} />
    </View>
    <View style={styles.butnview}>
		<Button onPress={() => clicked("4")} title=" 4 " color="#838383" disabled={bfour} />
    </View>
    <View style={styles.butnview}>
		<Button onPress={() => clicked("5")} title=" 5 " color="#838383" disabled={bfive} />
    </View>
    <View style={styles.butnview}>
		<Button onPress={() => clicked("6")} title=" 6 " color="#838383" disabled={bsix} />
    </View>
    <View style={styles.butnview}>
		<Button onPress={() => clicked("guess")} title="GUESS" color="#838383" />
    </View>
    </View>
		</View>
);

	if ( gstate == "DEAL" ) {
  return (
		<View style={styles.centered}>
		<View style={styles.logoview}>
		<Image style={styles.logo} source={logo} />
		</View>
		<View style={styles.buttonbar}>
    <Button onPress={() => clicked("deal")} title="Deal A Hand" color="#838383" />
		</View>
		</View>
  );		
	} else if ( gstate == "CHECKING" ) {
  return (
		<View style={styles.centered}>
		<div>{showCards}</div>
		<View style={styles.guessview}>
		<Text style={styles.guess}>{gtext}</Text>
		</View>
    <div>{buttonboard}</div>
		<View style={styles.msg}>
		<Text style={styles.msg}>Enter Numbers 1-6 In Any Order</Text>
		</View>
		</View>
  );
	} else if ( gstate == "WON" ) {
  return (
		<View style={styles.centered}>
		<div>{showCards}</div>
		<View style={styles.buttonbar}>
				<Button onPress={() => clicked("deal")} title=" YOU WON " color="#838383" />
		</View>
		</View>
  );
	} else if ( gstate == "LOST" ) {
  return (
		<View style={styles.centered}>
		<div>{showCards}</div>
		<View style={styles.buttonbar}>
				<Button onPress={() => clicked("deal")} title=" YOU LOST " color="#838383" />
		</View>
		</View>
  );
	} else {
	return ( <h3> Hello </h3>);
	}
}

// class aint nothing without style
const styles = StyleSheet.create({
  buttonbar: {
    alignItems: 'center',
    backgroundColor: '#838383',
		borderWidth: 1,
    flex: 0,
		flexDirection: 'row',
		height: 48,
    justifyContent: 'center',
  },
  butnview: {
    padding: 8,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 0,
    height: 112,
    padding: 10,
    width: 87,
    paddingTop: 20,
  },
  cardtable: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: -1,
    flexDirection: 'row',
    height: 142,
    justifyContent: 'center',
    paddingTop: 20,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  guess: {
    alignItems: 'center',
    backgroundColor: '#fff',
		borderWidth: 0,
    flex: 1,
		flexDirection: 'row',
    fontSize: 20,
    fontWeight: 'bold',
		height: 28,
    justifyContent: 'center',
    paddingBottom: 20,
		width: 92,
  },
  guessview: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
		flexDirection: 'row',
		height: 40,
    justifyContent: 'center',
		width: 72,
  },
  logo: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 0, 
		height: 117,
		width: 258,
  },
  logoview: {
    alignItems: 'center',
    padding: 18,
  },
  msg: { 
    borderColor: '#000',
    borderWidth: 0, 
    color: "#000",
    flex: 1,
    fontSize: 16,
		height: 24,
    lineHeight: 30,
    textAlign: 'center',
  },
});
