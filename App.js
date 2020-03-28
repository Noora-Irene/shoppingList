import React, { useState, useEffect} from 'react';
import { StatusBar, StyleSheet, View, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ThemeProvider, Input, Button, ListItem } from 'react-native-elements';

const db = SQLite.openDatabase('shoppingdb.db');

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [productList, setOnList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, amount text, product text);');
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
      tx.executeSql('insert into shopping (amount, product) values (?, ?);', [amount, product]);
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
    <ThemeProvider theme={theme}>
      <StatusBar hidden={true} />
        <View style={styles.inputArea}>
          <Input placeholder= 'Product' label='PRODUCT' onChangeText={input1} value={product}
          />
          <Input placeholder= 'Amount e.g. pcs, kg' label='AMOUNT' onChangeText={input2} value={amount}
          />
        </View>
        <View style={styles.buttonArea}>
            <Button title="ADD" onPress={addOnList} />
         {/*}
            <Button title="CLEAR" onPress={deleteall} />
         */}
        </View>
        <View style={styles.listArea}>
          <Text style={styles.titleText}>Shopping list</Text>
            <FlatList
              data={productList}
              keyExtractor={item => item.id.toString()}
              renderItem={ ({ item }) => 
              <ListItem
                title= {item.product} rightSubtitle={item.amount} 
                rightIcon= {{ name: 'delete-sweep' }} onPress={() => deleteItem(item.id) }
                bottomDivider
              /> }
            />
        </View>
        </ThemeProvider>
    </View>
  );
}
const theme = {
  Button: {
    containerStyle: {
    marginTop: 20
    },
    titleStyle: {
      color: 'cornsilk'
    },
  },
};
const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  inputArea: {
    flex: 1
  },
  buttonArea: {
    flex: 1
  },
  listArea: {
    flex: 3
  },
  titleText: {
    fontSize: 22,
    color: '#c71585',
    fontWeight: 'bold',
    marginLeft: 15
  }
});
