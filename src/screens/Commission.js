import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CommissionData } from '../Data/Data';

const college = require('../../public/assets/college.png');

const Commission = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('StockIn');

    const renderStockOut = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CommissionDetail', { data: item })}>
            <View style={styles.itemContainer}>
                <Image source={college} style={styles.logo} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{item.school}</Text>
                    <Text style={styles.qty}>{item.location}</Text>
                    <Text style={{}}>{item.date_time}</Text>
                </View>
                <View>
                    <Text style={styles.date}>{item.amount}</Text>
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
                <Text style={styles.headerTitle}>Commission's Earned</Text>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#ccc" />
                <TextInput
                    placeholder="Search History"
                    placeholderTextColor="#999"
                    style={styles.input}
                />
            </View>
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
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Commission Earned</Text>
                <Text style={styles.cardAmount}>RM50</Text>
            </View>

            <FlatList
                data={CommissionData.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderStockOut}
            />
        </View>
    );
};

export default Commission;

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
        paddingVertical: 5
    },
    date: {
        color: '#FF5C00',
        marginTop: 2,
        fontSize: 15,
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
    cardContainer: {
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        paddingVertical: 38,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginVertical: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    cardAmount: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#E15829',
        marginTop: 6,
        paddingTop: 10
    },
})