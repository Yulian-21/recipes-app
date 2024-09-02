import { useQuery } from '@tanstack/react-query';

const fetchCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.categories;
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

