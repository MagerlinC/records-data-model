import React from "react";
import styled from "styled-components";
import { DataSet } from "../data/pa-source-of-truth-example";

const PASourceOfTruthVisualizerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  .section-header {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 4px;
  }
  .contents,
  .processing-activity-list,
  .it-system-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0 4px;
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

const ScrollWrapper = styled.div`
  overflow-y: scroll;
  max-height: 75vh;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
  gap: 4px;
`;

type PASourceOfTruthVisualizerProps = {
  data: DataSet;
  populateExampleData: () => void;
  resetData: () => void;
};
const PASourceOfTruthVisualizer: React.FC<PASourceOfTruthVisualizerProps> = ({
  data,
  populateExampleData,
  resetData,
}) => {
  return (
    <PASourceOfTruthVisualizerWrapper>
      <h2>Underlying Data</h2>
      <p>
        This indicates the single-source-of-truth database, which the views on
        the left use.
      </p>
      <br />
      <ScrollWrapper>
        <h3 className={"section-header"}>
          Processing Activities (Owns the Data)
        </h3>
        <div className={"contents"}>
          <div className={"processing-activity-list"}>
            {data.processingActivities.map((processingActivity) => (
              <div
                key={"pa-list-" + processingActivity.name}
                className={"processing-activity"}
              >
                <h3>{processingActivity.name}</h3>
                <div className={"pa-contents"}>
                  {processingActivity.itSystems.length > 0 && (
                    <>
                      <h4>IT Systems</h4>
                      <ul>
                        {processingActivity.itSystems.map((itSystem) => (
                          <li key={"it-list-" + itSystem.name}>
                            {itSystem.name}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {processingActivity.dataSubjects.length > 0 && (
                    <>
                      <h4>Data Subjects</h4>
                      <ul>
                        {processingActivity.dataSubjects.map((dataSubject) => (
                          <li key={"ds-list-" + dataSubject.name}>
                            <p>{dataSubject.name}</p>
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
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={"it-system-list"}>
            <h3 className={"section-header"}>IT Systems (Points to Data)</h3>
            <ul>
              {data.itSystems.map((itSystem) => (
                <li key={"it-system-list-" + itSystem.name}>{itSystem.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollWrapper>
      <Row>
        <button onClick={resetData}>Reset Data</button>
        <button onClick={populateExampleData}>Example Data</button>
      </Row>
    </PASourceOfTruthVisualizerWrapper>
  );
};
export default PASourceOfTruthVisualizer;
