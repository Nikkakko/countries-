export const formatPopulation = (population: number) => {
  return population?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCountryName = (countryName: string) => {
  return countryName?.replace(/%20/g, ' ').replace(/%27/g, "'");
};
