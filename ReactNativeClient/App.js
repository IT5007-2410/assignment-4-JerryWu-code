/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import IssueList from './IssueList.js';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Issue Tracker 📋</Text>
        </View>

        <View style={styles.content}>
          <IssueList />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>🤗 IT5007 AS4 by Wu Qilong❤️</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 20,  
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  footer: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
  },
});