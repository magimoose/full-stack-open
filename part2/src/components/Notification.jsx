const Notification = ({ notif }) => {
  if (notif === null) {
    return null
  }
  const style = {
    color: notif.color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  return <div style={style}>{notif.msg}</div>
}

export default Notification
