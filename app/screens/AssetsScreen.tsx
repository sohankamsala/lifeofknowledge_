import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { MotiView } from "moti";
import { carsList } from "../util/consts/carsList";
import { colorPalette } from "../util/consts/colorPalette";
import { useNavigation } from "expo-router";
import TopContainer from "../components/home_screen_sections/TopContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addAsset, addMessage } from "../redux/slices/data";
import { housesList } from "../util/consts/housesList";
import { Asset } from "../redux/slices/data";

const houses = [
  { id: "1", name: "Luxury Villa", price: 500000 },
  { id: "2", name: "City Apartment", price: 300000 },
  { id: "3", name: "Beach House", price: 750000 },
];

export default function AssetsScreen() {
  const [showCars, setShowCars] = useState(false);
  const [showHouses, setShowHouses] = useState(false);

  const gameData = useSelector((state: RootState) => state.data);
  const ownedItems =  useSelector((state: RootState) => state.data.assets);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const handlePurchase = (item: { name: string; price: number }) => {
    if (gameData.money >= item.price) {
      dispatch(
        addMessage({
          popup: true,
          year: gameData.age,
          text: `You bought ${item.name} for $${item.price}!`,
        })
      );
      console.log("Called")
      dispatch(addAsset({item: item, amount: 1}))
    } else {
      alert("Not enough balance!");
    }
  };

  return (
    <>
      <TopContainer />
      <View style={styles.container}>
        <View style={styles.screenInfo}>
          <Text style={styles.screenTitle}>Assets Marketplace</Text>
          <Text style={styles.balance}>
            Balance: ${gameData.money.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setShowCars(!showCars)}
        >
          <Text style={styles.sectionTitle}>Cars</Text>
          <Text style={styles.toggle}>{showCars ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
        {showCars && (
          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
          >
            <FlatList
              data={carsList}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <View style={styles.item}>
                    <Text style={styles.itemText}>
                      {item.name} - ${item.price.toLocaleString()}
                    </Text>
                    <TouchableOpacity
                      style={styles.buyButton}
                      onPress={() => handlePurchase(item)}
                    >
                      <Text style={styles.buyButtonText}>Buy</Text>
                    </TouchableOpacity>
                  </View>
                </MotiView>
              )}
            />
          </MotiView>
        )}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setShowHouses(!showHouses)}
        >
          <Text style={styles.sectionTitle}>Houses</Text>
          <Text style={styles.toggle}>{showHouses ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
        {showHouses && (
          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
          >
            <FlatList
              data={housesList}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <View style={styles.item}>
                    <Text style={styles.itemText}>
                      {item.name} - ${item.price.toLocaleString()}
                    </Text>
                    <TouchableOpacity
                      style={styles.buyButton}
                      onPress={() => handlePurchase(item)}
                    >
                      <Text style={styles.buyButtonText}>Buy</Text>
                    </TouchableOpacity>
                  </View>
                </MotiView>
              )}
            />
          </MotiView>
        )}
        <View style={styles.ownedItemsContainer}>
          <Text style={[styles.sectionTitle, { color: "black" }]}>
            Owned Items
          </Text>
          {ownedItems.length > 0 ? (
            ownedItems.map((item: Asset, index: any) => (
              <MotiView
                key={index}
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Text style={styles.ownedItem}>- {item.item.name} - {item.amount}x</Text>
              </MotiView>
            ))
          ) : (
            <Text style={styles.noItems}>No assets owned yet.</Text>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenInfo: {
    backgroundColor: colorPalette.primaryColor,
    marginTop: 100,
    marginBottom: 30,
  },
  screenTitle: {
    fontSize: 50,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: colorPalette.primaryColor,
    marginTop: 10,
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  balance: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colorPalette.secondaryColor,
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colorPalette.textColor,
    margin: 10,
  },
  toggle: {
    fontSize: 18,
    color: colorPalette.textColor,
    fontWeight: "bold",
    marginRight: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: colorPalette.inputBackground,
    borderRadius: 10,
    marginVertical: 8,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  buyButton: {
    backgroundColor: colorPalette.primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colorPalette.textColor,
  },
  ownedItemsContainer: {
    backgroundColor: colorPalette.inputBackground,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  ownedItem: {
    fontSize: 18,
    paddingVertical: 8,
    paddingLeft: 30,
    color: colorPalette.secondaryColor,
  },
  noItems: {
    fontSize: 16,
    color: colorPalette.secondaryColor,
    textAlign: "center",
    marginTop: 10,
  },
});
