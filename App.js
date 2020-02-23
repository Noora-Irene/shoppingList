import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';

export default function App() {

  const [product, setInput] = useState('');
  const [productList, setProduct] = useState([]);

  const userInput = text => {   
    setInput(text);
  };
  const addOnList = () => {
    setProduct(currentProducts => [...currentProducts, { key: Math.random().toString(), value: product }
    ]);
    setInput('');
  }
  const clearList = productList => {
    setProduct(currentProducts => {
      return ('')
    });
  }

  return (
    <View style={styles.wholeScreen}>
        <View style={styles.inputArea}>
          <TextInput style={styles.input} onChangeText={userInput} value={product}
          />
        </View>

        <View style={styles.buttonArea}>

          <View style={styles.button}>
            <Button title="ADD" onPress={addOnList} />
          </View>

          <View style={styles.button}>
            <Button title="CLEAR" color= 'red' onPress={clearList} />
          </View>
        </View>
        <View style={styles.listArea}>
          <Text style={styles.titleText}>Shopping list</Text>
            <FlatList
              data={productList}
              renderItem={itemData => (
                <Text style={styles.listText}> {itemData.item.value} </Text>
          )}
        />
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputArea: {
    flex: 2,
    justifyContent: 'flex-end'
  },
  buttonArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  listArea: {
    flex: 5,
    justifyContent: 'flex-start'
  },
  titleText: {
    fontSize: 22,
    color: 'purple',
    fontWeight: 'bold'
  },
  listText: {
    fontSize: 16,
    color: 'purple'
  },
  input: {
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10 
  },
  button: {
    width: '20%'
  }
});
