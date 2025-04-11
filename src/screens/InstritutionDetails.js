import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import college from '../../public/assets/college.png';
import qrCode from '../../public/assets/qr-code.png';

const InstritutionDetails = ({ route }) => {
    const { data } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            {/* School Details */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    <Text style={{ color: '#3E4A59' }}>Central </Text>
                    <Text style={{ color: '#FF5C00' }}>Kitchen</Text>
                </Text>
            </View>
            <View style={styles.schoolCard}>
                <Image source={college} style={styles.schoolLogo} />
                <View>
                    <Text style={styles.schoolName}>{data.schoolName}</Text>
                    <Text style={styles.schoolLocation}>{data.location}</Text>
                </View>
            </View>

            {/* Title */}
            <Text style={styles.todayOrdersText}>Today Orders</Text>

            {/* Order List */}
            <FlatList
                data={data.todaysOrder}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <Image source={item.logo} style={styles.orderLogo} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.orderName}>{item.item}</Text>
                            <Text style={styles.orderLocation}>{item.location}</Text>
                        </View>
                        <Text
                            style={[
                                styles.orderStatus,
                                { color: item.status === 'Delivered' ? 'green' : 'orange' },
                            ]}>
                            {item.status}
                        </Text>
                    </View>
                )}
            />

            {/* QR Code Image */}
            <TouchableOpacity style={styles.qrContainer}>
                <Image source={qrCode} style={styles.qrImage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Mark as Delivered</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default InstritutionDetails;

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
});