import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button,ScrollView } from 'react-native';
import axios from 'axios';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
console.log('start');
const [arr,setArr] = useState([]);

const url='https://savehttp-75969-default-rtdb.firebaseio.com/TableLinks.json'
  return (
    <View style={styles.container}>
      <Text>FireBase!</Text>
      <StatusBar style="auto" />
      <View>
        <Button title="Save One Record" onPress={()=>{
          const j = {name:'Avi', id:'123234',link:'wertertertetertertert'};
          axios.post(url,j)
          .then((response) => {
            console.log('response',response.data)      
          })
          .catch((error) => {
            alert(error.response);                
          });
        }}/>
      </View>
      <View>
        <Button title="Get All Table" onPress={()=>{          
          axios.get(url)
          .then((response) => {
            console.log('response',response.data.Keys);
            let tmpArr = [];
            for (const [key, value] of Object.entries(response.data)) {
              console.log(`${key}: ${value}`);
              //setArr([...arr,value]);
              tmpArr.push(value);
            }
            console.log(tmpArr.length);
            setArr(tmpArr);
          })
          .catch((error) => {
            alert(error.response);                
          });
        }}/>
      </View>
      <View>
        <Button title="Delete" onPress={()=>{          
          axios.delete('https://savehttp-75969-default-rtdb.firebaseio.com/TableLinks/-N26PhVAj8YceP8Jj4AX.json')
          .then((response) => {
            console.log('response',response.data)      
          })
          .catch((error) => {
            alert(error.response);                
          });
        }}/>
      </View>
      <View>
        <Button title="Update full" onPress={()=>{          

          // remove old value and insert new one
          const j = {name:'James', id:'123234',link:'+++++'};
          axios.put('https://savehttp-75969-default-rtdb.firebaseio.com/TableLinks/-N26PhNt7sSlUUjItvBP.json',j)
          .then((response) => {
            console.log('response',response.data)      
          })
          .catch((error) => {
            alert(error.response);                
          });
        }}/>
      </View>
      <View>
        <Button title="Update Partial" onPress={()=>{          
          // find replace
          const j = {name:'James',link:'+++++'};
          axios.patch('https://savehttp-75969-default-rtdb.firebaseio.com/TableLinks/-N26PhNt7sSlUUjItvBP.json',j)
          .then((response) => {
            console.log('response',response.data)      
          })
          .catch((error) => {
            alert(error.response);                
          });
        }}/>
      </View>


      <View>
        <Button title="Save To Local Storage" onPress={()=>{          
          
            const storeData = async (value) => {
              try {
                await AsyncStorage.setItem('@storage_Key', value)
              } catch (e) {
                // saving error
                console.log(e);
              }
            };
            const j = {name:'James',link:'+++++'};
            storeData(j);
        }}/>
      </View>

      <View>
        <Button title="Load from Local Storage" onPress={()=>{          
          
            const getData = async () => {
              try {
                const j = await AsyncStorage.getItem('@storage_Key');
                console.log(j);
                return j;
              } catch (e) {
                // saving error
              }
            }
            alert(getData());
        }}/>
      </View>


      <View>
        {arr?.map((x,i)=>{
          return(<View key={i}>
          <Text>{x.name}</Text>
          </View>);
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
