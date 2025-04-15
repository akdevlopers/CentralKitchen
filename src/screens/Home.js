import React, { useState, useEffect, useRef } from 'react';
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
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { vendarData, Instritutions, users } from '../Data/Data';
import img from '../../public/assets/image.png';
import college from '../../public/assets/college.png';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

import DateTimePicker from '@react-native-community/datetimepicker';


const Home = ({ navigation }) => {
  const [page, setPage] = useState('Home');
  const [qrModel, setQrModel] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [canScan, setCanScan] = useState(true);

  const lastScannedCodeRef = useRef(null);


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

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
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


  const route = useRoute();
  const user = route.params?.user;

  const [ currentUser, setCurrentUser ] = useState(user)

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
        console.log(currentValue, 'From Home Page')
        setCanScan(false);
        setTimeout(() => {
          setCanScan(true);
        }, 1000);
      }
    }
  });


  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token:', token);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const checkPermission = async () => {
      const status = await Camera.getCameraPermissionStatus();
      console.log('Camera permission status:', status);
      setHasPermission(status === 'granted');
    };
    checkPermission();
  }, []);

  const handleLogOut = async () => {
    navigation.navigate("Login");
    await AsyncStorage.removeItem('userToken');
  };

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
      <View style={styles.qrModalContainer}>
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
          {/* Overlays around the frame */}
          <View style={styles.maskTop} />
          <View style={styles.middleRow}>
            <View style={styles.maskSide} />
            <View style={styles.frame} />
            <View style={styles.maskSide} />
          </View>
          <View style={styles.maskBottom} />

          {/* Close and Camera Flip Buttons */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setQrModel(false)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flipButton}
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={{ color: '#3E4A59' }}>Central </Text>
          <Text style={{ color: '#FF5C00' }}>Kitchen</Text>
        </Text>
        <TouchableOpacity
          style={{
            display: page === "Profile" || page === "Institution" ? "none" : "flex",
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            alignSelf: 'flex-start',
            margin: 10
          }}
          onPress={() => setQrModel(true)}
        >
          <Ionicons name="add-outline" size={20} color="#E85C33" />
          <Text style={{ marginLeft: 6, color: '#E85C33', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>

      </View>

      {/* QR Scanner Modal */}
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

      {/* Search */}
      <View style={page !== "Home" && page !== "Instritution" ? { display: "none" } : {}}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ccc" />
          <TextInput
            placeholder={page === "Home" ? "Search Food" : page === "Instritution" ? "Search Instritution" : ""}
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Page Content */}
      {page === 'Home' ? (
        <>
          {/* Filters */}
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
        </>
      ) : page === "Instritution" ? (
        <>
          {/* Filters */}
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
        </>
      ) : (
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

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
              <Icon name="log-out" size={20} color="#d9534f" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}

      {/* Filter Modal  */}

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

                  <Text style={styles.label}>Vendor</Text>
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
                  />

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


                  <Text style={styles.label}>Institutions</Text>

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
                  </View>


                  <View style={styles.checkboxContainer}>
                    {/* You can replace with actual CheckBox if needed */}
                    <Text>Missed Items</Text>
                  </View>

                  <View style={styles.footer}>
                    <TouchableOpacity onPress={clearFilters}>
                      <Text style={styles.clear}>Clear Filter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filterBtn}>
                      <Text style={styles.filterText}>Filter</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setPage("Home")}>
          <Ionicons name="home" size={24} color={page === 'Home' ? '#E85C33' : '#000'} />
          <Text style={page === 'Home' ? styles.tabLabel : styles.tabLabelNone}>{page === 'Home' && 'Stocks'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setPage("Instritution")}>
          <Ionicons name="pricetag" size={24} color={page === 'Instritution' ? '#E85C33' : '#000'} />
          <Text style={page === 'Instritution' ? styles.tabLabel : styles.tabLabelNone}>{page === 'Instritution' && 'Instritution'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setPage("Profile")}>
          <Ionicons name="person" size={24} color={page === 'Profile' ? '#E85C33' : '#000'} />
          <Text style={page === 'Profile' ? styles.tabLabel : styles.tabLabelNone}>{page === 'Profile' && 'Account'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: '#000',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#fff',
    // paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  tabLabelActive: {
    fontSize: 12,
    color: '#E85C33',
    fontWeight: 'bold',
    marginTop: 4,
  },
  tabLabelNone: {
    display: 'none',
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
  //styles for QR Scanner
  qrModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRow: {
    flexDirection: 'row',
  },
  frame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
  },
  maskTop: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  maskBottom: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  maskSide: {
    width: (StyleSheet.hairlineWidth * 1000), // Auto fill based on screen
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 250,
  },
  flipButton: {
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
  },
  // ---  
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

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default Home;