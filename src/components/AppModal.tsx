import React from "react";
import Modal from "./Modal";

type AppModalProps = {
  onClose: () => void;
};
const AppModal: React.FC<AppModalProps> = ({ onClose }) => {
  return (
    <Modal>
      <h2>Welcome to this example of Compliance Data Modeling</h2>
      <br />
      <p>
        This example assumes the following to be true about the way Compliance
        work functions in the world:
      </p>
      <br />
      <p>
        A) Data can be processed in Processing Activities, without it being
        processed in an IT system.
        <p>
          For example, you could process people's passports as part of your HR
          Processing Activity.
        </p>
      </p>
      <br />
      <p>
        B) Data processed in an IT system must be done under a Processing
        Activity.
        <p>
          For example, you might use Microsoft Teams for both internal use and
          for calling customers (two different processing activities), but you
          can never use Teams without it being under some Processing Activity
          wherein you process the data used in Teams. This also follows the need
          for a processing purpose which allows you to process data in Teams.
        </p>
      </p>
      <br />
      Given these conditions, this application showcases how an underlying
      single source of truth (bottom of page) could be utilized, while still
      allowing people with different preferences to view the data through
      different lenses (top of page).
      <br />
      <br />
      <button onClick={onClose}>Okay, show me!</button>
    </Modal>
  );
};
export default AppModal;
