import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import styles from '../styles';

const safeAreaStyle = styles.container;

const scrollViewContainerStyle = {
  paddingBottom: 100,
};

interface Props {
  children: React.ReactNode;
}

const Container = ({children}: Props) => {
  return (
    <SafeAreaView style={safeAreaStyle}>
      <ScrollView  contentContainerStyle={scrollViewContainerStyle}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;
