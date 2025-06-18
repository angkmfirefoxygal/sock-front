# 🧳 SOCK Wallet - React Native Crypto Wallet

**폴리곤 기반 토큰 전송 및 조회가 가능한 React Native 지갑 애플리케이션**  
타입스크립트 기반의 React Native CLI로 구축되었으며, Metro, Keychain, Clipboard, SafeArea 등 다양한 모듈을 활용함.


---
## ⚙️ 기술 스택 및 구현 구성

### 📱 클라이언트

| 항목 | 내용 |
| --- | --- |
| **프레임워크** | React Native CLI (with TypeScript) |
| **플랫폼** | Android / iOS (크로스 플랫폼 지원) |
| **스타일링** | React Native StyleSheet |
| **라우팅** | `@react-navigation/native`, Stack Navigation 사용 |
| **상태 관리** | React `useState`, `useEffect` 기반 단일 상태 흐름 |
| **UI 컴포넌트 구성** | `FlatList`, `TouchableOpacity`, `TextInput`, `SafeAreaView` 등 RN 기본 제공 |


---

### 🧩 주요 라이브러리 & 기능 모듈

| 라이브러리 | 용도 |
| --- | --- |
| `react-native-safe-area-context` | 기기 별 notch 영역 대응 |
| `react-native-keychain` | 지갑 주소 등의 민감 정보 보안 저장 |
| `@react-native-clipboard/clipboard` | 주소 복사/붙여넣기 지원 |


---

### 🔧 기타 도구 및 설정

| 항목 | 설명 |
| --- | --- |
| **Metro Bundler** | RN 기본 번들링 도구 |
| **.prettierrc.js** | 코드 포매팅 설정 |
| **.eslintrc.js** | 린팅 및 코드 컨벤션 체크 |
| **Android APK 빌드** | `./gradlew assembleRelease`로 `.apk` 생성 완료 |
| **Splash/Icon 관리** | xcode와 AndroidStudio를 활용한 네이티브 구성 |
| **디렉토리 구조** | `screens`, `components`, `assets`, `navigation` 모듈화 |


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
