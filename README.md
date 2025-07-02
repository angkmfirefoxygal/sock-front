# SOCK - 모바일 암호화폐 지갑 앱

---

## ✍️ 프로젝트 소개
SOCK은 숙명여대와 HiFiveLab이 참여한 산학 협력 프로젝트로 **암호화폐 초보자도 쉽게 이용할 수 있는 모바일 암호화폐 지갑 앱**입니다.


## 🕰️ 개발 기간
2025.4.1 ~ 2025.6.30


## 📌 주요 기능

**1. 비밀번호 설정 및 입력**
- 앱 최초 이용 시, 영문 숫자 조합 8자 이상의 비밀번호 설정
- 이후 설정한 비밀번호 재입력으로 앱 사용이 가능함
**2. 지갑 생성 및 복구**
- 지갑 생성 버튼 클릭 시 니모닉 문구 생성
- 기존 니모닉 문구로 이후 지갑 복구 가능
**3. 토큰 보내기/받기**
**4. 거래내역(트랜잭션) 확인**
**5. 도움말 기능**


|비밀번호 설정 및 입력|지갑 생성|지갑 복구|
|:-:|:-:|:-:|
|![Image](https://github.com/user-attachments/assets/8e08215d-eb61-4c4e-a251-50366e7a3caf)| ![Image](https://github.com/user-attachments/assets/093421c3-11db-4ec1-ae85-037b679296f2)| ![Image](https://github.com/user-attachments/assets/ac833cd0-425b-4816-976a-050d245e6117) 


|토큰 보내기|토큰 받기|거래내역 확인|도움말|
|:-:|:-:|:-:|:-:|
|![Image](https://github.com/user-attachments/assets/9ae57ef4-06fd-482d-902a-97f75bf7ea4a)| ![Image](https://github.com/user-attachments/assets/6eaad1fe-a019-4570-9bb5-39166989cfd6)| ![Image](https://github.com/user-attachments/assets/ce75000e-485d-4cf8-85b1-87929a6e56e6)| ![Image](https://github.com/user-attachments/assets/7751e051-bc4e-43ec-9076-bef10f7b4277)|

---

## 🧑‍💻 팀원 소개

| **이름**    | **역할**        |
|-------------|-----------------|
| 조수진      | Project Owner   |              
| 안지희      |<div align=center>FrontEnd</div>|                
| 이서현      |<div align=center>BackEnd</div>|              

---

## ⚙️ 기술 스택

<table>
  <thead>
    <tr>
      <th>분류</th>
      <th>기술 스택</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>프론트엔드</td>
      <td>
        <img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=black"/>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td>백엔드</td>
      <td>
        <img src="https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white"/>
        <img src="https://img.shields.io/badge/Rust-000000?style=flat&logo=rust&logoColor=white"/>
        <img src="https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white"/>
      </td>
    </tr>
  </tbody>
</table>

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
| `react-native-clipboard/clipboard` | 주소 복사/붙여넣기 지원 |


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

### ⚠️ 실기기 설치 시 주의사항
- 설정 → 보안 → “출처를 알 수 없는 앱 설치 허용” 필요
- 테스트 대상 기기에 APK 파일 직접 전송 (카톡, 이메일, USB 등) 후 설치
- 일부 Android 버전은 APK 설치 시 앱 권한 수동 허용 필요
