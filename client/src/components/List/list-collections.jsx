import { Link } from 'react-router-dom';
import './list.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const ListCollections = () => {

    return (
        <>
            <Container>
                <Row className="mt-3 no-gutters m-0">
                    <Col className="p-0">
                        <Link to={'/products/bindings'} className="d-block">
                            <Image src="https://res.cloudinary.com/ddg9b0qik/image/upload/v1705159448/snow-world/uglqyr5l87j4mkrlxwrf.png" rounded style={{ maxWidth: '300px', maxHeight: '300px' }} className="shadows"  />
                        </Link>
                        <a className="icon-link icon-link-hover link-offset-2 link-underline link-underline-opacity-0 text-dark mt-2" href='/products/bindings'><h3>Bindings</h3>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" /></svg>
                        </a>
                    </Col>

                    <Col className="p-0">
                        <Link to={'/products/boots'} className="d-block">
                            <Image src="https://res.cloudinary.com/ddg9b0qik/image/upload/v1705333688/snow-world/yxazsnwikcqwovcexktu.png" rounded style={{ maxWidth: '300px', maxHeight: '300px' }} className="shadows" />
                        </Link>
                        <a className="icon-link icon-link-hover link-offset-2 link-underline link-underline-opacity-0 text-dark mt-2" href='/products/boots'><h3>Boots</h3>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" /></svg>
                        </a>
                    </Col>

                    <Col className="p-0">
                        <Link to={'/products/helmets'} className="d-block">
                            <Image src="https://res.cloudinary.com/ddg9b0qik/image/upload/v1705403381/snow-world/csdatajgysn8lwvo0cz2.png" rounded style={{ maxWidth: '300px', maxHeight: '300px' }} className="shadows" />
                        </Link>
                        <a className="icon-link icon-link-hover link-offset-2 link-underline link-underline-opacity-0 text-dark mt-2" href='/products/helmets'><h3>Helmets</h3>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" /></svg>
                        </a>
                    </Col>

                    <Col className="p-0">
                        <Link to={'/products/goggles'} className="d-block">
                            <Image src="https://res.cloudinary.com/ddg9b0qik/image/upload/v1705414611/snow-world/elmmqm2rvbkoyajtz5dz.png" rounded style={{ maxWidth: '300px', maxHeight: '300px' }} className="shadows" />
                        </Link>
                        <a className="icon-link icon-link-hover link-offset-2 link-underline link-underline-opacity-0 text-dark mt-2" href='/products/goggles'><h3>Goggles</h3>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" /></svg>
                        </a>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ListCollections