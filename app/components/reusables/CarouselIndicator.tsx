import React from "react";
import { View, StyleSheet } from "react-native";
import { colorPalette } from "../../util/consts/colorPalette";


interface CarouselIndicatorProps {
  stages: number;
  currentStage: number;
}

const CarouselIndicator: React.FC<CarouselIndicatorProps> = ({ stages, currentStage }) => {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({ length: stages }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentStage === index + 1 ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: colorPalette.secondaryColor,
  },
  inactiveDot: {
    backgroundColor: colorPalette.borderColor,
  },
});

export default CarouselIndicator;
