import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, Modal, Alert } from 'react-native';
import college from '../../public/assets/college.png';
import qrCode from '../../public/assets/qr-code.png';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InstritutionDetails = ({ route }) => {
    const { data: initialData } = route.params;
    const [data, setData] = useState(initialData);
    const [qrModel, setQrModel] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraPosition, setCameraPosition] = useState('back');
    const [canScan, setCanScan] = useState(true);
    const lastScannedCodeRef = useRef(null);

    const [schoolData, setSchoolData] = useState()

    useEffect(() => {
        const fetchSchoolMenu = async () => {
            const user = { order_date: "2024-09-17", school_id: 4 };
            const token = await AsyncStorage.getItem('userToken');
            console.log('Token school:', token);
            console.log(user, "School Menu");

            try {
                const response = await fetch(
                    'https://teachercanteen.akprojects.co/api/v1/schoolOrderMenuList',
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
                    setSchoolData(json.data)
                    console.log('List Of School Menu:', schoolData);
                } else {
                    console.log('Failed to List School Menu:', json);
                }

            } catch (error) {
                console.error('List School Menu Failed:', error.message);
            }
        };

        fetchSchoolMenu();
    }, []);


    // Camera setup
    const device = useCameraDevice(cameraPosition);
    const camera = useRef(null);

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes) => {
            if (!canScan) return;
            const qrCode = codes.find(c => c.type === 'qr');
            if (qrCode?.value) {
                const currentValue = qrCode.value;
                if (lastScannedCodeRef.current === currentValue) return;
                lastScannedCodeRef.current = currentValue;

                console.log('Scanned QR:', currentValue);
                setCanScan(false);

                try {
                    const scannedOrder = JSON.parse(currentValue);
                    if (!scannedOrder.brand || !scannedOrder.item) {
                        Alert.alert('Invalid QR Code', 'Missing brand or item information.');
                        return;
                    }

                    setData(prevData => {
                        let found = false;

                        const updatedOrders = prevData.todaysOrder.map(order => {
                            if (
                                order.brand === scannedOrder.brand &&
                                order.item === scannedOrder.item &&
                                order.location === scannedOrder.location
                            ) {
                                found = true;
                                return { ...order, status: 'Delivered' };
                            }
                            return order;
                        });

                        if (!found) {
                            updatedOrders.push({
                                brand: scannedOrder.brand,
                                item: scannedOrder.item,
                                location: scannedOrder.location,
                                status: scannedOrder.status,
                            });
                            console.log('New Order Added', `${scannedOrder.brand} - ${scannedOrder.item}`);
                        } else {
                            console.log('Updated', `${scannedOrder.brand} - ${scannedOrder.item} marked as Delivered`);
                        }

                        return { ...prevData, todaysOrder: updatedOrders };
                    });

                } catch (err) {
                    Alert.alert('Invalid QR Code', 'Make sure the QR contains a valid JSON string.');
                    console.error('QR parse error:', err);
                }

                setTimeout(() => {
                    setCanScan(true);
                }, 1000);
            }
        }
    });

    useEffect(() => {
        const checkPermission = async () => {
            const status = Camera.getCameraPermissionStatus();
            console.log('Camera permission status:', status);
            setHasPermission(status === 'granted');
        };
        checkPermission();
    }, []);

    const QRScannerModal = () => {
        if (device == null) {
            return (
                <View style={styles.noCameraView}>
                    <Text style={styles.noCameraText}>Camera device not found</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setQrModel(false)}
                    >
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                </View>
            );
        }




        return (
            <View style={styles.modalContainer}>
                <Camera
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={qrModel}
                    codeScanner={codeScanner}
                    torch={'off'}
                    zoom={1}
                />
                <View style={styles.overlay}>
                    <View style={styles.frame} />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setQrModel(false)}
                    >
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            alignSelf: 'center',
                            backgroundColor: '#ffffffcc',
                            borderRadius: 50,
                            padding: 15,
                            elevation: 5,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 3,
                        }}
                        onPress={() =>
                            setCameraPosition(cameraPosition === 'back' ? 'front' : 'back')
                        }
                    >
                        <Ionicons name="camera-reverse-outline" size={30} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


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
                data={schoolData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <Image source={{uri: `https://teachercanteen.akprojects.co/${item.BrandLogo}`}} style={styles.orderLogo} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.orderName}>{item.MenuTittleEnglish || 'No Data At Here'}</Text>
                            <Text style={styles.orderLocation}>{item.BrandName || 'No Data At Here'}</Text>
                        </View>
                        <Text
                            style={[
                                styles.orderStatus,
                                { color: item.OrderStatus === 'Delivered' ? 'green' : 'orange' },
                            ]}>
                            {item.OrderStatus}
                        </Text>
                    </View>
                )}
            />

            {/* QR Code Image */}
            <TouchableOpacity style={styles.qrContainer} onPress={() => setQrModel(true)}>
                <Image source={qrCode} style={styles.qrImage} />
            </TouchableOpacity>

            <Modal
                visible={qrModel}
                transparent={false}
                animationType="slide"
                onRequestClose={() => setQrModel(false)}
            >
                {hasPermission ? (
                    <QRScannerModal />
                ) : (
                    <View style={styles.permissionView}>
                        <Text style={styles.permissionText}>Camera permission not granted</Text>
                        <TouchableOpacity
                            style={styles.permissionButton}
                            onPress={() => setQrModel(false)}
                        >
                            <Text style={styles.permissionButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Modal>

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
    //styles for QR Scanner
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    frame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 30,
        lineHeight: 40,
    },
    noCameraView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    noCameraText: {
        color: 'white',
        fontSize: 18,
    },
    permissionView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    permissionText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 20,
    },
    permissionButton: {
        padding: 15,
        backgroundColor: '#FF5C00',
        borderRadius: 8,
    },
    permissionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, Modal, Alert } from 'react-native';
