const getUserToken = () => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  return token;
};

const updateUserToken = (value: string) => {
  typeof window !== "undefined" && localStorage.setItem("accessToken", value);
};

const removeUserToken = () => {
  typeof window !== "undefined" && localStorage.removeItem("accessToken");
  return (window.location.pathname = "/login");
};

export { getUserToken, updateUserToken, removeUserToken };
