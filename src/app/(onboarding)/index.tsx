import Dot from "@/src/components/Dot";
import { BACKGROUND_COLOR, PAGES } from "@/src/constants/constants";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import { router } from "expo-router";
import Page, { PAGE_WIDTH } from "../../components/Page";

export default function HomeScreen() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const scrollRef = useAnimatedRef<ScrollView>();

  //   const onIconPress = useCallback(() => {
  //     if (activeIndex.value === PAGES.length - 1) return;
  //     scrollRef.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) });
  //   }, [activeIndex, scrollRef]);

  const handleCreate = React.useCallback(async () => {
    try {
      await AsyncStorage.setItem("completedOnboarding", "Done");
      router.push("/(auth)");
    } catch (error) {
      console.error("Failed to save onboarding status", error);
    }
  }, []);

  const onIconPress = useCallback(() => {
    if (activeIndex.value === PAGES.length - 1) {
      handleCreate();
    } else {
      scrollRef.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) });
    }
  }, [activeIndex, scrollRef, handleCreate]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        ref={scrollRef as any}
        style={{ flex: 1 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {PAGES.map((page, index) => (
          <Page
            key={index.toString()}
            page={page}
            translateX={translateX}
            index={index}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        {/* Paginator */}
        <View style={[styles.fillCenter, { flexDirection: "row" }]}>
          {PAGES.map((_, index) => {
            return (
              <Dot
                key={index.toString()}
                index={index}
                activeDotIndex={activeIndex}
              />
            );
          })}
        </View>
        {/* Text Container */}
        <View style={styles.fillCenter}>
          <Text style={styles.text}>View Board</Text>
        </View>
        {/* iconContainer */}
        <View style={styles.fillCenter}>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            onPress={onIconPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  footer: {
    height: 50,
    marginBottom: 50,
    flexDirection: "row",
  },
  fillCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.7,
    fontWeight: "500",
  },
});
