import React, { useContext } from "react";
import { useState } from "react";
import "./PlaceItem.css";
import Card from "../../Shared/components/UIElements/Card";
import Button from "../../Shared/components/FormElements/Button";
import Map from "../../Shared/components/UIElements/Map";
import Modal from "../../Shared/components/UIElements/Modal";
import { AuthContext } from "../../Shared/context/auth-context";

export default function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const auth = useContext(AuthContext);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const deletePlaceHandler = () => {
    setShowDeleteModal(false);
    console.log("deleting.....");
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        onCancel={closeDeleteModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button danger onClick={deletePlaceHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this place? This can't be undone later.</p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <>
                <Button to={`/places/${props.id}`}>EDIT</Button>{" "}
                <Button danger onClick={openDeleteModal}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}