// import college from '../../public/assets/college.png';
// import qrCode from '../../public/assets/qr-code.png';
// import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const InstritutionDetails = ({ route }) => {
//     const { data } = route.params;
//     const [qrModel, setQrModel] = useState(false);
//     const [hasPermission, setHasPermission] = useState(false);
//     const [cameraPosition, setCameraPosition] = useState('back');
//     const [canScan, setCanScan] = useState(true);

//     const lastScannedCodeRef = useRef(null);

//     // Camera setup
//     const device = useCameraDevice(cameraPosition);
//     const camera = useRef(null);


//     const codeScanner = useCodeScanner({
//         codeTypes: ['qr'],
//         onCodeScanned: (codes) => {
//           if (!canScan) return;
//           const qrCode = codes.find(c => c.type === 'qr');
//           if (qrCode?.value) {
//             const currentValue = qrCode.value;
//             if (lastScannedCodeRef.current === currentValue) return;
//             lastScannedCodeRef.current = currentValue;
//             console.log(currentValue, 'From insti')
//             setCanScan(false);
//             setTimeout(() => {
//               setCanScan(true);
//             }, 1000);
//           }
//         }
//       });


//     useEffect(() => {
//         const checkPermission = async () => {
//             const status = Camera.getCameraPermissionStatus();
//             console.log('Camera permission status:', status);
//             setHasPermission(status === 'granted');
//         };
//         checkPermission();
//     }, []);

//     const QRScannerModal = () => {
//         if (device == null) {
//             return (
//                 <View style={styles.noCameraView}>
//                     <Text style={styles.noCameraText}>Camera device not found</Text>
//                     <TouchableOpacity
//                         style={styles.closeButton}
//                         onPress={() => setQrModel(false)}
//                     >
//                         <Text style={styles.closeButtonText}>×</Text>
//                     </TouchableOpacity>
//                 </View>
//             );
//         }

//         return (
//             <View style={styles.modalContainer}>
//                 <Camera
//                     ref={camera}
//                     style={StyleSheet.absoluteFill}
//                     device={device}
//                     isActive={qrModel}
//                     codeScanner={codeScanner}
//                     torch={'off'}
//                     zoom={1}
//                 />
//                 <View style={styles.overlay}>
//                     <View style={styles.frame} />
//                     <TouchableOpacity
//                         style={styles.closeButton}
//                         onPress={() => setQrModel(false)}
//                     >
//                         <Text style={styles.closeButtonText}>×</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={{
//                             position: 'absolute',
//                             bottom: 40,
//                             alignSelf: 'center',
//                             backgroundColor: '#ffffffcc',
//                             borderRadius: 50,
//                             padding: 15,
//                             elevation: 5,
//                             shadowOffset: { width: 0, height: 2 },
//                             shadowOpacity: 0.3,
//                             shadowRadius: 3,
//                         }}
//                         onPress={() =>
//                             setCameraPosition(cameraPosition === 'back' ? 'front' : 'back')
//                         }
//                     >
//                         <Ionicons name="camera-reverse-outline" size={30} color="#000" />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     };


