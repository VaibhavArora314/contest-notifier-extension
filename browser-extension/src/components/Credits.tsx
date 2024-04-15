const GITHUB_URL = "https://github.com/VaibhavArora314";

const Credits = () => {
    return (
      <div className="flex flex-col items-center mx-4 my-2">
        <p className="font-semibold text-lg text-gray-700 dark:text-gray-300">
          Credits 
          <a 
            href={GITHUB_URL} 
            target="_blank"
            className="ml-2 text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Vaibhav Arora
          </a>
        </p>
      </div>
    );
  };
  
export default Credits;  