import './PageNotFound.css'

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <i className="fa-solid fa-exclamation"></i>
            <h1>
                Whoops, the page or event you are looking for was not found.
            </h1>
            <div className='img'></div>
        </div>
    )
};

export default PageNotFound;
