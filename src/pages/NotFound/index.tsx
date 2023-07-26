import "./index.css";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="notfound-c flex justify-center">
      <div className="not-found">
        <div>
          <div className="notfound inner h-auto">
            <div className="notfoundimg h-72 w-2/3 ml-36 pt-40"></div>
            <div className="notfound-text text-center">很抱歉，你要查找的网页找不到</div>
            <div className="notfound-img mb-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
