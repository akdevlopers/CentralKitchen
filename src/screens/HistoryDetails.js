import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const historyDetails = ({ route, navigation }) => {
    const { data } = route.params;
    const [CommissionData, setCommissionData] = useState({})

    useEffect(() => {
        const fetchCommission = async () => {
            const token = await AsyncStorage.getItem('userToken');
            const user = { mark_deliver_id: data.mark_deliver_id }

            try {
                const response = await fetch(
                    'https://teachercanteen.akprojects.co/api/v1/stockOutMenus',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(user),
                    },
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();

                if (json.status) {
                    const data = json.data
                    setCommissionData(data[0].menuList)
                } else {
                    console.log('Failed to List Commision Special Data:', json);
                }

            } catch (error) {
                console.error('List Commision Special Data Failed:', error.message);
            }
        };
        fetchCommission();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* School Details */}
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.schoolCard}>
                <Image source={{uri: `https://teachercanteen.akprojects.co/${data.school_logo}`}} style={styles.schoolLogo} />
                <View>
                    <Text style={styles.schoolName}>{data.school_name}</Text>
                    <Text style={styles.schoolLocation}>{data.school_address}</Text>
                    <Text style={{}}>{data.order_timestamp}</Text>
                </View>
                <View>
                    <Text style={styles.date}>RM0{data.rm_commission}</Text>
                </View>
            </View>

            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Commission Earned</Text>
                <Text style={styles.cardAmount}>RM0{data.rm_commission}</Text>
            </View>

            {/* Title */}
            <Text style={styles.todayOrdersText}>Orders</Text>

            {/* Order List */}
            <FlatList
                data={CommissionData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <Image source={{uri: `https://teachercanteen.akprojects.co/${item.BrandLogo}`}} style={styles.orderLogo} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.orderName}>{item.MenuTittleEnglish}</Text>
                            <Text style={styles.orderLocation}>{item.BrandAddress}</Text>

                        </View>
                        <Text
                            style={[
                                styles.orderStatus,
                                { color: item.ScanNewOrderStatus === 'Delivered' ? 'green' : 'orange' },
                            ]}>
                            {item.ScanNewOrderStatus}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default historyDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    schoolCard: {
        backgroundColor: '#F9F9F9',
        flexDirection: 'row',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    schoolLogo: {
        width: 50,
        height: 50,
        marginRight: 12,
        borderRadius: 25,
    },
    schoolName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    schoolLocation: {
        fontSize: 13,
        color: 'gray',
    },
    todayOrdersText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    orderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    orderLogo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    orderName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    orderLocation: {
        fontSize: 13,
        color: 'gray',
    },
    orderStatus: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    qrContainer: {
        alignItems: 'flex-end',
        marginVertical: 20,
    },
    qrImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    timeText: {
        fontSize: 16,
        color: '#000',
    },
    button: {
        backgroundColor: '#E75A26',
        paddingVertical: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
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
    date: {
        color: '#FF5C00',
        marginTop: 2,
        marginLeft: 25,
        fontSize: 18,
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
});