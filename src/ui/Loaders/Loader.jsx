import { ColorRing } from 'react-loader-spinner';
import styles from './Loader.module.scss';
function Loader() {
  return (
    <div className={styles.loader}>
      <ColorRing
        visible={true}
        height="200px"
        weight="200px"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#8baa36', '#8baa36', '#8baa36', '#8baa36', '#8baa36', '#8baa36']}
      />
    </div>
  );
}

export default Loader;
