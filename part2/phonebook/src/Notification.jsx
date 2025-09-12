import "./notification.css";

const Notification = ({ message, status }) => {
    if (message === null) {
        return null;
    }


    return (
        <div className={status ? `error` : `success`}>
            {message}
        </div>
    );
};

export default Notification;
