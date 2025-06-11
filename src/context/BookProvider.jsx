import { fetchAllBookAPI } from "@services/apiService";
import { createContext, useCallback, useContext, useState } from "react";

const BookContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBookContext = () => {
  return useContext(BookContext);
};

const BookProvider = ({ children }) => {
  const [bookData, setBookData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [isBookDetailOpen, setIsBookDetailOpen] = useState(false);
  const [currBookData, setCurrBookData] = useState({});
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooksData = useCallback(async () => {
    setIsLoading(true);
    const res = await fetchAllBookAPI(currPage, pageSize);
    if (res?.data) {
      setCurrPage(+res.data.meta.current);
      setPageSize(+res.data.meta.pageSize);
      setTotalPage(res.data.meta.total);
      setBookData(res.data.result);
    }
    setIsLoading(false);
  }, [currPage, pageSize]);

  return (
    <BookContext.Provider
      value={{
        bookData,
        currPage,
        pageSize,
        totalPage,
        setCurrPage,
        setPageSize,
        fetchBooksData,
        isBookDetailOpen,
        setIsBookDetailOpen,
        currBookData,
        setCurrBookData,
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        isModalOpen,
        setIsModalOpen,
        isLoading,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
export default BookProvider;
