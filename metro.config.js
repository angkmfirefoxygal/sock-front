// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// ✅ svg 관련 설정 제거
const config = {}; // 특별한 설정 없을 경우 비워도 됨

module.exports = mergeConfig(defaultConfig, config);