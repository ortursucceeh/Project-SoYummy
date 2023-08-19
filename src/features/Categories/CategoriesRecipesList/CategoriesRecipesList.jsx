import Loader from '../../../ui/Loaders/Loader';
import LoaderModal from '../../../ui/Loaders/LoaderModal';
import Paginator from '../../../ui/Paginator/Paginator';
import RecipesNotFound from '../../../ui/RecipesNotFound/RecipesNotFound';
import { getPages } from '../../../utils/functions';
import RecipeList from '../../Recipes/RecipeList/RecipeList';
import styles from './CategoriesRecipesList.module.scss';
import { useCategoryRecipes } from './useCategoryRecipes';

function CategoriesRecipesList() {
  const { data, isLoading, isFetching, isPreviousData } = useCategoryRecipes();

  if (isLoading) return <Loader />;

  if (!data?.recipes?.length) return <RecipesNotFound text="Try to choose another category..." />;

  const pages = getPages(data?.total, data?.limit);

  return (
    <>
      <div className={styles.wrapper}>
        <RecipeList recipes={data.recipes} />
        {isFetching && isPreviousData && <LoaderModal />}
      </div>
      <Paginator pages={pages} prevData={isPreviousData} />
    </>
  );
}

export default CategoriesRecipesList;
