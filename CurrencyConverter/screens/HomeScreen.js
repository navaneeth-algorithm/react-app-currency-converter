import React, { useEffect, useState } from "react";

import { View, Text, Button, TextInput, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from 'react-native-dropdown-picker';
import { forUIKit } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/HeaderStyleInterpolators";


const AmountTextInput = ({ onChange, amount }) => {

    const [localAmount, setLocalAmount] = useState("1")

    return (<View>
        <TextInput style={styles.input} value={amount} onChangeText={(txt) => {
            //setAmount(txt)
            onChange(txt)
        }} keyboardType="number-pad" />
    </View>)
}
const HomeScreen = () => {
    const customData = require('../assets/currencies.json');
    const isAndroid = Platform.OS === 'android';


    const [rate, setRate] = useState('')

    const [conversionRate, setConversionRate] = useState('')


    const [currencyData, setCurrencyData] = useState('')

    const [defaultvalue, setDefaultValue] = useState("1")

    const [error,setError] = useState('')

    const [amount, setAmount] = useState("1")


    const [fromOpen, setFromOpen] = useState(false);
    const [fromValue, setFromValue] = useState('');


    const [fromItems, setFromItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    const [toOpen, setToOpen] = useState(false);
    const [toValue, setToValue] = useState('');


    const [toItems, setToItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    let cAmount = 1;


    useEffect(() => {
        let cList = []
        //setCData(Object.keys(customData))

        Object.keys(customData).map((item) => {
            cList.push({ label: customData[item], value: item })
        })

        //toItems = cList
        //fromItems = cL
        setFromItems(cList)
        setToItems(cList)
    }, [])


    useEffect(() => {
        setAmount(cAmount.toString())
    }, [cAmount])


    const storeLocal = async () => {
        try {

            await AsyncStorage.setItem('currency')

        } catch (e) {
            console.log(e)
            setError(e)
        }
    }

    const getFromApi = async (localFrom = null, localTo = null) => {
        try {
            let url;
            setError('')
            if (localFrom != null || localTo != null) {
                url = 'https://evening-sierra-86528.herokuapp.com/' + localFrom + "/" + localTo
            }
            else {
                url = 'https://evening-sierra-86528.herokuapp.com/' + fromValue + "/" + toValue
            }
            if (fromValue.length == 0 || toValue.length == 0)
                return

            console.log(url)
            let response = await fetch(url);
            let json = await response.json()

            let d = parseFloat(json["data"]);

            setConversionRate(d.toString())
            let fAns = amount * d;

            setDefaultValue(amount)

            setRate(fAns.toString())
            //console.log(json);
        } catch (e) {
                console.log(e)  
        }

    }

    const CustomTextInput = (props) => {
        return (
            <TextInput style={styles.input}  {...props} />
        )
    }

    const CustomToDropDown = () => {
        return (
            <View style={[{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'space-evenly',
            },
            (Platform.OS === 'ios' || Platform.OS == 'android' ? { zIndex: toOpen ? 1 : 0 } : {})]
            }>
                <DropDownPicker
                    open={toOpen}
                    setOpen={setToOpen}
                    setValue={setToValue}
                    items={toItems}

                    value={toValue}
                    placeholder={"Conversion To"}
                    listMode="MODAL"
                    searchable={true}
                    dropDownContainerStyle={{ backgroundColor: 'white', height: 500 }}

                    style={{ opacity: 1 }}
                />
            </View>
        )
    }


    const CustomFromDropDown = () => {
        return (
            <View style={[{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'space-evenly',
            },
            (Platform.OS === 'ios' || Platform.OS == 'android' ? { zIndex: fromOpen ? 1 : 0 } : {})]
            }>

                <DropDownPicker
                    open={fromOpen}
                    setOpen={setFromOpen}
                    setValue={setFromValue}
                    items={fromItems}
                    searchable={true}
                    placeholder={"Conversion From"}
                    listMode="MODAL"
                    value={fromValue}
                    dropDownContainerStyle={{ backgroundColor: 'white' }}

                />
            </View>

        )
    }






    return (
        <View style={{ margin: 10 }}>


            <CustomFromDropDown />

            <Icon onPress={() => {
                setFromValue(toValue);
                setToValue(fromValue);
                //getFromApi(toValue,fromValue)

            }} style={{ margin: 10 }} name="swap-vertical" size={30} color="#900" />
            <CustomToDropDown />



            <AmountTextInput onChange={(txt) => {
                cAmount = txt;
                setAmount(txt)
                /*setTimeout(function () {
                    getFromApi()
                }, 1)*/
            }} />



            <CustomTextInput placeholder={"Result"} value={rate} editable={false} />
            <View style={{ margin: 10 }}>
                {(fromValue.length == 0 || toValue.length == 0 || conversionRate.length == 0) ? (<Text></Text>) : <Text>1 {fromValue} = {conversionRate} {toValue}</Text>}

            </View>

            
            <View style={{margin:10}}>

                {(error.length==0)?(<Text></Text>):(<Text style={{color:'black'}}>Try again later</Text>)}

            </View>



            <Button title="Convert" onPress={() => {
                getFromApi()
            }}></Button>

        </View>
    )

}

const styles = StyleSheet.create(
    {
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: 'white',
            color: 'black',

        }
    }
)

export default HomeScreen