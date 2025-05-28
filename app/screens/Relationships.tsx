import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import TopContainer from "../components/home_screen_sections/TopContainer";
import { router, useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Activity } from "./Activities";
import { colorPalette } from "../util/consts/colorPalette";

const screenWidth = Dimensions.get("window").width;

function Relationships() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const relationships = useSelector(
    (state: RootState) => state.data.relationships
  );

  const getBondColor = (bond: number) => {
    if (bond >= 50) return "rgb(67,232,2)"; // green
    if (bond >= 20) return "rgb(252,226,48)"; // yellow
    return "red";
  };

  const handleRelationshipPress = (relationship: any) => {
    const activities: Activity[] = [
      {
        title: "Movies",
        subtitle: "Enjoy a film together",
        relationship: true,
      },
      {
        title: "Conversation",
        subtitle: "Talk about life",
        relationship: true,
      },
      { title: "Walk", subtitle: "Enjoy nature together", relationship: true },
      { title: "Gift", subtitle: "Show your appreciation", relationship: true },
      { title: "Cook", subtitle: "Share a meal", relationship: true },
    ];

    router.replace({
      pathname: "./Activities",
      params: {
        relationshipName: `${relationship.name[0]} ${relationship.name[1]}`,
        activities: JSON.stringify(activities),
      },
    });
  };

  const renderRelationship = ({ item }: any) => (
    <TouchableOpacity onPress={() => handleRelationshipPress(item)}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            {item.name[0]} {item.name[1]} ({item.type})
          </Text>
          <Text style={styles.arrow}>{">"}</Text>
          <Text style={styles.text}>Bond: {item.bond}%</Text>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  width: `${item.bond}%`,
                  backgroundColor: getBondColor(item.bond),
                },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.pageContainer}>
      <TopContainer />
      <FlatList
        style={styles.list}
        data={relationships}
        renderItem={renderRelationship}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colorPalette.primaryColor,
  },
  list: {
    marginTop: 80,
  },
  container: {
    width: screenWidth - 20,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10,
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  content: {
    flexDirection: "column",
    padding: 15,
  },
  text: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: "500",
  },
  barContainer: {
    height: 15,
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    marginTop: 5,
  },
  bar: {
    height: "100%",
  },
  arrow: {
    position: "absolute",
    right: 0,
    margin: 35,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Relationships;
