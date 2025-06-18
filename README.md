# 🧳 SOCK Wallet - React Native Crypto Wallet

**폴리곤 기반 토큰 전송 및 조회가 가능한 React Native 지갑 애플리케이션**  
타입스크립트 기반의 React Native CLI로 구축되었으며, Metro, Keychain, Clipboard, SafeArea 등 다양한 모듈을 활용함.

---

## ⚙️ 기술 스택

- **React Native CLI (TypeScript)**
- **Android/iOS 크로스 플랫폼 지원 🍎🤖**
- **Metro Bundler**
- **react-native-safe-area-context**
- **react-native-keychain** (지갑 주소 보안 저장)
- **react-native-clipboard** (주소 복사/붙여넣기)
- **react-navigation/native**
- **FlatList** + **Fetch API**
- Native Module 연동 (`Keychain`, `Clipboard`)
- Android APK 배포 완료

---

## 📦 프로젝트 실행 방법
```bash

# Metro Bundler 실행
npx react-native start

# 앱 실행
npx react-native run-ios
npx react-native run-android
```

## 🛠️ 배포 (APK 생성 및 테스트)
### ✅ APK 파일 생성

```bash
cd android
./gradlew assembleRelease
```
📍 생성 위치: android/app/build/outputs/apk/release/app-release.apk

⚠️ 실기기 설치 시 주의사항
- 설정 → 보안 → “출처를 알 수 없는 앱 설치 허용” 필요
- 테스트 대상 기기에 APK 파일 직접 전송 (카톡, 이메일, USB 등) 후 설치
- 일부 Android 버전은 APK 설치 시 앱 권한 수동 허용 필요
