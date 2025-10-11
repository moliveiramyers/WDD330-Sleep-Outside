const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
  }
 async getData(query) {
   const response = await fetch(`${baseURL}products/search/${query}`);
   console.log("Fetching:", `${baseURL}products/search/${query}`);
   const data = await convertToJson(response);
   console.log("Response JSON:", data);
   return data.Result;
  }



  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
}
export async function getAllProducts() {
  const categories = ["backpacks", "sleeping-bags", "tents"];
  let allProducts = [];

  for (const category of categories) {
    try {
      const response = await fetch(`../public/json/${category}.json`);
      const data = await response.json();
      allProducts = allProducts.concat(
        data.Result.map(p => ({ ...p, Category: category }))
      );
    } catch (err) {
      console.error(`Error loading ${category}:`, err);
    }
  }

  return allProducts;
}
