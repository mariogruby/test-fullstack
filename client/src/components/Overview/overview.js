import '../Overview/overview.css'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Images_ia_uno from '../Images/image-ia-art-uno.jpeg';
import Images_ia_dos from '../Images/image-ia-art-dos.jpeg';
import Images_ia_tres from '../Images/image-ia-art-tres.jpeg';

function Overview() {
  return (
    <div className="contenedor">
      {/* Texto y botón fijo */}
      <div className="texto">
        <h3>RISE AND GRIND</h3>
        {/* <p>Descripción o cualquier texto adicional.</p> */}
        <Button variant="primary" size="lg">Shop now</Button>
      </div>

      {/* Carousel */}
      <Carousel>
        <Carousel.Item>
          <Image src={Images_ia_uno} alt="First slide"  />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={Images_ia_dos} alt="Second slide"  />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={Images_ia_tres} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Overview;

