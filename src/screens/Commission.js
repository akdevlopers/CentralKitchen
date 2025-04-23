import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { users } from '../Data/Data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BaseUrl, ImageUrl } from '../API/Global';

const Commission = ({ navigation }) => {
    // FILTER DATA STARTS
    const [visible, setVisible] = useState(false);

    const [vendors, setVendors] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [searchInstitution, setSearchInstitution] = useState('');
    const [selectedInstitutions, setSelectedInstitutions] = useState([]);

    const [CommissionData, setCommissionData] = useState({})
    const [CommissionInstData, setCommissionInstData] = useState({})
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCommissionFilterData = async () => {
            const token = await AsyncStorage.getItem('userToken');
            const data = {
                fromDate: formatDate(fromDate),
                toDate: formatDate(toDate),
                search: search,
            }
            console.log(data)
            try {
                const response = await fetch(
                    `${BaseUrl}commissionsEarned`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(data)
                    },
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();

                if (json.status) {
                    setCommissionInstData(json)
                    console.log('Commision Filter Data', CommissionInstData);
                } else {
                    console.log('Failed to List Commision Data:', json);
                }

            } catch (error) {
                console.error('List Commision Data Failed:', error.message);
            }
        };

        fetchCommissionFilterData();
    }, [fromDate, toDate, search]);

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedVendors([]);
        setFromDate(new Date());
        setToDate(new Date());
        setSearchInstitution('');
        setSelectedInstitutions([]);
        setShowFromPicker(false);
        setShowToPicker(false);
    };


    useEffect(() => {
        const vendorSet = new Set();
        const schoolSet = new Set();

        users.data.forEach(user => {
            user.stockin.forEach(stock => {
                vendorSet.add(stock.brand);
            });
            user.stockout.forEach(out => {
                schoolSet.add(out.school);
            });
        });

        setVendors(Array.from(vendorSet));
        setInstitutions(Array.from(schoolSet));
    }, []);

    const filteredVendors = vendors.filter(v =>
        v.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleVendor = (vendor) => {
        setSelectedVendors(prev =>
            prev.includes(vendor)
                ? prev.filter(v => v !== vendor)
                : [...prev, vendor]
        );
    };

    // FILTER ENDS 

    useEffect(() => {
        const fetchCommissionData = async () => {
            const token = await AsyncStorage.getItem('userToken');
            try {
                const response = await fetch(
                    `${BaseUrl}fetchInstitutions`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        // body: JSON.stringify(data)
                    },
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();

                if (json.status) {
                    setCommissionData(json)
                    console.log('Commision Data', CommissionData);
                } else {
                    console.log('Failed to List Commision Data:', json);
                }

            } catch (error) {
                console.error('List Commision Data Failed:', error.message);
            }
        };

        fetchCommissionData();
    }, []);

    const renderStockOut = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CommissionDetail', { data: item })}>
            <View style={styles.itemContainer}>
                <Image source={{ uri: `${ImageUrl}${item.school_logo}` }} style={styles.logo} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{item.school_name}</Text>
                    <Text style={styles.qty}>{item.school_address}</Text>
                    <Text style={{}}>{item.order_timestamp}</Text>
                </View>
                <View>
                    <Text style={styles.date}>RM{item.rm_commission}</Text>
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
                    style={styles.searchInput}
                    onChangeText={setSearch}
                    value={search}
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
                    <TouchableOpacity style={styles.filterButton} onPress={() => setVisible(true)}>
                        <MaterialIcons name="date-range" size={16} color="#555" />
                        <Text style={styles.buttonText}>12th - 14th Mar,25</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Commission Earned</Text>
                <Text style={styles.cardAmount}>RM{CommissionInstData.total_commision}</Text>
            </View>

            <FlatList
                data={CommissionInstData.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderStockOut}
            />
            <Modal visible={visible} animationType="slide" transparent>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity style={styles.closeIcon} onPress={() => setVisible(false)}>
                                        <Ionicons name="close" size={24} color="black" />
                                    </TouchableOpacity>


                                    <Text style={styles.heading}>Filter</Text>

                                    {/* <Text style={styles.label}>Vendor</Text>
                                    <TextInput
                                        placeholder="Search vendor"
                                        style={styles.input}
                                        value={searchTerm}
                                        onChangeText={setSearchTerm}
                                    />

                                    <FlatList
                                        data={filteredVendors}
                                        numColumns={2}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => {
                                            const isChecked = selectedVendors.includes(item);
                                            return (
                                                <TouchableOpacity
                                                    style={[
                                                        styles.checkboxContainer,
                                                        isChecked && styles.checkboxSelected
                                                    ]}
                                                    onPress={() => toggleVendor(item)}
                                                >
                                                    <Ionicons
                                                        name={isChecked ? 'checkbox' : 'square-outline'}
                                                        size={20}
                                                        color={isChecked ? '#E85C33' : 'gray'}
                                                        style={{ marginRight: 6 }}
                                                    />
                                                    <Text style={{ color: isChecked ? '#E85C33' : '#000' }}>{item}</Text>
                                                </TouchableOpacity>
                                            );
                                        }}
                                    /> */}

                                    <Text style={styles.label}>Date Range</Text>
                                    <View style={styles.dateContainer}>
                                        <TouchableOpacity style={styles.dateBox} onPress={() => setShowFromPicker(true)}>
                                            <Ionicons name="calendar-outline" size={20} color="gray" />
                                            <Text>{formatDate(fromDate)}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.dateBox} onPress={() => setShowToPicker(true)}>
                                            <Ionicons name="calendar-outline" size={20} color="gray" />
                                            <Text>{formatDate(toDate)}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {showFromPicker && (
                                        <DateTimePicker
                                            value={fromDate}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                setShowFromPicker(false);
                                                if (selectedDate) setFromDate(selectedDate);
                                            }}
                                        />
                                    )}

                                    {showToPicker && (
                                        <DateTimePicker
                                            value={toDate}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                setShowToPicker(false);
                                                if (selectedDate) setToDate(selectedDate);
                                            }}
                                        />
                                    )}


                                    {/* <Text style={styles.label}>Institutions</Text>

                                    <TextInput
                                        placeholder="Search institution"
                                        style={styles.input}
                                        value={searchInstitution}
                                        onChangeText={setSearchInstitution}
                                    />

                                    {searchInstitution.length > 0 && (
                                        <FlatList
                                            data={institutions.filter(item =>
                                                item.toLowerCase().includes(searchInstitution.toLowerCase()) &&
                                                !selectedInstitutions.includes(item)
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSelectedInstitutions(prev => [...prev, item]);
                                                        setSearchInstitution('');
                                                    }}
                                                >
                                                    <Text style={styles.searchItem}>{item}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    )}

                                    <View style={styles.tagContainer}>
                                        {selectedInstitutions.map((item, index) => (
                                            <View key={index} style={styles.tag}>
                                                <Text>{item}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSelectedInstitutions(prev => prev.filter(i => i !== item));
                                                    }}
                                                >
                                                    <Ionicons name="close" size={16} />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View> */}


                                    {/* <View style={styles.checkboxContainer}>
                                        <Text>Missed Items</Text>
                                    </View> */}

                                    <View style={styles.footer}>
                                        <TouchableOpacity onPress={clearFilters}>
                                            <Text style={styles.clear}>Clear Filter</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.filterBtn} onPress={() => setVisible(false)}>
                                            <Text style={styles.filterText}>Filter</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
    searchInput: {
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


    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '60%',
    },
    modalContent: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 10,
        padding: 20
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 20,
        zIndex: 10,
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
        backgroundColor: '#eee',
        borderRadius: 8,
        paddingHorizontal: 25,
        paddingVertical: 10
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
    modalContent: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 10,
        padding: 20
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        flex: 1,
    },
    searchItem: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 6,
        marginVertical: 4,
    },

    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        gap: 8,
    },

    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dfe6e9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        margin: 4
    },
})