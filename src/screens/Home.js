import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { vendarData, Instritutions } from '../Data/Data';
import img from '../../public/assets/image.png';
import college from '../../public/assets/college.png';
import Icon from 'react-native-vector-icons/Feather';

const Home = ({ navigation }) => {

  const [page, setPage] = useState('Home')
  const route = useRoute();
  const user = route.params?.user;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={{ color: '#3E4A59' }}>Central </Text>
          <Text style={{ color: '#FF5C00' }}>Kitchen</Text>
        </Text>
        <TouchableOpacity style={page === "Profile" || page === "Instritution" ? { display: "none" } : {}}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>
      {/* Search */}

      {/* {page} */}
      <View style={page !== "Home" && page !== "Instritution" ? { display: "none" } : {}}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ccc" />
          <TextInput
            placeholder={page === "Home" ? "Search Food" : page === "Instritution" ? "Search Instritution" : ""}
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>
      </View>
      <>
        {page === 'Home' ? (<>
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
            data={vendarData.data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={img} style={styles.logo} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.itemName}</Text>
                  <Text style={styles.qty}>Qty : {item.quantity}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </View>
            )}
          />
        </>) : (page === "Instritution" ? (
          <>
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
                <TouchableOpacity onPress={() => navigation.navigate('InstritutionDetails', { data: item })}>
                  <View style={styles.itemContainer}>
                    <Image source={college} style={styles.logo} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.itemName}>{item.schoolName}</Text>
                      <Text style={styles.qty}>{item.location}</Text>
                      <Text style={styles.date}>{item.quantity}</Text>
                    </View>
                    <View>
                      <Text style={styles[item.status]}>{item.status}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>) : (
          <>
            <ScrollView style={styles.container}>
              {user &&
                <View style={styles.profileSection}>
                  <View style={styles.avatar} />
                  <Text style={styles.name}>{user.name || "User"}</Text>
                  <Text style={styles.email}>{user.email || "No Email"}</Text>

                  <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfile', { user })}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                    <Icon name="arrow-right" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              }

              <View style={styles.menuItem}>
                <View style={styles.row}>
                  <Icon name="bell" size={20} />
                  <Text style={styles.menuText}>Notifications</Text>
                </View>
                <View style={styles.notificationDot} />
              </View>

              <View style={styles.menuItem}>
                <View style={styles.row}>
                  <Icon name="globe" size={20} />
                  <Text style={styles.menuText}>Language</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.languageText}>English</Text>
                  <Icon name="chevron-right" size={20} />
                </View>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('Commission')}>
              <View style={styles.menuItem}>
                <View style={styles.row}>
                  <Icon name="credit-card" size={20} />
                  <Text style={styles.menuText}>Commissions Earned</Text>
                </View>
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('History')}>
                <View style={styles.menuItem}>
                  <View style={styles.row}>
                    <Icon name="clock" size={20} />
                    <Text style={styles.menuText}>History</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("Login")}>
                <Icon name="log-out" size={20} color="#d9534f" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        ))
        }
      </>

      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setPage("Home")}>
          <Ionicons name="home" size={24} color={page === 'Home' ? '#E85C33' : '#000'} />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setPage("Instritution")}>
          <Ionicons name="pricetag" size={24} color={page === 'Instritution' ? '#E85C33' : '#000'} />
          <Text style={styles.tabLabel}>Stocks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setPage("Profile")}>
          <Ionicons name="person" size={24} color={page === 'Profile' ? '#E85C33' : '#000'} />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

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
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#687087',
    marginBottom: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  email: {
    color: '#999',
    fontSize: 13,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4572E',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  editProfileText: {
    color: '#fff',
    marginRight: 5,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 15,
  },
  languageText: {
    marginRight: 5,
    color: '#555',
  },
  notificationDot: {
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  logoutText: {
    color: '#d9534f',
    marginLeft: 5,
    fontWeight: '500',
  },
  Delivered: {
    color: 'green',
  },
  Pending: {
    color: 'orange',
  }
});
