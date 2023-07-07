# Wanted-Challenge-Nextjs
## 과제 구현 설명

#### **src/components/Router.tsx**

```tsx
import React, { createContext, useEffect, useState } from "react";

interface RouterContextType {
  pathName: string | URL;
}

interface RouterProps {
  children: React.ReactNode;
}

export const RouterContext = createContext<RouterContextType | null>(null);

const Router = ({ children }: RouterProps) => {
  const [pathName, setPathName] = useState<string>(window.location.pathname);

  useEffect(() => {
    setPathName(window.location.pathname);

    window.addEventListener("popstate", () => {
      setPathName(window.location.pathname);
    });
  }, []);

  return (
    <RouterContext.Provider value={{ pathName }}>
      {children}
    </RouterContext.Provider>
  );
};

export default Router;

```

경로에 대한 정보를 전역적으로 관리하고 공급하기 위해 createContext 함수를 사용하여 RouterContext를 생성하였습니다.

Router 함수에서든 children으로 컴포넌트 페이지들을 받아오고, useState를 사용하여 현재 페이지의  경로를 pathName에 저장하였습니다. popstate 이벤트가 발생하면 현재 URL  경로 이름을 pathName에 업데이트를 합니다. 

retrun 값에 Provider를 사용하여 하위 구성 요소에 컨텍스트 데이터인 경로 정보를 전달하기 위해 사용합니다.



#### src/components/Route.tsx

```tsx
import React, { useContext } from "react";
import { RouterContext } from "./Router";

interface RouteProps {
  path: string | URL;
  component: React.ReactNode;
}

const Route = ({ path, component }: RouteProps) => {
  const currentPath = useContext(RouterContext)?.pathName;

  return path === currentPath ? component : null;
};

export default Route;
```

컴포넌트와 경로를 props로 전달 받습니다. useContext Hook을 사용하여 Provider에서 전달받은 pathName을 가져옵니다. 후에 props의 path와 Provider에서 가져온 pathName을 저장한 currentPath가 일치한다면 컴포넌트를 보여줍니다.



#### src/hooks/useRouter.tsx

```tsx
const useRouter = () => {
  const push = (path: string | URL | null) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };
  return { push };
};

export default useRouter;

```

useRouter 커스텀훅을 만들어 popstate 이벤트가 발생하지 않고 새로고침 할필요없이 path 경로로 이동합니다. pathName이 변경되면 dispatchEvent함수를 통해 변경된 pathName이 저장됩니다.



#### src/components/Button.tsx

```tsx
import useRouter from "../hooks/useRouter";

interface ButtonProps {
  children: string;
  path: string;
}

const Button = ({ children, path }: ButtonProps) => {
  const { push } = useRouter();
  const handleButtonClick = () => {
    push(`${path}`);
  };

  return (
    <button type="button" onClick={() => handleButtonClick()}>
      {children}
    </button>
  );
};

export default Button;

```

children과 path를 props로 받는 재사용이 가능한 버튼 컴포넌트입니다. children으로 버튼의 컨텐츠를 사용합니다. 

useRouter 커스텀 훅의 push를 사용하여 props로 받아오는 path를 버튼이 클릭하였을때 해당 경로로 가도록 함수를 만들었습니다.

