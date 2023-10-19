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
        <h1>Records Data Model Playground</h1>
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
