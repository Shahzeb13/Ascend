import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ToastType = "success" | "error" | "info";

type ToastProps = {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;       // ms before auto-hide
  onHide: () => void;
};

const CONFIG: Record<ToastType, { icon: string; bg: string; border: string; color: string }> = {
  success: {
    icon: "checkmark-circle",
    bg: "#0D2B1A",
    border: "#16A34A",
    color: "#4ADE80",
  },
  error: {
    icon: "close-circle",
    bg: "#2B0D0D",
    border: "#DC2626",
    color: "#F87171",
  },
  info: {
    icon: "information-circle",
    bg: "#0D1B2B",
    border: "#2563EB",
    color: "#60A5FA",
  },
};

export default function Toast({
  visible,
  message,
  type = "info",
  duration = 3000,
  onHide,
}: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const cfg = CONFIG[type];

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-dismiss after duration
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, duration);

      return () => clearTimeout(timer);
    } else {
      translateY.setValue(-100);
      opacity.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: cfg.bg,
          borderColor: cfg.border,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      {/* @ts-ignore — Ionicons name is dynamic but valid */}
      <Ionicons name={cfg.icon as any} size={20} color={cfg.color} />
      <Text style={[styles.message, { color: cfg.color }]}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 56,
    left: 20,
    right: 20,
    zIndex: 9999,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    flexWrap: "wrap",
  },
});
