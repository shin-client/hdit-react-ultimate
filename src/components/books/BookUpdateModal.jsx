import { openNotification } from "@libs/utils";
import { updateBookAPI } from "@services/apiService";
import { BookOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useBookContext } from "@pages/BooksPage";

const BookUpdateModal = () => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    currBookData,
    setCurrBookData,
    fetchBooksData,
  } = useBookContext();
  const [id, setId] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (currBookData) {
      setId(currBookData._id);
      setThumbnail(currBookData.thumbnail);
      setMainText(currBookData.mainText);
      setAuthor(currBookData.author);
      setPrice(currBookData.price);
      setQuantity(currBookData.quantity);
      setCategory(currBookData.category);
    }
  }, [currBookData]);

  const handleUpdateBook = async () => {
    const res = await updateBookAPI(
      id,
      thumbnail,
      mainText,
      author,
      price,
      quantity,
      category,
    );
    if (res?.data) {
      openNotification("success", "Update book", "Success!");
      resetAndCloseModal();
      fetchBooksData();
    } else {
      openNotification(
        "error",
        "Update user error",
        JSON.stringify(res.message),
      );
    }
  };

  const resetAndCloseModal = () => {
    setId("");
    setThumbnail("");
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setCurrBookData("");
    setIsModalUpdateOpen(false);
  };

  return (
    <>
      <Modal
        title="Update Book"
        open={isModalUpdateOpen}
        onOk={() => handleUpdateBook()}
        onCancel={() => resetAndCloseModal()}
        okText={"Update"}
        maskClosable={false}
        centered
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="ID"
            prefix={<LockOutlined className="text-black/25!" />}
            value={id}
            disabled
          />
          <Input
            placeholder="Book Name"
            prefix={<BookOutlined className="text-black/25!" />}
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
          />
          <Input
            placeholder="Author"
            prefix={<UserOutlined className="text-black/25!" />}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};
export default BookUpdateModal;
