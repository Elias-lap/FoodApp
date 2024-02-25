/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import imageDelete from "../../../../assets/Nodata (2).png";
function DeleteComponent({showModalDelete ,handleCloseDelete ,  deleteItemId , functionDelete}  ) {
  return (
    
    <Modal show={showModalDelete} onHide={handleCloseDelete}>
        <div className="w-80 d-flex justify-content-end mt-4 ">
          <span
            role="button"
            onClick={() => handleCloseDelete()}
            className=" iconClose  d-flex fa fa-close   text-danger "
          ></span>
        </div>
        <Modal.Body>
          <div className="text-center">
            <img src={imageDelete} alt="" />
            <h5>Delete This Category ?</h5>
            <p className="text-secondary">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>

          <div className="text-end w-100">
            <button
              onClick={() => {
                functionDelete(deleteItemId);
              }}
              className=" btn btn-outline-danger "
            >
              Delete This item
            </button>
          </div>
        </Modal.Body>
      </Modal>
  )
}

export default DeleteComponent;

