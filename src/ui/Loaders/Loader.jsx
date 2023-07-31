import { ColorRing } from 'react-loader-spinner';

function Loader() {
  return (
    <ColorRing
      visible={true}
      height="200px"
      weight="200px"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#8baa36', '#8baa36', '#8baa36', '#8baa36', '#8baa36', '#8baa36']}
    />
  );
}

export default Loader;