import { getApiUrl } from "./getApiUrl";

export const fetchContent = async (category, setLoading, setItems) => {
  setLoading(true); // Start loading when fetch begins
  try {
    if (category === "All") {
      const urls = getApiUrl(category);

      const responses = await Promise.all(urls.map((url) => fetch(url)));

      for (const response of responses) {
        if (!response.ok) throw new Error("Network response was not ok");
      }

      const dataPromises = responses.map((response) => response.json());
      const allData = await Promise.all(dataPromises);

      // Combine all results and map to item names
      const combinedItems = allData.flat().map((item) => item.name);
      setItems(combinedItems);
    } else {
      const apiUrl = getApiUrl(category);
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setItems(data.map((item) => item.name));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false); 
  }
};
