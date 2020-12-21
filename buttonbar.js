import React, {useState} from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

export default function App() {
const [ gtext, setGtext ] = useState( "" );
const [ bone, setBoneState ] = useState( false );
const [ btwo, setBtwoState ] = useState( false );
const [ bthree, setBthreeState ] = useState( false );
const [ bfour, setBfourState ] = useState( false );
const [ bfive, setBfiveState ] = useState( false );
const [ bsix, setBsixState ] = useState( false );

function clicked(butn) {
		switch( butn ) {
				case "guess":
						var guess = gtext;
						if ( guess.length == 6 ) {
								console.log( "guess: " + guess );
						} else {
								alert( "Too Short" );
								break;
						}
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
  return (
		<center>
		<View style={styles.textview}>
		<Text style={styles.guesstext}>{gtext}</Text>
		</View>
    <View style={styles.buttonbar}>
    <View style={styles.butnview}>
		<Button onPress={() => clicked("clr")} title="CLR" color="#838383" />
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
		<Button onPress={() => clicked("guess")} title="Guess" color="#838383" />
    </View>
    </View>
		</center>
  );
}

const styles = StyleSheet.create({
  buttonbar: {
    alignItems: 'center',
    backgroundColor: '#838383',
		border: 4,
    flex: 1,
		flexDirection: "row",
		height: 48,
    justifyContent: 'center',
  },
  butnview: {
    padding: 6,
  },
  guesstext: {
    alignItems: 'center',
    backgroundColor: '#fff',
		border: 1,
    flex: 1,
		flexDirection: "row",
    fontSize: 18,
    fontWeight: "bold",
		height: 32,
    justifyContent: 'center',
  },
  textview: {
    flexDirection: "row",
    height: 32,
    padding: 6,
  },
});

