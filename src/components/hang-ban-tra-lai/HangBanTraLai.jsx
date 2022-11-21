import React, { useState } from "react";
import FormHangBanTraLai from "./FormHangBanTraLai";
import ListHangBanTraLai from "./ListHangBanTraLai";

const HangBanTraLai = () => {
  const [activeId, setActiveId] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => {
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleClick = (id) => {
    setActiveId(id);
  };

  if (isFormOpen)
    return <FormHangBanTraLai activeId={activeId} closeForm={closeForm} />;
  return <ListHangBanTraLai getId={handleClick} openForm={openForm} />;
};

export default HangBanTraLai;
