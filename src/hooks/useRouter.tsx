const useRouter = () => {
  const push = (path: string | URL | null) => {
    history.pushState({}, "", path);
    window.onpopstate?.(new PopStateEvent("popstate"));
    window.dispatchEvent(new Event("popstate"));
  };
  return { push };
};

export default useRouter;
