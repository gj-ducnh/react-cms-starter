export const getEnvironment = (): "browser" | "server" => {
  const isDOM =
    typeof window !== "undefined" &&
    window.document &&
    window.document.documentElement;

  return isDOM ? "browser" : "server";
};

export const sleep = (timeoutMs: number) => {
  return new Promise((r) => {
    setTimeout(() => {
      r(true);
    }, timeoutMs);
  });
};
