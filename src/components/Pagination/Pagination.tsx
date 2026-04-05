import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      previousLabel="<-"
      nextLabel="->"
    />
  );
}
// import ReactPaginate from "react-paginate";
// import css from "./Pagination.module.css"; // твій CSS файл

// const Pagination = ({ pageCount, currentPage, onPageChange }) => {
//   const pages = [...Array(pageCount).keys()].map((num) => num + 1);

//   const handlePrev = () => {
//     if (currentPage > 1) onPageChange(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < pageCount) onPageChange(currentPage + 1);
//   };

//   return (
//     <ul className="pagination">
//       <li
//         className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
//         onClick={handlePrev}
//       >
//         <a href="#">&lt;-</a>
//       </li>

//       {pages.map((page) => (
//         <li
//           key={page}
//           className={`page-item ${page === currentPage ? "active" : ""}`}
//           onClick={() => onPageChange(page)}
//         >
//           <a href="#">{page}</a>
//         </li>
//       ))}

//       <li
//         className={`page-item ${currentPage === pageCount ? "disabled" : ""}`}
//         onClick={handleNext}
//       >
//         <a href="#">&gt;-</a>
//       </li>
//     </ul>
//   );
// };

// export default Pagination;
