import { useState } from "react";
import { exampleData } from "./data/pa-source-of-truth-example";
import styled from "styled-components";
import DPO from "./components/DPO";
import SysAdmin from "./components/SysAdmin";
import PASourceOfTruthVisualizer from "./components/PASourceOfTruthVisualizer";
import { ITSystem } from "./data/types/types";
import {
  ITSystemWithDataByPA,
  ProcessingActivitySource,
} from "./data/types/pa-source-of-truth";
import Modal from "./components/Modal";

const Application = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 100vw;
  width: 100vw;
  overflow: hidden;
`;

const AppContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  h1 {
    text-align: center;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  gap: 16px;
`;

const itSystemToITSystemWithDataByPA = (
  itSystem: ITSystem,
  processingActivities: ProcessingActivitySource[]
): ITSystemWithDataByPA => {
  const relatedPas = processingActivities.filter((pa) =>
    pa.itSystems.some((paItSystem) => paItSystem.name === itSystem.name)
  );
  return {
    ...itSystem,
    processingActivities: relatedPas,
  };
};

function App() {
  const [showModal, setShowModal] = useState(true);
  const [curData, setCurData] = useState(exampleData);

  const addITSystem = (itSystemName: string, paName: string) => {
    const mutatedData = { ...curData };
    if (
      !mutatedData.itSystems.some((itSystem) => itSystem.name === itSystemName)
    ) {
      mutatedData.itSystems.push({
        name: itSystemName,
      });
    }
    const targetEntity = mutatedData.processingActivities.find(
      (pa) => pa.name === paName
    );
    if (targetEntity) {
      targetEntity.itSystems.push({
        name: itSystemName,
      });
    }
    setCurData(mutatedData);
  };

  const addDataSubject = (dataSubjectName: string, paName: string) => {
    const mutatedData = { ...curData };
    const targetEntity = mutatedData.processingActivities.find(
      (pa) => pa.name === paName
    );
    if (targetEntity) {
      targetEntity.dataSubjects.push({
        name: dataSubjectName,
        personalData: [],
      });
    }
    setCurData(mutatedData);
  };

  const addPersonalData = (
    personalDataName: string,
    dataSubjectName: string,
    paName: string
  ) => {
    const mutatedData = { ...curData };
    const targetEntity = mutatedData.processingActivities.find(
      (pa) => pa.name === paName
    );
    if (targetEntity) {
      const targetDataSubject = targetEntity.dataSubjects.find(
        (ds) => ds.name === dataSubjectName
      );
      if (targetDataSubject) {
        targetDataSubject.personalData.push({
          name: personalDataName,
        });
      }
    }
    setCurData(mutatedData);
  };

  return (
    <Application>
      <AppContents>
        {showModal && (
          <Modal>
            <h2>Welcome to this example of Compliance Data Modeling</h2>
            <br />
            <p>
              This example assumes the following to be true about the way
              Compliance work functions in the world:
            </p>
            <br />
            <p>
              A) Data can be processed in Processing Activities, without it
              being processed in an IT system.
              <p>
                For example, you could process people's passports as part of
                your HR Processing Activity.
              </p>
            </p>
            <br />
            <p>
              B) Data processed in an IT system must be done under a Processing
              Activity.
              <p>
                For example, you might use Microsoft Teams for both internal use
                and for calling customers (two different processing activities),
                but you can never use Teams without it being under some
                Processing Activity wherein you process the data used in Teams.
                This also follows the need for a processing purpose which allows
                you to process data in Teams.
              </p>
            </p>
            <br />
            Given these conditions, this application showcases how an underlying
            single source of truth (bottom of page) could be utilized, while
            still allowing people with different preferences to view the data
            through different lenses.
            <br />
            <br />
            <button onClick={() => setShowModal(false)}>Okay, show me!</button>
          </Modal>
        )}
        <h1>Compliance Data Model Playground</h1>
        <Row>
          <DPO processingActivities={curData.processingActivities} />
          <SysAdmin
            itSystems={curData.itSystems.map((itSystem) =>
              itSystemToITSystemWithDataByPA(
                itSystem,
                curData.processingActivities
              )
            )}
          />
        </Row>
        <PASourceOfTruthVisualizer
          addITSystem={addITSystem}
          addDataSubject={addDataSubject}
          addPersonalData={addPersonalData}
          data={curData}
        />
      </AppContents>
    </Application>
  );
}

export default App;
