## Currency converter url
### https://evening-sierra-86528.herokuapp.com/

### pass parameter as /fromRate/toRate

### Response {data: rate for 1 from rate}


## for bulding debug apk
### npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ && cd android && ./gradlew assembleDebug && cd ..


## for releaase apk
### "npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/ && rm -rf android/app/src/main/res/drawable-* && rm -rf android/app/src/main/res/raw/* && cd android && ./gradlew assembleRelease && cd .."# react-app-currency-converter
