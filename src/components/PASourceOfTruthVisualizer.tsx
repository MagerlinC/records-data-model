import React from "react";
import styled from "styled-components";
import { ProcessingActivitySourceOfTruth } from "../data/types/pa-source-of-truth";
import AddButton from "./AddButton";

const PASourceOfTruthVisualizerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  .scroll-wrapper {
    max-height: 100%;
    overflow-y: auto;
  }
  .contents {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .pa-contents {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-left: 12px;
  }
  p,
  h3,
  h4 {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }
  .processing-activity {
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    padding: 6px;
    flex: 0;
  }
`;

type PASourceOfTruthVisualizerProps = {
  data: ProcessingActivitySourceOfTruth;
  addITSystem: (itSystemName: string, PAName: string) => void;
  addDataSubject: (dataSubjectName: string, PAName: string) => void;
  addPersonalData: (
    personalDataName: string,
    dataSubjectName: string,
    PAName: string
  ) => void;
  resetData: () => void;
};
const PASourceOfTruthVisualizer: React.FC<PASourceOfTruthVisualizerProps> = ({
  data,
  addITSystem,
  addDataSubject,
  addPersonalData,
  resetData,
}) => {
  return (
    <PASourceOfTruthVisualizerWrapper>
      <h2>Underlying Data Truth (PA First)</h2>
      <div className={"scroll-wrapper"}>
        <div className={"contents"}>
          {data.processingActivities.map((processingActivity) => (
            <div
              key={"pa-list-" + processingActivity.name}
              className={"processing-activity"}
            >
              <h3>{processingActivity.name}</h3>
              <div className={"pa-contents"}>
                <h4>
                  IT Systems
                  <AddButton
                    text="Add IT System"
                    onAddItem={(itSystemName) =>
                      addITSystem(itSystemName, processingActivity.name)
                    }
                  />
                </h4>
                <ul>
                  {processingActivity.itSystems.map((itSystem) => (
                    <li key={"it-list-" + itSystem.name}>{itSystem.name}</li>
                  ))}
                </ul>
                <h4>
                  Data Subjects
                  <AddButton
                    text="Add Data Subject"
                    onAddItem={(dataSubjectName) =>
                      addDataSubject(dataSubjectName, processingActivity.name)
                    }
                  />
                </h4>
                <ul>
                  {processingActivity.dataSubjects.map((dataSubject) => (
                    <li key={"ds-list-" + dataSubject.name}>
                      <p>
                        {dataSubject.name}{" "}
                        <AddButton
                          text="Add Personal Data"
                          onAddItem={(personalDataName) =>
                            addPersonalData(
                              personalDataName,
                              dataSubject.name,
                              processingActivity.name
                            )
                          }
                        />
                      </p>
                      <ul>
                        {dataSubject.personalData.map((personalData) => (
                          <li key={"pd-list-" + personalData.name}>
                            {personalData.name}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={resetData}>Reset Data</button>
    </PASourceOfTruthVisualizerWrapper>
  );
};
export default PASourceOfTruthVisualizer;
