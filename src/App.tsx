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
import AppModal from "./components/AppModal";

const Application = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 100vw;
  width: 100vw;
  overflow: hidden;
  h1 {
    text-align: center;
  }
`;

const AppContents = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 16px;
  justify-content: space-between;
  h1 {
    text-align: center;
  }
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
  const [curData, setCurData] = useState(structuredClone(exampleData));

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

  const resetData = () => {
    setCurData(structuredClone(exampleData));
  };

  return (
    <Application>
      {showModal && <AppModal onClose={() => setShowModal(false)} />}
      <h1>Compliance Data Model Playground</h1>
      <AppContents>
        <Column>
          <DPO processingActivities={curData.processingActivities} />
          <SysAdmin
            itSystems={curData.itSystems.map((itSystem) =>
              itSystemToITSystemWithDataByPA(
                itSystem,
                curData.processingActivities
              )
            )}
          />
        </Column>
        <PASourceOfTruthVisualizer
          addITSystem={addITSystem}
          addDataSubject={addDataSubject}
          addPersonalData={addPersonalData}
          resetData={resetData}
          data={curData}
        />
      </AppContents>
    </Application>
  );
}

export default App;
