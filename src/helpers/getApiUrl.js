export function getApiUrl(category) {
    switch (category) {
        case "Sports & Athletes":
          return "http://localhost:5000/api/sports";
        case "Fiction":
          return "http://localhost:5000/api/fictions";
        case "Celebrities":
          return "http://localhost:5000/api/celebrities";
        case "World Leaders":
          return "http://localhost:5000/api/leaders";
        case "Household":
          return "http://localhost:5000/api/Households";
        default:
          return [
            "http://localhost:5000/api/sports",
            "http://localhost:5000/api/fictions",
            "http://localhost:5000/api/celebrities",
            "http://localhost:5000/api/leaders",
            "http://localhost:5000/api/Households",
          ];
      }
}