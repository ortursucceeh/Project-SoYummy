import CategoriesMenu from '../../features/Categories/CategoriesMenu/CategoriesMenu';
import CategoriesRecipesList from '../../features/Categories/CategoriesRecipesList/CategoriesRecipesList';
import PageTitle from '../../ui/PageTitle/PageTitle';
import styles from './CategoriesPage.module.scss';

function CategoriesPage() {
  return (
    <div className={styles.container}>
      <PageTitle>Categories</PageTitle>
      <CategoriesMenu />
      <CategoriesRecipesList />
    </div>
  );
}

export default CategoriesPage;
