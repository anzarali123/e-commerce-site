import { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  setCurrentPage,
  productsPerPage,
  totalProducts,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  // Limit the page number shown
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setminPageNumberLimit] = useState(0);

  //   Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // go to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    // show next set of pageNumbers
    if (currentPage + 1 > maxpageNumberLimit) {
      setmaxPageNumberLimit(maxpageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minpageNumberLimit + pageNumberLimit);
    }
  };

  // go to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxpageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minpageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className={styles.pagination}>
      <li
        onClick={paginatePrev}
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : ""}
      >
        Prev
      </li>
      {pageNumbers.map((number) => {
        if (number < maxpageNumberLimit + 1 && number > minpageNumberLimit) {
          return (
            <li
              onClick={() => paginate(number)}
              key={number}
              className={currentPage === number ? `${styles.active}` : null}
            >
              {number}
            </li>
          );
        }
      })}
      <li
        onClick={paginateNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : ""
        }
      >
        Next
      </li>
      <p>
        <b className={styles.page}>{`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
