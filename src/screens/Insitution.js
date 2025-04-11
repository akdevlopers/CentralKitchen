import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Instritutions } from '../Data/Data';
import img from '../../public/assets/college.png';

const Institution = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={{ color: '#3E4A59' }}>Central </Text>
          <Text style={{ color: '#FF5C00' }}>Kitchen</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>
      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#ccc" />
        <TextInput
          placeholder="Search Food"
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <View style={styles.filterBox}>
          <Text style={styles.label}>Vendor</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.buttonText}>All</Text>
            <AntDesign name="down" size={14} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterBox}>
          <Text style={styles.label}>Date Range</Text>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="date-range" size={16} color="#555" />
            <Text style={styles.buttonText}>12th - 14th Mar,25</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={Instritutions.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={img} style={styles.logo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.schoolName}</Text>
              <Text style={styles.qty}>{item.location}</Text>
              <Text style={styles.date}>{item.quantity}</Text>
            </View>
            <View>
                <Text>{item.status}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="pricetag" size={24} color="#E85C33" />
          <Text style={styles.tabLabel}>Stocks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Institution')}>
          <Ionicons name="person" size={24} color="#000" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Institution;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addText: {
    color: '#FF5C00',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 24,
    marginBottom: 24,
    paddingVertical: 8,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    color: '#000',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 16,
  },

  filterBox: {
    width: '48%',
  },

  label: {
    marginBottom: 6,
    color: '#333',
    fontSize: 13,
    fontWeight: 'bold',
  },

  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  buttonText: {
    color: '#333',
    fontSize: 14,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  qty: {
    color: '#555',
    marginTop: 4,
  },
  date: {
    color: '#FF5C00',
    marginTop: 2,
    fontSize: 12,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
