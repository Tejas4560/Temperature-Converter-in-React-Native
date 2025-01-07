import { useEffect, useState } from "react";
import { ImageBackground, Text, View, Linking, TouchableOpacity } from "react-native";
import { s } from "./App.style";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";

import { FontAwesome } from "@expo/vector-icons"; // Import the icon library
import { ButtonConvert } from "./components/ButtonConvert/ButtonConvert.jsx";
import { InputTemperature } from "./components/InputTemperature/InputTemperature.jsx";
import { TemperatureDisplay } from "./components/TemperatureDisplay/TemperatureDisplay.jsx";
import { DEFAULT_TEMPERATURE, DEFAULT_UNIT, UNITS } from "./constant";
import {
  getOppositUnit,
  convertTemperatureTo,
  isIceTemperature,
} from "./services/temperature-service";

export default function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_TEMPERATURE);
  const [currentUnit, setCurrentUnit] = useState(DEFAULT_UNIT);
  const [currentBackground, setCurrentBackground] = useState();
  const oppositeUnit = getOppositUnit(currentUnit);

  useEffect(() => {
    const temperatureAsFloat = Number.parseFloat(inputValue);
    if (!isNaN(temperatureAsFloat)) {
      const isColdBackground = isIceTemperature(inputValue, currentUnit);
      setCurrentBackground(isColdBackground ? coldBackground : hotBackground);
    }
  }, [inputValue, currentUnit]);

  function getConvertedTemperature() {
    const valueAsFloat = Number.parseFloat(inputValue);
    return isNaN(valueAsFloat)
      ? ""
      : convertTemperatureTo(oppositeUnit, valueAsFloat).toFixed(1);
  }

  return (
    <ImageBackground source={currentBackground} style={s.container}>
      <View style={s.workspace}>
        <TemperatureDisplay
          value={getConvertedTemperature()}
          unit={oppositeUnit}
        />
        <InputTemperature
          onChangeText={setInputValue}
          defaultValue={DEFAULT_TEMPERATURE}
          unit={currentUnit}
        />
        <View>
          <ButtonConvert
            onPress={() => {
              setCurrentUnit(oppositeUnit);
            }}
            unit={currentUnit}
          />
        </View>
      </View>
      
      <View style={{ position: "absolute", bottom: 30, alignSelf: "center",alignItems:"center" }}>
          <Text style={{color:"white",fontSize:15}} >press  this icon for  code</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/Tejas4560");
          }}
        >
          <FontAwesome name="github" size={50} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
