Creating the react native app

//Basic setup
npx create-expo-app StickerSmash

//Install dependencies
npx expo install react-dom react-native-web @expo/webpack-config

//Installing dependencies into a bare React Native project
npm install react-native-screens react-native-safe-area-context

//React native base navigation
npm install @react-navigation/native 

//Installing stack navigator
npm install @react-navigation/stack 

//Gesture Handler
npx expo install react-native-gesture-handler


//Installing the tailwind css
npm i nativewind 

//Installing the tailwind dependency
npm i --dev tailwindcss@3.3.2

//Generate the tailwind.config.js file
npx tailwindcss init


//Modifying this line in the tailwind.config.js
content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"] 

//Adding this line in the babel.config.js
plugins: ["nativewind/babel"],


//Adding react native carousel
npm i react-native-snap-carousel

//Linear Gradient
npm i expo-linear-gradient

//React native progress
npm i react-native-progress

//Axios for apis request
npm i axios

//Heroicons
npm i react-native-heroicons



//Combined commands

npm i react-native-screens react-native-safe-area-context axios react-native-progress expo-linear-gradient react-native-snap-carousel nativewind --dev tailwindcss@3.3.2 @react-navigation/native @react-navigation/stack react-native-gesture-handler