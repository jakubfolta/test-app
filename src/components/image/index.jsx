import './index.css';

const Image = ({ alt, width = 'auto', height = 'auto', className, src }) => {
  const imageStyle = `imageComponent ${className}`;

  // Remove broken image silently
  const handleImageError = (e) => {
    const childNode = e.target;
    const parentNode = e.target.parentNode;
    parentNode.removeChild(childNode);
  };
  
  return <img
    className={imageStyle}
    srcSet={`${src[0]} 960w, ${src[1]} 1200w`} //Depending on what are requirements and what we want to achieve we could set srcSet and sizes dynamically - I assumed here that we
    sizes="(max-width: 960px) 960px, 1200px"  //have these 2 breakpoints and are passing already prepared images with these sizes.
    src={src[1]}
    alt={alt}
    width={width}
    height={height}
    onError={handleImageError}/>;
};

export default Image;
