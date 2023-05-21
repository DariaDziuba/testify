import React from 'react';
import RootStack from './components/navigators/RootStack';
import { TailwindProvider } from 'tailwindcss-react-native';

export default function App() {
  return (
    <TailwindProvider>
      <RootStack />
    </TailwindProvider>
  );
}