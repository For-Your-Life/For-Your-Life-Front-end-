# Web Portfolio

ㅤ  
[깃허브](주소)  
[Go to Website](주소)

Next.js 웹 어플리케이션 입니다.
Kakao map API로 다양한 부동산 정보를 시각적으로 볼 수 있고 
편의시설, 자전거도록, 교통정보, 지적편집도, 로드뷰 등 다양한 정보를 확인할 수 있습니다.
Kakao, google 소셜 로그인과 자체 회원가입 후 로그인을 할 수 있습니다.
RESTful API + CRUD를 구현하였습니다.
Admin 페이지로 유저정보를 쉽게 관리하고 공지사항을 게시할 수 있습니다.
유저의 최근검색어를 바탕으로 부동산 매물이 추천됩니다.


## 📖 Docs

- [React](https://reactjs.org/docs/getting-started.html)
- [Next.js](https://v5.reactrouter.com/web/guides/quick-start)
- [SWR](https://lodash.com/)
- [draft.js](https://github.com/martyan/react-customizable-progressbar)
- [icons](https://react-icons.github.io/react-icons/)
- [sass](https://github.com/remarkjs/react-markdown)
- [axios](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- [nookies](https://www.npmjs.com/package/react-scripts)

## 🎯 Goals

- Java + spring boot 백엔드 개발자와 프로젝트 협업을 진행했습니다.
- Next.js의 전반적인 컨셉을 이해&활용하고 부분적으로 SSR을 적용했습니다.
- 서버 상태를 global state로 관리하기 위해 SWR을 적극 활용하였고 로컬 상태의 전역 상태가 요구되는 경우 context API를 사용했습니다.
- 텍스트에디터로 draft.js를 사용했습니다.
- 반응형 뷰를 제작했습니다.
- Cookie와 session으로 JWT를 저장하고 Refresh Token을 재발급받아 로그인 세션을 구현하였습니다.
- 

## 💡 Specs

- React.js
- Next.js
- SWR
- SCSS

### 구성

```json
{
  "name": "airbnb",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@react-hook/window-scroll": "^1.3.0",
    "axios": "^0.26.0",
    "draft-js": "^0.11.7",
    "draftjs-to-html": "^0.9.1",
    "html-to-draftjs": "^1.5.0",
    "next": "12.0.10",
    "nookies": "^2.5.2",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-draft-wysiwyg": "^1.14.7",
    "react-icons": "^4.3.1",
    "react-slick": "^0.28.1",
    "sass": "^1.49.7",
    "slick-carousel": "^1.8.1",
    "sweetalert2": "^11.4.4",
    "sweetalert2-react-content": "^4.2.0",
    "swr": "^1.2.1"
  },
  "devDependencies": {
    "eslint": "8.2.0",
    "eslint-config-airbnb": "19.0.4",
    "eslint-config-next": "12.0.10",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-import": "2.25.3",
    "eslint-plugin-jsx-a11y": "6.5.1",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-react": "7.28.0",
    "eslint-plugin-react-hooks": "4.3.0",
    "node-sass": "^7.0.1",
    "prettier": "^2.5.1",
    "styled-jsx-plugin-sass": "^1.0.0"
  }
}

```
