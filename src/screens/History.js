import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {users} from '../Data/Data';

const img = require('../../public/assets/image.png');
const college = require('../../public/assets/image.png');
import DateTimePicker from '@react-native-community/datetimepicker';

const History = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('StockIn');
  const [visible, setVisible] = useState(false);
  const stockinData = users.data.flatMap(user => user.stockin);
  const stockoutData = users.data.flatMap(user => user.stockout);

  // FILTER DATA STARTS
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
  const [selectedInstitutionIds, setSelectedInstitutionIds] = useState([]);
  const [search, setSearch] = useState('');
  const [schoolSearch, setSchoolSearch] = useState('');

  //   const formatDate = date => {
  //     const d = new Date(date);
  //     return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
  //       .toString()
  //       .padStart(2, '0')}-${d.getFullYear()}`;
  //   };

  const formatDate = date => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
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

    // Extract school_name from instData
    const schoolNames = instData.map(item => item.school_name);

    setVendors(Array.from(vendorSet));
    setInstitutions(schoolNames); // use the mapped names
  }, [instData]);

  console.log(institutions, 'UnKnown Data');

  const filteredVendor = vendors.filter(v =>
    v.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleVendor = vendor => {
    setSelectedVendors(prev =>
      prev.includes(vendor)
        ? prev.filter(v => v !== vendor)
        : [...prev, vendor],
    );
  };

  // FILTER ENDS

  const renderStockIn = ({item}) => (
    <View style={styles.itemContainer}>
      {History.length > 0 ? (
        <>
      <Image
        source={{uri: `https://teachercanteen.akprojects.co/${item.BrandLogo}`}}
        style={styles.logo}
      />
      <View style={{flex: 1}}>
        <Text style={styles.itemName}>{item.MenuTittleEnglish}</Text>
        <Text style={styles.qty}>Qty: {item.StockinQuantity}</Text>
        <Text style={styles.date}>{item.StockinUpdated}</Text>
      </View>
      </>
      ) : (
        <Text>No Data</Text>
      )}
    </View>
  );

  const renderStockOut = ({item}) => (
    <>
    {StockOut.length != 0 ? (
    <TouchableOpacity
      onPress={() => navigation.navigate('historyDetails', {data: item})}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: `https://teachercanteen.akprojects.co/${item.school_logo}`,
          }}
          style={styles.logo}
        />
        <View style={{flex: 1}}>
          <Text style={styles.itemName}>{item.school_name}</Text>
          <Text style={styles.qty}>{item.school_address}</Text>
          <Text style={styles.date}>Qty: {item.pending_qty}</Text>
        </View>
        <View>
          <Text style={styles[item.status]}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
    ) : (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style= {{color: 'black'}}>No Data Found</Text>
      </View>
    )}
    </>
  );

  // Filter Data Starts

  const [vedorData, setVendorData] = useState([]);
  //   const filteredVendors = vedorData;
  const [vendorId, setVendorId] = useState([]);
  const toggleVendors = vendor => {
    if (vendorId.includes(vendor.BrandID)) {
      setVendorId(prev => prev.filter(id => id !== vendor.BrandID));
    } else {
      setVendorId(prev => [...prev, vendor.BrandID]);
    }
  };
  const vendorIdString = vendorId.join(',');

  const filteredVendors = vedorData.filter(vendor =>
    vendor.BrandName.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  useEffect(() => {
    const fetchVendor = async () => {
      const token = await AsyncStorage.getItem('userToken');
      try {
        const response = await fetch(
          'https://teachercanteen.akprojects.co/api/v1/getvendors',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (json.status) {
          setVendorData(json.result);
        } else {
          console.log('Failed to List Vendor Filter Data:', json);
        }
      } catch (error) {
        console.error('List Vendor Filter Data Failed:', error.message);
      }
    };

    fetchVendor();
  }, []);

  const [instData, setInstData] = useState([]);

  useEffect(() => {
    const fetchInsti = async () => {
      const token = await AsyncStorage.getItem('userToken');
      try {
        const response = await fetch(
          'https://teachercanteen.akprojects.co/api/v1/institutionList',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (json.status) {
          setInstData(json.data);
        } else {
          console.log('Failed to List Vendor Filter Data:', json);
        }
      } catch (error) {
        console.error('List Vendor Filter Data Failed:', error.message);
      }
    };

    fetchInsti();
  }, []);

  console.log(instData, 'Institution Filter Data');

  const [History, setHistory] = useState({});

  useEffect(() => {
    const fetchHistory = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const user = {
        vendor: vendorId.join(','),
        from_date: formatDate(fromDate),
        to_date: formatDate(toDate),
        search: search,
      };
      console.log(user);
      try {
        const response = await fetch(
          'https://teachercanteen.akprojects.co/api/v1/histock-inList',
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
          setHistory(json.result);
          console.log('History Data', History);
        } else {
          console.log('Failed to List History Data:', json);
        }
      } catch (error) {
        console.error('List History Data Failed:', error.message);
      }
    };

    fetchHistory();
  }, [vendorId, fromDate, toDate, search]);

  const [StockOut, setStockOut] = useState({});

  useEffect(() => {
    const fetchStockOut = async () => {
      const token = await AsyncStorage.getItem('userToken');

      const user = {
        // from_date: formatDate(fromDate),
        // to_date: formatDate(toDate),
        // search: schoolSearch
        fromDate: formatDate(fromDate),
        toDate: formatDate(toDate),
        search: schoolSearch,
        vendor: selectedInstitutionIds.join(', ')
      };

      console.log(user, "selecteed id test")

      try {
        const response = await fetch(
          'https://teachercanteen.akprojects.co/api/v1/stockOutList',
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
          setStockOut(json.data);
          console.log('StockOut Data', StockOut);
        } else {
          console.log('Failed to List StockOut Data:', json);
        }
      } catch (error) {
        console.error('List StockOut Data Failed:', error.message);
      }
    };

    fetchStockOut();
  }, [fromDate, toDate, schoolSearch, selectedInstitutionIds]);

  console.log('History  StockOut data: ', StockOut);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#ccc" />
        {activeTab === 'StockIn' ? (
          <TextInput
            placeholder="Search Vendor"
            placeholderTextColor="#999"
            style={styles.searchInput}
            onChangeText={setSearch}
            value={search}
          />
        ) : (
          <TextInput
            placeholder="Search School"
            placeholderTextColor="#999"
            style={styles.searchInput}
            onChangeText={setSchoolSearch}
            value={schoolSearch}
          />
        )}
      </View>
      <View style={styles.filterContainer}>
        <View style={styles.filterBox}>
          <Text style={styles.label}>Vendor</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setVisible(true)}>
            <Text style={styles.buttonText}>All</Text>
            <AntDesign name="down" size={14} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterBox}>
          <Text style={styles.label}>Date Range</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setVisible(true)}>
            <MaterialIcons name="date-range" size={16} color="#555" />
            <Text style={styles.buttonText}>12th - 14th Mar,25</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.viewcontainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('StockIn')}
          style={styles.tab}>
          <Text
            style={[styles.text, activeTab === 'StockIn' && styles.activeText]}>
            Stock In
          </Text>
          {activeTab === 'StockIn' && <View style={styles.underline} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('StockOut')}
          style={styles.tab}>
          <Text
            style={[
              styles.text,
              activeTab === 'StockOut' && styles.activeText,
            ]}>
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
          data={History}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderStockIn}
        />
      ) : (
        <FlatList
          data={StockOut}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderStockOut}
        />
      )}

      <Modal visible={visible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={() => setVisible(false)}>
                    <Ionicons name="close" size={24} color="black" />
                  </TouchableOpacity>

                  <Text style={styles.heading}>Filter</Text>
                  <Text style={styles.label}>Date Range</Text>

                  <View style={styles.dateContainer}>
                    <TouchableOpacity
                      style={styles.dateBox}
                      onPress={() => setShowFromPicker(true)}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="gray"
                      />
                      <Text>{formatDate(fromDate)}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.dateBox}
                      onPress={() => setShowToPicker(true)}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="gray"
                      />
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

                  {/* stock in filter  */}

                  {activeTab === 'StockIn' ? (
                    <>
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
                        keyExtractor={item => item.BrandID.toString()}
                        renderItem={({item}) => {
                          const isChecked = vendorId.includes(item.BrandID);
                          return (
                            <TouchableOpacity
                              style={[
                                styles.checkboxContainer,
                                isChecked && styles.checkboxSelected,
                              ]}
                              onPress={() => toggleVendors(item)}>
                              <Ionicons
                                name={isChecked ? 'checkbox' : 'square-outline'}
                                size={20}
                                color={isChecked ? '#E85C33' : 'gray'}
                                style={{marginRight: 6}}
                              />
                              <Text
                                style={{color: isChecked ? '#E85C33' : '#000'}}>
                                {item.BrandName}
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </>
                  ) : (
                    <>
                      {/* stock out filter  */}

                      <Text style={styles.label}>Institutions</Text>

                      <TextInput
                        placeholder="Search institution"
                        style={styles.input}
                        value={searchInstitution}
                        onChangeText={setSearchInstitution}
                      />

                      {searchInstitution.length > 0 && (
                        <FlatList
                          data={institutions.filter(
                            item =>
                              item
                                .toLowerCase()
                                .includes(searchInstitution.toLowerCase()) &&
                              !selectedInstitutions.includes(item),
                          )}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              onPress={() => {
                                const selectedInstitution = instData.find(
                                  inst => inst.school_name === item,
                                );

                                if (selectedInstitution) {
                                  setSelectedInstitutions(prev => [
                                    ...prev,
                                    item,
                                  ]);
                                  setSelectedInstitutionIds(prev => [
                                    ...prev,
                                    selectedInstitution.school_id,
                                  ]);
                                }

                                setSearchInstitution('');
                              }}>
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
                                const removedInstitution = instData.find(
                                  inst => inst.school_name === item,
                                );

                                setSelectedInstitutions(prev =>
                                  prev.filter(i => i !== item),
                                );

                                if (removedInstitution) {
                                  setSelectedInstitutionIds(prev =>
                                    prev.filter(
                                      id => id !== removedInstitution.school_id,
                                    ),
                                  );
                                }
                              }}>
                              <Ionicons name="close" size={16} />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    </>
                  )}
                  {/* <View style={styles.checkboxContainer}>
                    <Text>Missed Items</Text>
                  </View> */}

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
    width: '100%',
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
    width: '50%',
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
    padding: 20,
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
    marginBottom: 15,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '50%',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '47%',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
    alignItems: 'center',
    gap: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clear: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  filterBtn: {
    backgroundColor: '#EA5B27',
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '50%',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '47%',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
    alignItems: 'center',
    gap: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  filterBtn: {
    backgroundColor: '#EA5B27',
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
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
    margin: 4,
  },
});
