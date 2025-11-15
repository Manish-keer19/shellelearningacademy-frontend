import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";



// Clear localStorage only once with detailed console logs
if (!localStorage.getItem("hasCleared")) {
  console.group("LocalStorage Cleanup");

  if (localStorage.length === 0) {
    console.log("No localStorage data found.");
  } else {
    console.log("Removing the following keys:");
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log(`🗑 Removed: ${key} =`, localStorage.getItem(key));
    }
  }

  console.groupEnd();

  localStorage.clear();
  localStorage.setItem("hasCleared", "true");

  console.log("✅ localStorage cleared for the first time only.");
}


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
