const useRouter = () => {
  const push = (path: string | URL | null) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };
  return { push };
};

export default useRouter;
