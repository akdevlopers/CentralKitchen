import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Pagination = ({ setLength }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagePress = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < setLength) setCurrentPage(currentPage + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrev}>
        <Text style={styles.arrow}>{'<'}</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.pageContainer}>
          {Array.from({ length: setLength }, (_, index) => {
            const page = index + 1;
            const isActive = currentPage === page;
            return (
              <TouchableOpacity
                key={page}
                onPress={() => handlePagePress(page)}
                style={[styles.page, isActive && styles.activePage]}
              >
                <Text style={[styles.pageText, isActive && styles.activePageText]}>
                  {page}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity onPress={handleNext}>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f6f9ff',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  pageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  page: {
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  activePage: {
    backgroundColor: '#7686d5',
  },
  pageText: {
    color: '#333',
    fontWeight: '500',
  },
  activePageText: {
    color: '#fff',
  },
  arrow: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#aaa',
  },
});

export default Pagination;
