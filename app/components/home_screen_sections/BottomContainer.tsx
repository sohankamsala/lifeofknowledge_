
import { getUser } from "../../../functions/http_triggers/getUser";
import { updateGameState } from "../../../functions/http_triggers/updateGameState";
import { updatePopupState } from "../../../functions/http_triggers/updatePopupState";
import { RootState } from "../../redux/store";
import { Activity } from "../../screens/Activities";
import { useNavigation, router } from "expo-router";
import { colorPalette } from "../../util/consts/colorPalette";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";

const BottomContainer: React.FC = () => {
  const navigation = useNavigation();
  const gameData = useSelector((state: RootState) => state.data);
  const popupsData = useSelector((state: RootState) => state.popups);
  const profileData = useSelector((state: RootState) => state.userProfile);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const activities: Activity[] = [
    { title: "Doctor", subtitle: "Visit the doctor", relationship: false },
    { title: "Study", subtitle: "Get your knowledge up.", relationship: false },
    { title: "Gym", subtitle: "Get in shape.", relationship: false },
    { title: "Vacation", subtitle: "Sit back and relax", relationship: false },
    { title: "Lottery", subtitle: "Let's make it big!", relationship: false },
    { title: "Sports", subtitle: "Get physical", relationship: false },
  ];

  // async function handleSignout() {
  //   console.log("called")
  //   const user = await getUser(profileData.username);
  //   if (user) {
  //     console.log("found user")
  //     updateGameState(user, gameData);
  //     updatePopupState(user, popupsData);
  //   }

  //   router.replace("/");
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* <TouchableOpacity style={styles.button} onPress={handleSignout}> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.replace("/screens/AssetsScreen");
          }}
        >
          <View style={styles.shadow}>
            <View
              style={{
                // backgroundColor: "red",
                padding: 1,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image
                style={styles.images}
                source={require("../../../assets/images/house.png")}
              />
            </View>
          </View>
          {/* <Text style={styles.smallText}>Signout</Text> */}
          <Text style={styles.smallText}>Assets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.replace({
              pathname: "./Activities",
              params: {
                relationshipName: null,
                activities: JSON.stringify(activities),
              },
            });
          }}
        >
          <View style={styles.shadow}>
            <Image
              style={styles.images}
              source={require("../../../assets/images/activities.png")}
            />
          </View>
          <Text style={styles.smallText}>Activities</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.replace("/screens/Relationships");
          }}
        >
          <View style={styles.shadow}>
            <Image
              style={styles.images}
              source={require("../../../assets/images/relationships.png")}
            />
          </View>
          <Text style={styles.smallText}>Relationships</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (gameData.age < 24) {
              Alert.alert(
                "You can't get a job yet, graduate university first!"
              );
            } else {
              router.replace("/screens/Jobs");
            }
          }}
        >
          <View style={styles.shadow}>
            <Image
              style={styles.images}
              source={require("../../../assets/images/jobs.png")}
            />
          </View>
          <Text style={styles.smallText}>Jobs</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BottomContainer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "90%",
    height: 120,
    bottom: 40,
    left: "5%",
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 10,
    borderRadius: 15,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    padding: 5,
    overflow: "hidden",
  },
  button: {
    backgroundColor: colorPalette.primaryColor,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.08,
    elevation: 10,
    borderRadius: 15,
    height: 90,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 12,
    borderRadius: 10,
  },
  images: {
    height: 60,
    width: 60,
    marginBottom: 5,
  },
  smallText: {
    fontSize: 10,
    textAlign: "center",
    color: "white",
  },
});
