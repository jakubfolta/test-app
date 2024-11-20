import './index.css';
import image1 from '/QguApMA.jpeg';
import image2 from '/tXtwrPd.jpeg';
import image3 from '/Xulubox.jpeg';
import ImageCard from '../../components/imageCard'
import Heading from '../../components/heading';

const Features = () => {

  const features = [
    {
      image: image1,
      heading: 'Supports All Currencies and Cards',
      text: 'We support all popular currencies and is fully customizable to add',
      link: 'https://www.bold.com'
    },
    {
      image: image2,
      heading: 'Manage your expenses on the go',
      text: 'You can access your account from anywhere in the world on any device',
      link: 'https://www.bold.com'
    },
    {
      image: image3,
      heading: 'Cloud Budget Management Software',
      text: 'Our software is made so you can access and manage your budget',
      link: 'https://www.bold.com'
    }
  ]

  return (
    <div className='features'>
      <div className='container'>
        <div className='heading'>
          <Heading level={2}>Features</Heading>
        </div>
        <div className='cards'>
          {
            features.map((feature, index) => {
              return (
                <ImageCard key={index} image={[feature.image, feature.image]} heading={feature.heading} text={feature.text} link={feature.link} />
              )
            })
          }
        </div>
      </div>
    </div>
  )


};

export default Features;
