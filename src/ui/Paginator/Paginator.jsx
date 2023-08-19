import { useSearchParams } from 'react-router-dom';
import PageButton from './PageButton/PageButton';
import styles from './Paginator.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCallback, useEffect, useState } from 'react';

function Paginator({ pages, prevData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +searchParams.get('page') || 1;
  const [currentButton, setCurrentButton] = useState(1);

  const numberOfPages = Array(pages)
    .fill()
    .map((_, indx) => indx + 1);

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  const setCurrentPage = useCallback(
    page => {
      if (parseInt(page)) {
        setSearchParams(prev => {
          prev.set('page', page);
          return prev;
        });
        setCurrentButton(page);
      }
    },
    [setSearchParams]
  );

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    let dotsInitial = '...';
    let dotsLeft = '... ';
    let dotsRight = ' ...';

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length];
    } else if (currentButton > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else {
      tempNumberOfPages = numberOfPages;
    }

    setArrOfCurrButtons(tempNumberOfPages);
    // setCurrentPage(currentButton);
  }, [currentButton, pages]);

  if (pages <= 1) return;

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.paginator}>
      <button className={styles.arrow} disabled={currentPage === 1} onClick={prevPage}>
        <FiChevronLeft />
      </button>
      <ul className={styles.pages}>
        {arrOfCurrButtons.map(pg => (
          <PageButton
            key={pg}
            page={pg}
            onClick={() => setCurrentPage(pg)}
            isActive={pg === currentPage}
          />
        ))}
      </ul>
      <button
        className={styles.arrow}
        disabled={prevData || currentPage === numberOfPages.at(-1)}
        onClick={nextPage}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}

export default Paginator;
