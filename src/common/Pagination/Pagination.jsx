import "./Pagination.css";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumbers.map((number) => (
                <li
                    key={number}
                    className={number === currentPage ? "active" : ""}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </li>
            ))}
        </ul>
    );
};