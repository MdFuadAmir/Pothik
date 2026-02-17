import { MdOutlineKeyboardDoubleArrowRight ,MdOutlineKeyboardDoubleArrowLeft} from "react-icons/md";

const Pagination = ({ page, setPage, totalPages }) => {
  const maxPagesToShow = 6;

  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap bg-gray-900/70 px-6 py-2 rounded ">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40 text-emerald-400 border-emerald-400/50"
      >
        <MdOutlineKeyboardDoubleArrowLeft size={20}/>
      </button>

      {/* First + ... */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => setPage(1)}
            className="px-3 py-1 border rounded"
          >
            1
          </button>
          <span>...</span>
        </>
      )}

      {/* Middle pages */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 rounded-full text-white border border-gray-500/40 ${
            p === page ? "bg-emerald-400" : ""
          }`}
        >
          {p}
        </button>
      ))}

      {/* ... + Last */}
      {endPage < totalPages && (
        <>
          <span>...</span>
          <button
            onClick={() => setPage(totalPages)}
            className="px-3 py-1 border rounded-full border-gray-500/50 "
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border border-emerald-400 rounded disabled:opacity-40 text-emerald-400"
      >
        <MdOutlineKeyboardDoubleArrowRight size={20}/>
      </button>
    </div>
  );
};

export default Pagination;
