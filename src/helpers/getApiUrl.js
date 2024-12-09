const BASE_URL = process.env.REACT_APP_BASE_URL
console.log(BASE_URL)

export function getApiUrl(category) {
    switch (category) {
        case "Sports & Athletes":
          return `${BASE_URL}/api/sports`;
        case "Fiction":
          return `${BASE_URL}/api/fictions`;
        case "Celebrities":
          return `${BASE_URL}/api/celebrities`;
        case "World Leaders":
          return `${BASE_URL}/api/leaders`;
        case "Household":
          return `${BASE_URL}/api/households`;
        case "Names":
          return `${BASE_URL}/api/names`;
        default:
          return [
            `${BASE_URL}/api/sports`,
            `${BASE_URL}/api/fictions`,
            `${BASE_URL}/api/celebrities`,
            `${BASE_URL}/api/leaders`,
            `${BASE_URL}/api/households`,
          ];
      }
}