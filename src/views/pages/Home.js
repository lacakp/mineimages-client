import React, { useState, useEffect } from "react";
import { API_URL, CLOUDINARY_NAME, AccessHeader } from "../../utils/api";
import Swal from "sweetalert2";
import { Image, Transformation } from "cloudinary-react";
import { Modal, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getImages, getModalImages } from "../../application/selectors/images";
import {
  getImageById,
  loadImages,
  putImages,
} from "../../application/actions/images";
import { pageLoaded } from "../../application/actions/ui";
import { getLoading } from "../../application/selectors/ui";
import Gallery from "react-grid-gallery";

export default function Home() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleOrder = () => {};

  const dataImage = "";
  const images = useSelector(getImages);
  const loading = useSelector(getLoading);
  const ModalImageData = useSelector(getModalImages);

  const handleOnImageClick = async (event) => {
    setShow(true);
    dispatch(getImageById(event.target.alt));
  };

  useEffect(() => {
    dispatch(pageLoaded);
  }, [dispatch]);

  return (
    <div classname="home-body">
      <header className="page-header d-flex align-items-center">
        <div className="container">
          <h1 className="fw-bold"> MineImages </h1>
          <h2> Welcome </h2>
        </div>
      </header>
      <section className="container">
        <div className="row justify-content-center">
          <section className="col-12 col-md-8">
            <img
              src={require("../assets/images/mineimageslogo.png")}
              className="avatar"
            />
            <div className="input-group mb-3">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <button type="submit" className="btn btn-outline-success">
                search
              </button>
            </div>
          </section>
        </div>
        <div className="row py-5 g-3">
          <section className="col-12 pb-3 text-center">
            <h3>รูปภาพ</h3>
          </section>
        </div>
      </section>
      <>
        {loading ? (
          "Loading  images..."
          // <></>
        ) : (
          <>
            <div className="gallery">
              {images.map((image, index) => (
                <Image
                  key={index}
                  cloudName={CLOUDINARY_NAME}
                  alt={image}
                  publicId={image}
                  crop="scale"
                  onClick={handleOnImageClick}
                >
                  <Transformation
                    crop="scale"
                    width="300"
                    height="200"
                    dpr="auto"
                    responsive_placeholder="blank"
                  />
                </Image>
              ))}
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>
                  ภาพ:{ModalImageData && ModalImageData.name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={ModalImageData && ModalImageData.pathWatermark}
                  width="200px"
                  height="200px"
                />
                <h6>
                  เจ้าของภาพ :{" "}
                  <span>{ModalImageData && ModalImageData.owner}</span>
                </h6>
                <h6>
                  ราคา : <span>{ModalImageData && ModalImageData.price}</span>
                </h6>
                <h6>
                  รายละเอียด :{" "}
                  <span>{ModalImageData && ModalImageData.detail}</span>
                </h6>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  ปิด
                </Button>
                <Button variant="primary" type="submit" onClick={handleOrder}>
                  สั่งซื้อ
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </>
    </div>
  );
}