//     return (
//         <SafeAreaView style={styles.container}>
//             {/* School Details */}
//             <View style={styles.header}>
//                 <Text style={styles.title}>
//                     <Text style={{ color: '#3E4A59' }}>Central </Text>
//                     <Text style={{ color: '#FF5C00' }}>Kitchen</Text>
//                 </Text>
//             </View>
//             <View style={styles.schoolCard}>
//                 <Image source={college} style={styles.schoolLogo} />
//                 <View>
//                     <Text style={styles.schoolName}>{data.schoolName}</Text>
//                     <Text style={styles.schoolLocation}>{data.location}</Text>
//                 </View>
//             </View>

//             {/* Title */}
//             <Text style={styles.todayOrdersText}>Today Orders</Text>

//             {/* Order List */}
//             <FlatList
//                 data={data.todaysOrder}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.orderCard}>
//                         <Image source={item.logo} style={styles.orderLogo} />
//                         <View style={{ flex: 1 }}>
//                             <Text style={styles.orderName}>{item.item}</Text>
//                             <Text style={styles.orderLocation}>{item.location}</Text>
//                         </View>
//                         <Text
//                             style={[
//                                 styles.orderStatus,
//                                 { color: item.status === 'Delivered' ? 'green' : 'orange' },
//                             ]}>
//                             {item.status}
//                         </Text>
//                     </View>
//                 )}
//             />

//             {/* QR Code Image */}
//             <TouchableOpacity style={styles.qrContainer} onPress={() => setQrModel(true)}>
//                 <Image source={qrCode} style={styles.qrImage} />
//             </TouchableOpacity>

//             <Modal
//                 visible={qrModel}
//                 transparent={false}
//                 animationType="slide"
//                 onRequestClose={() => setQrModel(false)}
//             >
//                 {hasPermission ? (
//                     <QRScannerModal />
//                 ) : (
//                     <View style={styles.permissionView}>
//                         <Text style={styles.permissionText}>Camera permission not granted</Text>
//                         <TouchableOpacity
//                             style={styles.permissionButton}
//                             onPress={() => setQrModel(false)}
//                         >
//                             <Text style={styles.permissionButtonText}>Close</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             </Modal>

//             <TouchableOpacity style={styles.button}>
//                 <Text style={styles.buttonText}>Mark as Delivered</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// export default InstritutionDetails;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 15,
//         backgroundColor: '#fff',
//         paddingTop: 60,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingBottom: 20,
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     schoolCard: {
//         backgroundColor: '#F9F9F9',
//         flexDirection: 'row',
//         padding: 12,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     schoolLogo: {
//         width: 50,
//         height: 50,
//         marginRight: 12,
//         borderRadius: 25,
//     },
//     schoolName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     schoolLocation: {
//         fontSize: 13,
//         color: 'gray',
//     },
//     todayOrdersText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         color: '#000',
//     },
//     orderCard: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#F9F9F9',
//         padding: 12,
//         borderRadius: 10,
//         marginBottom: 10,
//     },
//     orderLogo: {
//         width: 40,
//         height: 40,
//         marginRight: 10,
//     },
//     orderName: {
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     orderLocation: {
//         fontSize: 13,
//         color: 'gray',
//     },
//     orderStatus: {
//         fontSize: 13,
//         fontWeight: 'bold',
//     },
//     qrContainer: {
//         alignItems: 'flex-end',
//         marginVertical: 20,
//     },
//     qrImage: {
//         width: 80,
//         height: 80,
//         marginBottom: 10,
//     },
//     timeText: {
//         fontSize: 16,
//         color: '#000',
//     },
//     button: {
//         backgroundColor: '#E75A26',
//         paddingVertical: 15,
//         borderRadius: 10,
//         marginHorizontal: 20,
//         marginBottom: 10,
//     },
//     buttonText: {
//         color: '#fff',
//         textAlign: 'center',
//         fontWeight: 'bold',
//     },
//     //styles for QR Scanner
//     modalContainer: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.9)',
//     },
//     overlay: {
//         ...StyleSheet.absoluteFillObject,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     frame: {
//         width: 250,
//         height: 250,
//         borderWidth: 2,
//         borderColor: 'white',
//         backgroundColor: 'transparent',
//     },
//     closeButton: {
//         position: 'absolute',
//         top: 50,
//         right: 20,
//         backgroundColor: 'rgba(0,0,0,0.6)',
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     closeButtonText: {
//         color: 'white',
//         fontSize: 30,
//         lineHeight: 40,
//     },
//     noCameraView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'black',
//     },
//     noCameraText: {
//         color: 'white',
//         fontSize: 18,
//     },
//     permissionView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'black',
//     },
//     permissionText: {
//         color: 'white',
//         fontSize: 16,
//         marginBottom: 20,
//     },
//     permissionButton: {
//         padding: 15,
//         backgroundColor: '#FF5C00',
//         borderRadius: 8,
//     },
//     permissionButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });