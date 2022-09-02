## React Currency Converter Application

### Python code here
- [Here](https://github.com/navaneeth-algorithm/python_currency_converter)

- hosted on heroku

### Currency converter url
```
https://evening-sierra-86528.herokuapp.com/
```

### pass parameter as 
```
/fromRate/toRate
```

#### For Eg: to get conversion rate of `USD` in `INR`
```
https://evening-sierra-86528.herokuapp.com/USD/INR
```

#### Response

```json
{"data":"79.8197"}
```

### For supported currencies 
- [check here](https://github.com/navaneeth-algorithm/python_currency_converter/blob/main/input_data.json)

### for bulding debug apk
```
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ && cd android && ./gradlew assembleDebug && cd ..

```


### for releaase apk
```
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/ && rm -rf android/app/src/main/res/drawable-* && rm -rf android/app/src/main/res/raw/* && cd android && ./gradlew assembleRelease && cd .."# react-app-currency-converter
```
### Demo
[APK DEMO](https://drive.google.com/file/d/1vYexVjY96lA7HcE8PlNPnhaGr8Qm_yZn/view?usp=sharing)


