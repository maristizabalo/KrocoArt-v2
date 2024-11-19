const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "succcess":
        return "green";
      case "error":
        return "red";
      default:
        return "blue";
    }
  };

  return <div style={{backgroundColor: getVariantClass()}}>{children}</div>;
};

export default Message;
