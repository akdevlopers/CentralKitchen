import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput, StyleSheet, Modal, CheckBox } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { users } from '../Data/Data';

const img = require('../../public/assets/image.png');
const college = require('../../public/assets/image.png');

const vendors = ["KFC", "McDonald", "Pizza Hut", "Subway", "Burger kings", "Platez", "nutrice", "icebay", "50bucks", "flames", "Meat ‘n’ Eat"];


const History = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('StockIn');
    const [visible, setVisible] = useState(false);
    const stockinData = users.data.flatMap(user => user.stockin);
    const stockoutData = users.data.flatMap(user => user.stockout);

    const renderStockIn = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={img} style={styles.logo} />
            <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.item}</Text>
                <Text style={styles.qty}>Qty: {item.qty}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </View>
    );

    const renderStockOut = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.itemContainer}>
                <Image source={college} style={styles.logo} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{item.school}</Text>
                    <Text style={styles.qty}>{item.location}</Text>
                    <Text style={styles.date}>{item.qty}</Text>
                </View>
                <View>
                    <Text style={styles[item.status]}>{item.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>History</Text>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#ccc" />
                <TextInput
                    placeholder="Search History"
                    placeholderTextColor="#999"
                    style={{}}
                />
            </View>
            <View style={styles.filterContainer}>
                <View style={styles.filterBox}>
                    <Text style={styles.label}>Vendor</Text>
                    <TouchableOpacity style={styles.filterButton} onPress={() => setVisible(true)}>
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

            <View style={styles.viewcontainer}>
                <TouchableOpacity onPress={() => setActiveTab('StockIn')} style={styles.tab}>
                    <Text style={[styles.text, activeTab === 'StockIn' && styles.activeText]}>
                        Stock In
                    </Text>
                    {activeTab === 'StockIn' && <View style={styles.underline} />}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveTab('StockOut')} style={styles.tab}>
                    <Text style={[styles.text, activeTab === 'StockOut' && styles.activeText]}>
                        Stock Out
                    </Text>
                    {activeTab === 'StockOut' && <View style={styles.underline} />}
                </TouchableOpacity>
            </View>

            {/* stockin  */}
            {/* Tabs */}
            {/* List Section */}
            {activeTab === 'StockIn' ? (
                <FlatList
                    data={stockinData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderStockIn}
                />
            ) : (
                <FlatList
                    data={stockoutData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderStockOut}
                />
            )}

            <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeIcon} onPress={() => setVisible(false)}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>

                        <Text style={styles.heading}>Filter</Text>

                        <Text style={styles.label}>Vendor</Text>

                        <TextInput placeholder="Search vendor" style={styles.input} />

                        <FlatList
                            data={vendors}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <View style={styles.checkboxContainer}>
                                    
                                    <Text>{item}</Text>
                                </View>
                            )}
                        />

                        <Text style={styles.label}>Date Range</Text>

                        <View style={styles.dateContainer}>
                            <TouchableOpacity style={styles.dateBox}>
                                <Ionicons name="calendar-outline" size={20} color="gray" />
                                <Text>14-03-2025</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.dateBox}>
                                <Ionicons name="calendar-outline" size={20} color="gray" />
                                <Text>19-03-2025</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Institutions</Text>

                        <View style={styles.tagContainer}>
                            {["St. Mary Goretti Hr Sec School", "Ad Vidya", "Corpus School"].map((item) => (
                                <View style={styles.tag}>
                                    <Text>{item}</Text>
                                    <Ionicons name="close" size={16} />
                                </View>
                            ))}
                        </View>

                        <View style={styles.checkboxContainer}>
                            {/* <CheckBox /> */}
                            <Text>Missed Items</Text>
                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity><Text style={styles.clear}>Clear Filter</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.filterBtn}><Text style={styles.filterText}>Filter</Text></TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    viewcontainer: {
        width: "100%",
        flexDirection: 'row',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3E4A59',
        marginRight: 40,
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
        marginBottom: 20,
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
    },
    tab: {
        width: "50%",
        marginBottom: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#A0A0A0', // Grey
    },
    activeText: {
        color: '#E25C2B', // Orange
    },
    underline: {
        height: 2,
        width: '100%',
        backgroundColor: '#E25C2B',
        marginTop: 4,
    },
    modalContainer: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.3)',
  justifyContent: 'center'
},
modalContent: {
  backgroundColor: '#fff',
  margin: 20,
  borderRadius: 10,
  padding: 20
},
closeIcon: {
  position: 'absolute',
  right: 15,
  top: 15
},
heading: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 15
},
label: {
  marginTop: 10,
  fontWeight: '600'
},
input: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 10,
  marginTop: 5
},
checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 5,
  width: '50%'
},
dateContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 10
},
dateBox: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 10,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
  width: '47%'
},
tagContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 10
},
tag: {
  flexDirection: 'row',
  backgroundColor: '#eee',
  borderRadius: 20,
  paddingHorizontal: 10,
  paddingVertical: 5,
  margin: 3,
  alignItems: 'center',
  gap: 5
},
footer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20
},
clear: {
  color: 'gray'
},
filterBtn: {
  backgroundColor: '#EA5B27',
  borderRadius: 8,
  paddingHorizontal: 25,
  paddingVertical: 10
},
filterText: {
  color: '#fff',
  fontWeight: 'bold'
},
modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20
  },
  closeIcon: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  label: {
    marginTop: 10,
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 5
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '50%'
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '47%'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
    alignItems: 'center',
    gap: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  clear: {
    color: 'gray'
  },
  filterBtn: {
    backgroundColor: '#EA5B27',
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})