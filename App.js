import React, { useState, useEffect} from 'react';
import { StatusBar, StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppingdb.db');

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [productList, setOnList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, amount int, product text);');
    }, null, updateList);    
  }, []);

  const input1 = text => {   
    setProduct(text);
  };
  const input2 = text => {   
    setAmount(text);
  };
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping;', [], (_, { rows }) =>
        setOnList(rows._array)
      ); 
    });
  }
  const addOnList = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shopping (amount, product) values (?, ?);', [parseInt(amount), product]);
    }, null, updateList
    )
    setProduct('');
    setAmount('');
  }
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from shopping where id = ?;', [id]);
      }, null, updateList
    )    
  }
  // const deleteall = (id) => {  }

  return (
    <View style={styles.wholeScreen}>
      <StatusBar hidden={true} />
        <View style={styles.inputArea}>
          <TextInput style={styles.input} placeholder= 'Product' onChangeText={input1} value={product}
          />
          <TextInput style={styles.input} placeholder= 'Amount' onChangeText={input2} value={amount}
          />
        </View>
        <View style={styles.buttonArea}>
          <View style={styles.button}>
            <Button title="ADD" onPress={addOnList} />
          </View>
         {/*} <View style={styles.button}>
            <Button title="CLEAR" color= 'red' onPress={deleteall} />
          </View> */}
        </View>
          <View style={styles.title}><Text style={styles.titleText}>Shopping list</Text></View>
            <FlatList
              keyExtractor={item => item.id.toString()}
              renderItem={ ({ item }) =>
              <View style={styles.listArea}>
                <Text style={styles.listText}> {item.product}, {item.amount} </Text> 
                <Text style={styles.deleteText} onPress={() => deleteItem(item.id) }> Bought </Text>
              </View> }
              data={productList}
            />
    </View>
  );
}
const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  inputArea: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonArea: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end'
  },
  title: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  titleText: {
    fontSize: 22,
    color: 'purple',
    fontWeight: 'bold'
  },
  listArea: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  listText: {
    fontSize: 16,
    color: 'purple'
  },
  deleteText: {
    fontSize: 16,
    color: 'blue'
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
