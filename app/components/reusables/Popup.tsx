import React, { useState, useEffect, JSX } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/slices/data";
import { setPopupState } from "../../redux/slices/popups";
import { RootState } from "../../redux/store";
import { MotiView } from "moti";
import Doctor from "./popups/self/Doctor";
import Study from "./popups/self/Study";
import Gym from "./popups/self/Gym";
import Vacation from "./popups/self/Vacation";
import Movies from "./popups/relationships/Movies";
import Major from "./popups/self/Major";
import Death from "./popups/self/Death";
import JobApplication from "./popups/self/JobApplication";
import Conversation from "./popups/relationships/Conversation";
import Lotteryy from "./popups/self/Lotteryy";
import Sports from "./popups/self/Sports";

interface LabeledComponent {
  label: string;
  component: JSX.Element;
}

const popupComponents: LabeledComponent[] = [
  { label: "death", component: <Death /> },
  { label: "gym", component: <Gym /> },
  { label: "vacation", component: <Vacation /> },
  { label: "study", component: <Study /> },
  { label: "doctor", component: <Doctor /> },
  { label: "major", component: <Major /> },
  { label: "conversation", component: <Conversation /> },
  { label: "movies", component: <Movies /> },
  { label: "jobapplication", component: <JobApplication /> },
  { label: "lottery", component: <Lotteryy /> },
  { label: "sports", component: <Sports /> },
];

const Popup = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const popups = useSelector((state: RootState) => state.popups);

  const [content, setContent] = useState<JSX.Element | null>(null);

  const closePopup = () => {
    dispatch(setPopupState({ whichPopup: "", open: false }));
    setTimeout(() => setContent(null), 200);
  };

  useEffect(() => {
    const lastMessage = data.messages?.[data.messages.length - 1];
    if (lastMessage?.popup && lastMessage.text !== content?.props.children) {
      setContent(<Text style={styles.messageText}>{lastMessage.text}</Text>);
    }
  }, [data.messages]);

  useEffect(() => {
    dispatch(setPopupState({ whichPopup: "", open: false }));
    if (!data.alive) {
      dispatch(
        addMessage({ year: data.age, text: "You died 🤣", popup: false })
      );
      setTimeout(() => {
        setContent(<Death />)
      }, 500);
    }
  }, [data.alive]);

  useEffect(() => {
    if (!popups.popup.open) {
      setTimeout(() => setContent(null), 200);
      return;
    }

    const matchedComponent = popupComponents.find(
      (item) => item.label === popups.popup.whichPopup
    );

    if (matchedComponent?.component !== content) {
      setContent(matchedComponent?.component || null);
    }
  }, [popups.popup.whichPopup, popups.popup.open]);

  if (!content) return null;

  return (
    <>
      <MotiView
        style={styles.mask}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "timing", duration: 150 }}
      />

      <View style={styles.centeringWrapper}>
        <MotiView
          style={styles.container}
          from={{ translateY: 300, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: 300, opacity: 0 }}
          transition={{ type: "timing", duration: 200 }}
        >
          {data.alive && (
            <TouchableOpacity onPress={closePopup} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>
          )}
          <View style={styles.inner}>{content}</View>
        </MotiView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inner: {
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 270,
    zIndex: 100,
  },

  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 2,
  },
  centeringWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  container: {
    width: 360,
    height: 350,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    padding: 20,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#ff3b3b",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  messageText: {
    color: "#222",
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 20,
    fontWeight: "500",
  },
});

export default Popup;
