export const headerConfigCategories: headerTypeCategories = {
  name: "Name",
  description: "Description",
  hierarchy: "Hierarchy",
};

type headerTypeCategories = {
  name: String;
  description: String;
  hierarchy?: String;
};
