import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type ProgressBarProps = {
  steps: number;
  currentStep: number;
  onBack: () => void;
};

export default function ProgressBar({ steps, currentStep, onBack }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <View style={styles.progressContainer}>
        {Array.from({ length: steps }).map((_, index) => (
          <React.Fragment key={index}>
            <View style={[
              styles.progressDot,
              index + 1 <= currentStep && styles.progressDotActive
            ]} />
            {index < steps - 1 && (
              <View style={[
                styles.progressLine,
                index + 1 < currentStep && styles.progressLineActive
              ]} />
            )}
          </React.Fragment>
        ))}
      </View>

      <Text style={styles.stepText}>
        {currentStep}/{steps}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
  },
  progressDotActive: {
    backgroundColor: '#6366f1',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 4,
  },
  progressLineActive: {
    backgroundColor: '#6366f1',
  },
  stepText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
});