import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { LoginStack } from './src/routing/stacks';
import MainAuthStack from './src/routing/mainAuth';
export default function App() {
  return (
    <View className=" flex-1">
      <StatusBar style="auto" />
      <PaperProvider>
        <NavigationContainer>
          <MainAuthStack />
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}


