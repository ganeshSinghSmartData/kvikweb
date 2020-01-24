import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import Spinner from "../../../../commonUi/spinner/spinner";
import "./ImageView.scss";

export const ImageView = ({ ImageVisible = false, imageViewHandlerProp, imagePath = "" }) => {
    const toggle = () => imageViewHandlerProp(!ImageVisible);
    return (
        <>
        <Modal isOpen={ImageVisible} toggle={toggle} className="image-view-mdl align-items-center justify-content-center d-flex flex-column modal-lg">
            <ModalHeader>
                Image Preview
                    <Button
                    color="link"
                    className="close-btn btn2"
                    onClick={toggle}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="357"
                        height="357"
                        viewBox="0 0 357 357"
                    >
                        <path
                            id="Forma_1"
                            data-name="Forma 1"
                            d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z"
                        />
                    </svg>
                </Button>
            </ModalHeader>
            <ModalBody>
                <>
                    {/* <Spinner /> */}
                    <img src={imagePath} alt="File Preview" />
                </>
            </ModalBody>
        </Modal>
        </>
    )
}