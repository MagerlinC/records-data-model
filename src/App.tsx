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
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  .title,
  .subtitle {
    text-align: center;
  }
  .subtitle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 16px;
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
  const [showDataTruthVersion, setShowDataTruthVersion] = useState(true);
  const [curData, setCurData] = useState(structuredClone(exampleData));

  const addITSystem = (itSystemName: string, paName: string) => {
    const mutatedData = { ...curData };
    if (
      !mutatedData.itSystems.some((itSystem) => itSystem.name === itSystemName)
    ) {
      mutatedData.itSystems.unshift({
        name: itSystemName,
      });
    }
    const targetEntity = mutatedData.processingActivities.find(
      (pa) => pa.name === paName
    );
    if (targetEntity) {
      targetEntity.itSystems.unshift({
        name: itSystemName,
      });
    }
    setCurData(mutatedData);
  };

  const removeITSystem = (
    itSystemName: string,
    paName: string,
    keepItSystem?: boolean
  ) => {
    const mutatedData = { ...curData };
    const targetEntity = mutatedData.processingActivities.find(
      (pa) => pa.name === paName
    );

    const curIndex = mutatedData.itSystems.findIndex(
      (el) => el.name === itSystemName
    );
    if (!keepItSystem && curIndex !== -1) {
      mutatedData.itSystems.splice(curIndex, 1);
    }
    if (targetEntity) {
      targetEntity.itSystems = targetEntity.itSystems.filter(
        (itSystem) => itSystem.name !== itSystemName
      );
    }
    setCurData(mutatedData);
  };

  const addDataSubject = (dataSubjectName: string, paName: string) => {
    const mutatedData = { ...curData };
    const targetEntity = mutatedData.processingActivities.find(
      (pa) => pa.name === paName
    );
    if (targetEntity) {
      targetEntity.dataSubjects.unshift({
        name: dataSubjectName,
        personalData: [],
      });
    }
    setCurData(mutatedData);
  };

  const removeDataSubject = (dataSubjectName: string, paName: string) => {
    const mutatedData = { ...curData };
    const targetEntity = mutatedData.processingActivities.find(
      (pa) => pa.name === paName
    );
    if (targetEntity) {
      targetEntity.dataSubjects = targetEntity.dataSubjects.filter(
        (ds) => ds.name !== dataSubjectName
      );
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

  const removePersonalData = (
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
        targetDataSubject.personalData = targetDataSubject.personalData.filter(
          (pd) => pd.name !== personalDataName
        );
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
      <Row>
        <h1 className={"title"}>Compliance Data Model Playground</h1>
        <p className="subtitle">
          Show Underlying Data
          <input
            type="checkbox"
            checked={showDataTruthVersion}
            onChange={() => setShowDataTruthVersion(!showDataTruthVersion)}
          />
        </p>
      </Row>
      <AppContents>
        <DPO
          addITSystem={addITSystem}
          addDataSubject={addDataSubject}
          addPersonalData={addPersonalData}
          removeITSystem={removeITSystem}
          removeDataSubject={removeDataSubject}
          removePersonalData={removePersonalData}
          processingActivities={curData.processingActivities}
        />
        <SysAdmin
          addDataSubject={addDataSubject}
          addPersonalData={addPersonalData}
          removeITSystem={(itSystem, pa) => removeITSystem(itSystem, pa, true)}
          removeDataSubject={removeDataSubject}
          removePersonalData={removePersonalData}
          itSystems={curData.itSystems.map((itSystem) =>
            itSystemToITSystemWithDataByPA(
              itSystem,
              curData.processingActivities
            )
          )}
        />
        {showDataTruthVersion && (
          <PASourceOfTruthVisualizer resetData={resetData} data={curData} />
        )}
      </AppContents>
    </Application>
  );
}

export default App;
