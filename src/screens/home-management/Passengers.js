import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, FlatList, Image, Linking, Dimensions, Animated } from 'react-native';
import axios from "axios";
import { Pagination } from 'react-native-classic-pagination';
import { apiPassengers } from "../../constants/api";

const Passengers = ({ navigation, route }) => {
  const ITEMS_PER_PAGE = 10;
  const VISIBLE_RANGE = 6;


  const [data, setData] = useState({});
  const [totalPages, setTotalPages] = useState(3343);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async pageNumber => {

    setIsLoading(true);

    try {
      await axios
        .get(
          `${apiPassengers}?page=${currentPage}&size=${ITEMS_PER_PAGE}`
        ).then((res) => {
          setTotalPages(res.data.totalPages)
          setData(res.data.data)
        }).catch((error) =>
          console.log("error ", error)
        )
      setCurrentPage(currentPage);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }

  };

  useEffect(() => {
    (async () => await getData(currentPage))();
  }, [currentPage]);

  const renderItem = ({ item }) => {

    const a = item.airline[0];
    const logo = a.logo.replace(".svg.png", ".png");

    return (
      <View key={item._id} style={styles.flatlistItem}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#3AA1F1', fontWeight: 'bold', fontSize: 21 }}>{item.name}</Text>
        </View>

        <Text style={{ color: '#36A47A', fontWeight: 'bold', fontSize: 18 }}>{item.trips}</Text>

        <Image
          style={{
            width: 100, height: 100,
            resizeMode: 'contain'
          }}
          source={{ uri: logo }}
          onError={(e) => console.log("error:", e)} />
        <Text>{item.airline[0].slogan}</Text>
        <Text>{item.airline[0].website}</Text>
        <Text style={styles.add}>{item.airline[0].country}</Text>
        <Text style={styles.add}>{item.airline[0].established}</Text>
        <Text style={styles.add}>{item.airline[0].head_quaters}</Text>

      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>

      {isLoading ? <Text style={{ fontWeight: 'bold' }} >
        Loading...
              </Text> : <>
          <FlatList
            data={data}
            pagingEnabled
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />

          <Pagination
            activePage={currentPage}
            pageRangeDisplayed={VISIBLE_RANGE}
            totalItemsCount={totalPages}
            itemsCountPerPage={ITEMS_PER_PAGE}
            hideFirstLastPages
            prevPageText="Prev"
            nextPageText="Next"
            onChange={setCurrentPage}
            totalPages={totalPages}
            renderItem={props => (
              <>
                {console.log("properties:", props)}
                <TouchableOpacity
                  {...props}
                  style={
                    {
                      height: 50,
                      alignItems: "center",
                      justifyContent: 'space-between',
                      padding: 0, flex: 1,
                    }
                  }
                >
                  <Text style={props.isActive ? { fontWeight: 'bold' } : { fontWeight: '100' }} >
                    {props.pageText}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          /></>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: "#7C8EB1",
    width: '80%',
    height: 70,
    borederRadius: 56,
    alignItems: 'center',
    justifyContent: 'center'

  },
  itemTitle: {
    color: '#fff',
    fontSize: 26
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: 11,
    padding: 6,
    height: 600,
    width: Dimensions.get('window').width
  },
  add: {
    color: '#717473'
  },
  flatlistItem: {
    borderWidth: 1,
    borderColor: '#717473',
    marginBottom: 6,
    padding: 11,
    marginHorizontal:
      11, borderRadius: 6
  }
});

export default Passengers;